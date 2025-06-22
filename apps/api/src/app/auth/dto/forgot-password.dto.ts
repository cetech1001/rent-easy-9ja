import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {ForgotPasswordRequest} from "@rent-easy-9ja/types";

export class ForgotPasswordDto implements ForgotPasswordRequest{
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;
}
