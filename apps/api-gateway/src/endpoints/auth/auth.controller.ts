import {
  AUTH_PATTERNS,
  LoginDTO,
  RegisterDTO,
  RMQ_NAME_SERVICES,
} from '@app/shared';
import { Body, Controller, Inject, Post, Version } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(RMQ_NAME_SERVICES.AUTH)
    private readonly client: ClientProxy,
  ) {}

  @Version('1')
  @Post('register')
  register(@Body() body: RegisterDTO) {
    return firstValueFrom(
      this.client.send(AUTH_PATTERNS.REGISTER, body),
    );
  }
  
  @Version('1')
  @Post('login')
  login(@Body() body: LoginDTO) {
    return firstValueFrom(
      this.client.send(AUTH_PATTERNS.LOGIN, body),
    );
  }
}