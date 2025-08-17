import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { REDIS_CLIENT } from '../redis/redis.module';
import type Redis from 'ioredis';
import { Inject } from '@nestjs/common';
import { Admin } from '../admins/admin.entity';

interface JwtPayload {
  sub: string;
  username: string;
  kind: 'user' | 'admin';
  role?: 'admin' | 'superadmin';
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly jwt: JwtService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  private async generateTokens(
    kind: 'user' | 'admin',
    subjectId: string,
    username: string,
    role?: 'admin' | 'superadmin',
  ) {
    const payload: JwtPayload = { sub: subjectId, username, kind, role };
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
      `access:${kind}:${subjectId}:${accessToken}`,
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
    return this.generateTokens('user', user.userId, user.username);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken, {
        secret:
          process.env.JWT_REFRESH_SECRET ||
          process.env.JWT_SECRET ||
          'dev-secret',
      });
      if (payload.kind && payload.kind !== 'user') {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const user = await this.userRepo.findOne({
        where: { userId: payload.sub },
      });
      if (!user) throw new UnauthorizedException('Invalid refresh token');
      return this.generateTokens('user', user.userId, user.username);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async revokeAccessToken(
    kind: 'user' | 'admin',
    subjectId: string,
    accessToken: string,
  ) {
    await this.redis.del(`access:${kind}:${subjectId}:${accessToken}`);
  }

  // Admin paths
  private async validateAdmin(
    username: string,
    password: string,
  ): Promise<Admin> {
    const admin = await this.adminRepo.findOne({ where: { username } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return admin;
  }

  async loginAdmin(username: string, password: string) {
    const admin = await this.validateAdmin(username, password);
    return this.generateTokens(
      'admin',
      admin.adminId,
      admin.username,
      admin.role,
    );
  }

  async refreshAdmin(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken, {
        secret:
          process.env.JWT_REFRESH_SECRET ||
          process.env.JWT_SECRET ||
          'dev-secret',
      });
      if (payload.kind && payload.kind !== 'admin') {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const admin = await this.adminRepo.findOne({
        where: { adminId: payload.sub },
      });
      if (!admin) throw new UnauthorizedException('Invalid refresh token');
      return this.generateTokens(
        'admin',
        admin.adminId,
        admin.username,
        admin.role,
      );
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
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
