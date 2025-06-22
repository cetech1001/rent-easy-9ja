import {
  Controller,
  Get,
  Post,
  Put,
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
} from '@nestjs/swagger';
import type { Request as IRequest } from 'express';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto, UpdateApplicationStatusDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';
import {ApplicationStatus, UserRole} from "@rent-easy-9ja/types";

@ApiTags('Applications')
@Controller('applications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.TENANT)
  @ApiOperation({ summary: 'Submit property application (Tenants only)' })
  @ApiResponse({ status: 201, description: 'Application submitted successfully' })
  async createApplication(@Request() req: IRequest, @Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.createApplication(req.user?.id, createApplicationDto);
  }

  @Get('my-applications')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TENANT)
  @ApiOperation({ summary: 'Get tenant applications' })
  @ApiResponse({ status: 200, description: 'Applications retrieved successfully' })
  async getMyApplications(@Request() req: IRequest) {
    return this.applicationsService.getApplicationsByTenant(req.user?.id);
  }

  @Get('property-applications')
  @UseGuards(RolesGuard)
  @Roles(UserRole.LANDLORD)
  @ApiOperation({ summary: 'Get applications for landlord properties' })
  @ApiResponse({ status: 200, description: 'Applications retrieved successfully' })
  async getPropertyApplications(@Request() req: IRequest, @Query('status') status?: ApplicationStatus) {
    return this.applicationsService.getApplicationsByLandlord(req.user?.id, status);
  }

  @Get('stats')
  @UseGuards(RolesGuard)
  @Roles(UserRole.LANDLORD)
  @ApiOperation({ summary: 'Get application statistics for landlord' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getApplicationStats(@Request() req: IRequest) {
    return this.applicationsService.getApplicationStats(req.user?.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get application by ID' })
  @ApiResponse({ status: 200, description: 'Application retrieved successfully' })
  async getApplicationById(@Param('id') id: string, @Request() req: IRequest) {
    return this.applicationsService.getApplicationById(id, req.user?.id, req.user?.role);
  }

  @Put(':id/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.LANDLORD)
  @ApiOperation({ summary: 'Update application status (Landlords only)' })
  @ApiResponse({ status: 200, description: 'Application status updated successfully' })
  async updateApplicationStatus(
    @Param('id') id: string,
    @Request() req: IRequest,
    @Body() updateStatusDto: UpdateApplicationStatusDto,
  ) {
    return this.applicationsService.updateApplicationStatus(id, req.user?.id, updateStatusDto);
  }

  @Put(':id/withdraw')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TENANT)
  @ApiOperation({ summary: 'Withdraw application (Tenants only)' })
  @ApiResponse({ status: 200, description: 'Application withdrawn successfully' })
  async withdrawApplication(@Param('id') id: string, @Request() req: IRequest) {
    return this.applicationsService.withdrawApplication(id, req.user?.id);
  }
}
