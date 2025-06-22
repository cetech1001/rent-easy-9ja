import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto, UpdatePropertyDto, PropertyQueryDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';
import {UserRole} from "@rent-easy-9ja/types";
import type {Request as IRequest} from "express";


@ApiTags('Properties')
@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LANDLORD)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new property (Landlords only)' })
  @ApiResponse({ status: 201, description: 'Property created successfully' })
  async createProperty(@Request() req: IRequest, @Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.createProperty(req.user?.id, createPropertyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all properties with filtering' })
  @ApiResponse({ status: 200, description: 'Properties retrieved successfully' })
  async getProperties(@Query() queryDto: PropertyQueryDto) {
    return this.propertiesService.getProperties(queryDto);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured properties' })
  @ApiResponse({ status: 200, description: 'Featured properties retrieved' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getFeaturedProperties(@Query('limit') limit?: number) {
    return this.propertiesService.getFeaturedProperties(limit);
  }

  @Get('popular-locations')
  @ApiOperation({ summary: 'Get popular locations' })
  @ApiResponse({ status: 200, description: 'Popular locations retrieved' })
  async getPopularLocations() {
    return this.propertiesService.getPopularLocations();
  }

  @Get('my-properties')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LANDLORD)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get landlord properties' })
  @ApiResponse({ status: 200, description: 'Landlord properties retrieved' })
  async getMyProperties(@Request() req: IRequest, @Query('status') status?: string) {
    return this.propertiesService.getPropertiesByLandlord(req.user?.id, status as any);
  }

  @Get('saved')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get saved properties' })
  @ApiResponse({ status: 200, description: 'Saved properties retrieved' })
  async getSavedProperties(@Request() req: IRequest) {
    return this.propertiesService.getSavedProperties(req.user?.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get property by ID' })
  @ApiResponse({ status: 200, description: 'Property retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async getPropertyById(@Param('id') id: string, @Request() req: IRequest) {
    const userId = req.user?.id;
    return this.propertiesService.getPropertyById(id, userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LANDLORD)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update property (Landlords only)' })
  @ApiResponse({ status: 200, description: 'Property updated successfully' })
  async updateProperty(
    @Param('id') id: string,
    @Request() req: IRequest,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.updateProperty(id, req.user?.id, updatePropertyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LANDLORD)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete property (Landlords only)' })
  @ApiResponse({ status: 200, description: 'Property deleted successfully' })
  async deleteProperty(@Param('id') id: string, @Request() req: IRequest) {
    return this.propertiesService.deleteProperty(id, req.user?.id);
  }

  @Post(':id/save')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save property to favorites' })
  @ApiResponse({ status: 200, description: 'Property saved successfully' })
  async saveProperty(@Param('id') id: string, @Request() req: IRequest) {
    return this.propertiesService.saveProperty(req.user?.id, id);
  }

  @Delete(':id/save')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove property from favorites' })
  @ApiResponse({ status: 200, description: 'Property unsaved successfully' })
  async unsaveProperty(@Param('id') id: string, @Request() req: IRequest) {
    return this.propertiesService.unsaveProperty(req.user?.id, id);
  }
}
