import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard, loginDto, refreshTokenDto, registerDto } from "@social-network/shared"
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor (@Inject("AUTH_SERVICE") private readonly client: ClientProxy) {}

    @Post('register')
    async register(@Body() body: registerDto) {
        return await firstValueFrom(
            this.client.send({ cmd: 'register' }, body),
        );
    }

    @Post('login')
    async login(@Body() body: loginDto) {
        return await firstValueFrom(
            this.client.send({ cmd: 'login' }, body),
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post('refresh')
    async refresh(@Body() body: refreshTokenDto) {
        return await firstValueFrom(
            this.client.send({ cmd: 'refresh' }, body),
        );
    }
}
