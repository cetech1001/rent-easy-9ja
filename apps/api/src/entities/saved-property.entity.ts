import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Property } from './property.entity';

@Entity('saved_properties')
@Unique(['userId', 'propertyId'])
export class SavedProperty {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.savedProperties)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ApiProperty({ type: () => Property })
  @ManyToOne(() => Property, (property) => property.savedByUsers, { eager: true })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column()
  propertyId: string;
}
