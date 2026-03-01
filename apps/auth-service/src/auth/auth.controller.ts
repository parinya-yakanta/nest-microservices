import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AUTH_PATTERNS } from '@app/shared';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_PATTERNS.REGISTER)
  register(@Payload() data: any) {
    return this.authService.register(data);
  }

  @MessagePattern(AUTH_PATTERNS.LOGIN)
  login(@Payload() data: any) {
    return this.authService.login(data);
  }
}