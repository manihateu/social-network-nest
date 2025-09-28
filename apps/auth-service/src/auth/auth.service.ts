import { InjectRedis } from '@nestjs-modules/ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import bcrypt from 'bcrypt';
import { loginDto, registerDto } from '@social-network/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('PRISMA') private prisma: PrismaClient,
    @InjectRedis() private redis: Redis
  ) {}

  async register(dto: registerDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { ...dto, password: hashed },
    });
    return this.generateTokens(user.id);
  }

  async login({ email, password }: loginDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    return this.generateTokens(user.id);
  }

  async refreshToken(userId: string, token: string) {
    const stored = await this.redis.get(`refresh:${userId}`);
    if (!stored || stored !== token) throw new Error('Invalid refresh token');

    return this.generateTokens(userId);
  }

  private async generateTokens(userId: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId },
      { expiresIn: '15m' }
    );
    const refreshToken = this.jwtService.sign(
      { sub: userId },
      { expiresIn: '7d' }
    );

    await this.redis.set(
      `refresh:${userId}`,
      refreshToken,
      'EX',
      7 * 24 * 60 * 60
    ); // 7 дней

    return { accessToken, refreshToken };
  }
}
