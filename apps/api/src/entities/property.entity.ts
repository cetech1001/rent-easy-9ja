import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Application } from './application.entity';
import { SavedProperty } from './saved-property.entity';

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  STUDIO = 'studio',
  DUPLEX = 'duplex',
  COMMERCIAL = 'commercial',
  LAND = 'land',
}

export enum PropertyStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
  MAINTENANCE = 'maintenance',
  DRAFT = 'draft',
}

@Entity('properties')
export class Property {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty({ enum: PropertyType })
  @Column({
    type: 'enum',
    enum: PropertyType,
  })
  type: PropertyType;

  @ApiProperty()
  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  state: string;

  @ApiProperty()
  @Column()
  country: string;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 8, nullable: true })
  latitude: number;

  @ApiProperty()
  @Column('decimal', { precision: 11, scale: 8, nullable: true })
  longitude: number;

  @ApiProperty()
  @Column()
  bedrooms: number;

  @ApiProperty()
  @Column()
  bathrooms: number;

  @ApiProperty()
  @Column({ nullable: true })
  area: number;

  @ApiProperty()
  @Column({ default: 0 })
  parking: number;

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  images: string[];

  @ApiProperty()
  @Column('simple-json', { nullable: true })
  amenities: {
    furnished: boolean;
    ac: boolean;
    security: boolean;
    parking: boolean;
    wifi: boolean;
    gym: boolean;
    pool: boolean;
    generator: boolean;
  };

  @ApiProperty({ enum: PropertyStatus })
  @Column({
    type: 'enum',
    enum: PropertyStatus,
    default: PropertyStatus.DRAFT,
  })
  status: PropertyStatus;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Column({ default: 0 })
  views: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.properties, { eager: true })
  @JoinColumn({ name: 'landlordId' })
  landlord: User;

  @Column()
  landlordId: string;

  @OneToMany(() => Application, (application) => application.property)
  applications: Application[];

  @OneToMany(() => SavedProperty, (savedProperty) => savedProperty.property)
  savedByUsers: SavedProperty[];
}
