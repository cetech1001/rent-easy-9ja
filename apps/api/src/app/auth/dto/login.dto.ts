import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {LoginRequest} from "@rent-easy-9ja/types";

export class LoginDto implements LoginRequest{
  @ApiProperty({ example: 'tenant1@renteasy9ja.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}
