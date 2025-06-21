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
import { UserEntity } from './user.entity';
import { ApplicationEntity } from './application.entity';
import { SavedPropertyEntity } from './saved-property.entity';
import {Property, PropertyStatus, PropertyType} from "@rent-easy-9ja/types";

@Entity('properties')
export class PropertyEntity implements Property{
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

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.properties, { eager: true })
  @JoinColumn({ name: 'landlordId' })
  landlord: UserEntity;

  @Column()
  landlordId: string;

  @OneToMany(() => ApplicationEntity, (application) => application.property)
  applications: ApplicationEntity[];

  @OneToMany(() => SavedPropertyEntity, (savedProperty) => savedProperty.property)
  savedByUsers: SavedPropertyEntity[];
}
