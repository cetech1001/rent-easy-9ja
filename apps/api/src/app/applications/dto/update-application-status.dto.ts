import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {ApplicationStatus, UpdateApplicationStatusRequest} from "@rent-easy-9ja/types";

export class UpdateApplicationStatusDto implements UpdateApplicationStatusRequest{
  @ApiProperty({ enum: ApplicationStatus, example: ApplicationStatus.APPROVED })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @ApiProperty({ example: 'Application approved. Please contact us for next steps.', required: false })
  @IsOptional()
  @IsString()
  landlordNotes?: string;
}
