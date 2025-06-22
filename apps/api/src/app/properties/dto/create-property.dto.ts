import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
  IsObject,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {PropertyStatus, PropertyType} from "@rent-easy-9ja/types";

class AmenitiesDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  furnished: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  ac: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  security: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  parking: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  wifi: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  gym: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  pool: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  generator: boolean;
}

export class CreatePropertyDto {
  @ApiProperty({ example: 'Luxury 3 Bedroom Apartment' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Beautiful apartment with modern amenities...' })
  @IsString()
  description: string;

  @ApiProperty({ enum: PropertyType, example: PropertyType.APARTMENT })
  @IsEnum(PropertyType)
  type: PropertyType;

  @ApiProperty({ example: 450000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: '123 Lekki Phase 1, Lagos' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Lagos' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Lagos State' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'Nigeria' })
  @IsString()
  @IsOptional()
  country: string = 'Nigeria';

  @ApiProperty({ example: 6.4474, required: false })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiProperty({ example: 3.3903, required: false })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @Min(0)
  bedrooms: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(0)
  bathrooms: number;

  @ApiProperty({ example: 120, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  area?: number;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  parking?: number = 0;

  @ApiProperty({
    example: ['image1.jpg', 'image2.jpg'],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ type: AmenitiesDto, required: false })
  @IsOptional()
  @IsObject()
  @Type(() => AmenitiesDto)
  amenities?: AmenitiesDto;

  @ApiProperty({
    enum: PropertyStatus,
    example: PropertyStatus.AVAILABLE,
    required: false
  })
  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus = PropertyStatus.DRAFT;
}
