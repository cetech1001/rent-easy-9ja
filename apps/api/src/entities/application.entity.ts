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
import { UserEntity } from './user.entity';
import { PropertyEntity } from './property.entity';
import {Application, ApplicationStatus} from "@rent-easy-9ja/types";

@Entity('applications')
export class ApplicationEntity implements Application{
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

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.applications, { eager: true })
  @JoinColumn({ name: 'tenantId' })
  tenant: UserEntity;

  @Column()
  tenantId: string;

  @ApiProperty({ type: () => PropertyEntity })
  @ManyToOne(() => PropertyEntity, (property) => property.applications, { eager: true })
  @JoinColumn({ name: 'propertyId' })
  property: PropertyEntity;

  @Column()
  propertyId: string;
}
