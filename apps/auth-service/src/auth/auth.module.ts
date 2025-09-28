import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL,
    }),
  ],
  providers: [
    AuthService,
    {
      provide: 'PRISMA',
      useValue: new PrismaClient(),
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
