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
import { UserEntity } from './user.entity';
import { PropertyEntity } from './property.entity';
import {SavedProperty} from "@rent-easy-9ja/types";

@Entity('saved_properties')
@Unique(['userId', 'propertyId'])
export class SavedPropertyEntity implements SavedProperty{
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.savedProperties)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: string;

  @ApiProperty({ type: () => PropertyEntity })
  @ManyToOne(() => PropertyEntity, (property) => property.savedByUsers, { eager: true })
  @JoinColumn({ name: 'propertyId' })
  property: PropertyEntity;

  @Column()
  propertyId: string;
}
