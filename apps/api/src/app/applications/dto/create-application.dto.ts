import { IsString, IsOptional, IsObject, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {CreateApplicationRequest} from "@rent-easy-9ja/types";

class DocumentsDto {
  @ApiProperty({ example: 'id-card-url.jpg', required: false })
  @IsOptional()
  @IsString()
  idCard?: string;

  @ApiProperty({ example: 'proof-of-income-url.jpg', required: false })
  @IsOptional()
  @IsString()
  proofOfIncome?: string;

  @ApiProperty({ example: ['reference1.jpg', 'reference2.jpg'], required: false })
  @IsOptional()
  @IsString({ each: true })
  references?: string[];
}

export class CreateApplicationDto implements CreateApplicationRequest{
  @ApiProperty({ example: 'uuid-of-property' })
  @IsUUID()
  propertyId: string;

  @ApiProperty({ example: 'I am very interested in this property...' })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({ type: DocumentsDto, required: false })
  @IsOptional()
  @IsObject()
  @Type(() => DocumentsDto)
  documents?: DocumentsDto;
}
