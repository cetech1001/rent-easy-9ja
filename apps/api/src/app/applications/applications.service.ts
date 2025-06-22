import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {ApplicationEntity, PropertyEntity, UserEntity} from '../../entities';
import { CreateApplicationDto, UpdateApplicationStatusDto } from './dto';
import {ApplicationStatus, PropertyStatus, UserRole} from "@rent-easy-9ja/types";

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private applicationRepository: Repository<ApplicationEntity>,
    @InjectRepository(PropertyEntity)
    private propertyRepository: Repository<PropertyEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createApplication(tenantId: string, createApplicationDto: CreateApplicationDto) {
    const { propertyId, message, documents } = createApplicationDto;

    // Verify tenant role
    const tenant = await this.userRepository.findOne({
      where: { id: tenantId, role: UserRole.TENANT },
    });

    if (!tenant) {
      throw new ForbiddenException('Only tenants can submit applications');
    }

    // Check if property exists and is available
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId, status: PropertyStatus.AVAILABLE, isActive: true },
    });

    if (!property) {
      throw new NotFoundException('Property not found or not available');
    }

    // Check if tenant already applied for this property
    const existingApplication = await this.applicationRepository.findOne({
      where: { tenantId, propertyId },
    });

    if (existingApplication) {
      throw new BadRequestException('You have already applied for this property');
    }

    const application = this.applicationRepository.create({
      tenantId,
      propertyId,
      message,
      documents,
      status: ApplicationStatus.PENDING,
    });

    return this.applicationRepository.save(application);
  }

  async getApplicationsByTenant(tenantId: string) {
    return this.applicationRepository.find({
      where: { tenantId },
      relations: ['property', 'property.landlord'],
      order: { createdAt: 'DESC' },
    });
  }

  async getApplicationsByLandlord(landlordId: string, status?: ApplicationStatus) {
    const queryBuilder = this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.tenant', 'tenant')
      .leftJoinAndSelect('application.property', 'property')
      .where('property.landlordId = :landlordId', { landlordId });

    if (status) {
      queryBuilder.andWhere('application.status = :status', { status });
    }

    return queryBuilder
      .orderBy('application.createdAt', 'DESC')
      .getMany();
  }

  async getApplicationById(id: string, userId: string, userRole: UserRole) {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ['tenant', 'property', 'property.landlord'],
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    // Check permissions
    if (userRole === UserRole.TENANT && application.tenantId !== userId) {
      throw new ForbiddenException('You can only view your own applications');
    }

    if (userRole === UserRole.LANDLORD && application.property.landlordId !== userId) {
      throw new ForbiddenException('You can only view applications for your properties');
    }

    return application;
  }

  async updateApplicationStatus(
    applicationId: string,
    landlordId: string,
    updateStatusDto: UpdateApplicationStatusDto,
  ) {
    const { status, landlordNotes } = updateStatusDto;

    const application = await this.applicationRepository.findOne({
      where: { id: applicationId },
      relations: ['property'],
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    // Check if landlord owns the property
    if (application.property.landlordId !== landlordId) {
      throw new ForbiddenException('You can only update applications for your properties');
    }

    application.status = status;
    if (landlordNotes) {
      application.landlordNotes = landlordNotes;
    }

    return this.applicationRepository.save(application);
  }

  async withdrawApplication(applicationId: string, tenantId: string) {
    const application = await this.applicationRepository.findOne({
      where: { id: applicationId, tenantId },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.status !== ApplicationStatus.PENDING) {
      throw new BadRequestException('Only pending applications can be withdrawn');
    }

    application.status = ApplicationStatus.WITHDRAWN;
    await this.applicationRepository.save(application);

    return { message: 'Application withdrawn successfully' };
  }

  async getApplicationStats(landlordId: string) {
    const stats = await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoin('application.property', 'property')
      .select('application.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('property.landlordId = :landlordId', { landlordId })
      .groupBy('application.status')
      .getRawMany();

    const formattedStats = {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      withdrawn: 0,
    };

    stats.forEach(stat => {
      const count = parseInt(stat.count);
      formattedStats.total += count;
      formattedStats[stat.status] = count;
    });

    return formattedStats;
  }
}
