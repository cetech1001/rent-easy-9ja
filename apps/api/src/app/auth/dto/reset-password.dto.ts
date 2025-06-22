import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {ResetPasswordRequest} from "@rent-easy-9ja/types";

export class ResetPasswordDto implements ResetPasswordRequest{
  @ApiProperty({ example: 'reset-token-here' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'NewStrongPassword123!' })
  @IsString()
  @MinLength(8)
  password: string;
}
