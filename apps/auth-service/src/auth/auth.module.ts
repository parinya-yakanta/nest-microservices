import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      privateKey: fs.readFileSync(
        path.join(process.cwd(), 'keys/private.key'),
        'utf8',
      ),
      publicKey: fs.readFileSync(
        path.join(process.cwd(), 'keys/public.key'),
        'utf8',
      ),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '15m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}