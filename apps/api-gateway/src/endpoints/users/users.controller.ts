import { CurrentUser, JwtAuthGuard } from '@app/auth';
import { CreateUserDTO, RMQ_NAME_SERVICES, USER_PATTERNS } from '@app/shared';
import { Controller, Get, Post, Body, Inject, UseGuards, Version } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(RMQ_NAME_SERVICES.USERS)
    private readonly client: ClientProxy,
  ) {}

  @Version('1')
  @ApiBody({ type: CreateUserDTO })
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return firstValueFrom(this.client.send(USER_PATTERNS.CREATE_USER, body));
  }

  @Version('1')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return firstValueFrom(this.client.send(USER_PATTERNS.FIND_ALL_USERS, {}));
  }

  @Version('1')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return firstValueFrom(this.client.send(USER_PATTERNS.GET_PROFILE, { user }));
  }
}
