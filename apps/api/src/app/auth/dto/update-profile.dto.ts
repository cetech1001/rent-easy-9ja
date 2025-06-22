import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {UpdateProfileRequest} from "@rent-easy-9ja/types";

export class UpdateProfileDto implements UpdateProfileRequest{
  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: '+2348012345678', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'profile-avatar-url', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;
}
