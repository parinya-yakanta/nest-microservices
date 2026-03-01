import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: { name: string; email: string }[] = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Doe', email: 'jane@example.com' },
  ];

  create(data: { name: string; email: string }) {
    this.users.push(data);
    return data;
  }

  findAll() {
    return this.users;
  }

  getProfile(user: any) {
    return this.users.find((u) => u.email === user.email);
  }
}
