import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { createMikroOrmConfig } from '@app/shared/database/mikro-orm.config';
import { Account } from './entities/account.entity';
dotenv.config({
  path: path.resolve(process.cwd(), 'apps/auth-service/.env'),
});

@Module({
  imports: [
    MikroOrmModule.forRoot(
      createMikroOrmConfig({
        driver: PostgreSqlDriver,
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT!),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        dbName: process.env.DB_NAME!,
        nodeEnv: process.env.NODE_ENV ?? 'development',
        entities: [Account],
      }),
    ),
    AuthModule,
  ],
})
export class AuthServiceModule {}
