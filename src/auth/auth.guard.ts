import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REDIS_CLIENT } from '../redis/redis.module';
import type Redis from 'ioredis';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'] as string | undefined;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing access token');
    }
    const accessToken = authHeader.substring('Bearer '.length).trim();
    try {
      const payload = await this.jwt.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET || 'dev-secret',
      });
      const subjectId = payload.sub;
      const kind = payload.kind || 'user';
      const key = `access:${kind}:${subjectId}:${accessToken}`;
      const exists = await this.redis.get(key);
      if (!exists) {
        throw new UnauthorizedException('Access token expired');
      }
      req.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}


