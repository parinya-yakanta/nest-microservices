import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users: { id: number; name: string; email: string; password: string }[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async register(data: any) {
    const hashed = await bcrypt.hash(data.password, 10);

    const user = {
      id: this.users.length + 1,
      name: data.name,
      email: data.email,
      password: hashed,
    };

    this.users.push(user);

    return { message: 'User registered' };
  }

  async login(data: any) {
    const user = this.users.find((u) => u.email === data.email);

    if (!user) {
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) {
      throw new Error('Invalid password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: ['user'],
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}