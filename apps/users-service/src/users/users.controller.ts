import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { USER_PATTERNS } from '@app/shared';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USER_PATTERNS.CREATE_USER)
  create(data: { name: string; email: string }) {
    return this.usersService.create(data);
  }

  @MessagePattern(USER_PATTERNS.FIND_ALL_USERS)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(USER_PATTERNS.GET_PROFILE)
  getProfile(data: { user: any }) {
    return this.usersService.getProfile(data.user);
  }
}
