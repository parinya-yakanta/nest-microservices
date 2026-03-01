import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  name?: string;

  @IsEmail()
  @ApiProperty({ example: 'john@example.com' })
  email?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password123' })
  password?: string;
}

export class LoginDTO {
  @IsEmail()
  @ApiProperty({ example: 'john@example.com' })
  email?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password123' })
  password?: string;
}