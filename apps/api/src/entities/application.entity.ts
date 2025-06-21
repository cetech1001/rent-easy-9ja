import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Property } from './property.entity';

export enum ApplicationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

@Entity('applications')
export class Application {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', { nullable: true })
  message: string;

  @ApiProperty()
  @Column('simple-json', { nullable: true })
  documents: {
    idCard: string;
    proofOfIncome: string;
    references: string[];
  };

  @ApiProperty({ enum: ApplicationStatus })
  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @ApiProperty()
  @Column('text', { nullable: true })
  landlordNotes: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.applications, { eager: true })
  @JoinColumn({ name: 'tenantId' })
  tenant: User;

  @Column()
  tenantId: string;

  @ApiProperty({ type: () => Property })
  @ManyToOne(() => Property, (property) => property.applications, { eager: true })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column()
  propertyId: string;
}
