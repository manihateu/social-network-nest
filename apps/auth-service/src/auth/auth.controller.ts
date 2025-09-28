import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { loginDto, refreshTokenDto, registerDto } from '@social-network/shared';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register' })
  async register(@Payload() dto: registerDto) {
    return this.authService.register(dto);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() dto: loginDto) {
    return this.authService.login(dto);
  }

  @MessagePattern({ cmd: 'refresh' })
  async refresh(@Payload() dto: refreshTokenDto) {
    return this.authService.refreshToken(dto.userId, dto.token);
  }
}
