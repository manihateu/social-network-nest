import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { loginDto, refreshTokenDto, registerDto } from '@social-network/shared';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @MessagePattern("register")
    async register(@Payload() dto: registerDto) {
        return this.authService.register(dto)
    }

    @MessagePattern("login")
    async login(@Payload() dto: loginDto) {
        return this.authService.login(dto)
    }

    @MessagePattern("refresh")
    async refresh(@Payload() dto: refreshTokenDto) {
        return this.authService.refreshToken(dto.userId, dto.token)
    }
}
