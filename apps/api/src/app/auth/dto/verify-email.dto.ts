import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {VerifyEmailRequest} from "@rent-easy-9ja/types";

export class VerifyEmailDto implements VerifyEmailRequest{
  @ApiProperty({ example: 'verification-token-here' })
  @IsString()
  token: string;
}
