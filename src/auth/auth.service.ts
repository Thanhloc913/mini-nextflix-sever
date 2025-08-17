import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { REDIS_CLIENT } from '../redis/redis.module';
import type Redis from 'ioredis';
import { Inject } from '@nestjs/common';

interface JwtPayload {
  sub: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwt: JwtService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  private async generateTokens(user: User) {
    const payload: JwtPayload = { sub: user.userId, username: user.username };
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
      secret:
        process.env.JWT_REFRESH_SECRET ||
        process.env.JWT_SECRET ||
        'dev-secret',
    });
    const accessTtlSec = parseDurationToSeconds(
      process.env.JWT_ACCESS_EXPIRES || '15m',
    );
    await this.redis.set(
      `access:${user.userId}:${accessToken}`,
      '1',
      'EX',
      accessTtlSec,
    );
    return { accessToken, refreshToken };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    return this.generateTokens(user);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken, {
        secret:
          process.env.JWT_REFRESH_SECRET ||
          process.env.JWT_SECRET ||
          'dev-secret',
      });
      const user = await this.userRepo.findOne({
        where: { userId: payload.sub },
      });
      if (!user) throw new UnauthorizedException('Invalid refresh token');
      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async revokeAccessToken(userId: string, accessToken: string) {
    await this.redis.del(`access:${userId}:${accessToken}`);
  }
}

function parseDurationToSeconds(input: string): number {
  const match = /^([0-9]+)([smhd])$/.exec(input.trim());
  if (!match) return 900; // default 15m
  const value = Number(match[1]);
  const unit = match[2];
  switch (unit) {
    case 's':
      return value;
    case 'm':
      return value * 60;
    case 'h':
      return value * 60 * 60;
    case 'd':
      return value * 60 * 60 * 24;
    default:
      return 900;
  }
}
