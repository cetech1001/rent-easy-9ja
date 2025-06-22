import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyEntity, SavedPropertyEntity, UserEntity } from '../../entities';
import { CreatePropertyDto, UpdatePropertyDto, PropertyQueryDto } from './dto';
import {PropertyStatus, UserRole} from "@rent-easy-9ja/types";

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(PropertyEntity)
    private propertyRepository: Repository<PropertyEntity>,
    @InjectRepository(SavedPropertyEntity)
    private savedPropertyRepository: Repository<SavedPropertyEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createProperty(landlordId: string, createPropertyDto: CreatePropertyDto) {
    const landlord = await this.userRepository.findOne({
      where: { id: landlordId, role: UserRole.LANDLORD },
    });

    if (!landlord) {
      throw new ForbiddenException('Only landlords can create properties');
    }

    const property = this.propertyRepository.create({
      ...createPropertyDto,
      landlordId,
    });

    return this.propertyRepository.save(property);
  }

  async getProperties(queryDto: PropertyQueryDto) {
    const {
      page = 1,
      limit = 10,
      city,
      state,
      type,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      amenities,
      status = PropertyStatus.AVAILABLE,
      search,
    } = queryDto;

    const queryBuilder = this.propertyRepository.createQueryBuilder('property')
      .leftJoinAndSelect('property.landlord', 'landlord')
      .where('property.status = :status', { status })
      .andWhere('property.isActive = :isActive', { isActive: true });

    if (city) {
      queryBuilder.andWhere('LOWER(property.city) = LOWER(:city)', { city });
    }

    if (state) {
      queryBuilder.andWhere('LOWER(property.state) = LOWER(:state)', { state });
    }

    if (type) {
      queryBuilder.andWhere('property.type = :type', { type });
    }

    if (minPrice) {
      queryBuilder.andWhere('property.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      queryBuilder.andWhere('property.price <= :maxPrice', { maxPrice });
    }

    if (bedrooms) {
      queryBuilder.andWhere('property.bedrooms = :bedrooms', { bedrooms });
    }

    if (bathrooms) {
      queryBuilder.andWhere('property.bathrooms = :bathrooms', { bathrooms });
    }

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(property.title) LIKE LOWER(:search) OR LOWER(property.description) LIKE LOWER(:search) OR LOWER(property.address) LIKE LOWER(:search))',
        { search: `%${search}%` }
      );
    }

    if (amenities && amenities.length > 0) {
      amenities.forEach((amenity: string) => {
        queryBuilder.andWhere(
          `property.amenities->>'${amenity}' = 'true'`
        );
      });
    }

    const total = await queryBuilder.getCount();
    const properties = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('property.createdAt', 'DESC')
      .getMany();

    return {
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getPropertyById(id: string, userId?: string) {
    const property = await this.propertyRepository.findOne({
      where: { id, isActive: true },
      relations: ['landlord'],
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    // Increment views
    property.views += 1;
    await this.propertyRepository.save(property);

    // Check if property is saved by user
    let isSaved = false;
    if (userId) {
      const savedProperty = await this.savedPropertyRepository.findOne({
        where: { userId, propertyId: id },
      });
      isSaved = !!savedProperty;
    }

    return { ...property, isSaved };
  }

  async getFeaturedProperties(limit: number = 6) {
    return this.propertyRepository.find({
      where: {
        status: PropertyStatus.AVAILABLE,
        isActive: true,
      },
      relations: ['landlord'],
      order: { views: 'DESC', createdAt: 'DESC' },
      take: limit,
    });
  }

  async getPropertiesByLandlord(landlordId: string, status?: PropertyStatus) {
    const whereCondition: any = { landlordId };
    if (status) {
      whereCondition.status = status;
    }

    return this.propertyRepository.find({
      where: whereCondition,
      relations: ['landlord'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateProperty(id: string, landlordId: string, updatePropertyDto: UpdatePropertyDto) {
    const property = await this.propertyRepository.findOne({
      where: { id, landlordId },
    });

    if (!property) {
      throw new NotFoundException('Property not found or you do not have permission to update it');
    }

    Object.assign(property, updatePropertyDto);
    return this.propertyRepository.save(property);
  }

  async deleteProperty(id: string, landlordId: string) {
    const property = await this.propertyRepository.findOne({
      where: { id, landlordId },
    });

    if (!property) {
      throw new NotFoundException('Property not found or you do not have permission to delete it');
    }

    // Soft delete by setting isActive to false
    property.isActive = false;
    await this.propertyRepository.save(property);

    return { message: 'Property deleted successfully' };
  }

  async saveProperty(userId: string, propertyId: string) {
    // Check if property exists
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId, isActive: true },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    // Check if already saved
    const existingSave = await this.savedPropertyRepository.findOne({
      where: { userId, propertyId },
    });

    if (existingSave) {
      throw new BadRequestException('Property already saved');
    }

    const savedProperty = this.savedPropertyRepository.create({
      userId,
      propertyId,
    });

    await this.savedPropertyRepository.save(savedProperty);
    return { message: 'Property saved successfully' };
  }

  async unsaveProperty(userId: string, propertyId: string) {
    const savedProperty = await this.savedPropertyRepository.findOne({
      where: { userId, propertyId },
    });

    if (!savedProperty) {
      throw new NotFoundException('Saved property not found');
    }

    await this.savedPropertyRepository.remove(savedProperty);
    return { message: 'Property unsaved successfully' };
  }

  async getSavedProperties(userId: string) {
    const savedProperties = await this.savedPropertyRepository.find({
      where: { userId },
      relations: ['property', 'property.landlord'],
      order: { createdAt: 'DESC' },
    });

    return savedProperties.map(saved => ({
      ...saved.property,
      savedAt: saved.createdAt,
    }));
  }

  async getPopularLocations() {
    const locations = await this.propertyRepository
      .createQueryBuilder('property')
      .select('property.city')
      .addSelect('property.state')
      .addSelect('COUNT(*)', 'count')
      .where('property.status = :status', { status: PropertyStatus.AVAILABLE })
      .andWhere('property.isActive = :isActive', { isActive: true })
      .groupBy('property.city')
      .addGroupBy('property.state')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    return locations.map(location => ({
      city: location.property_city,
      state: location.property_state,
      count: parseInt(location.count),
    }));
  }
}
