import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { PropertyEntity } from './property.entity';
import { ApplicationEntity } from './application.entity';
import { SavedPropertyEntity } from './saved-property.entity';
import {User, UserRole, UserStatus} from "@rent-easy-9ja/types";

@Entity('users')
export class UserEntity implements User{
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  fullName: string;

  @ApiProperty()
  @Column()
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ enum: UserRole })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TENANT,
  })
  role: UserRole;

  @ApiProperty({ enum: UserStatus })
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: UserStatus;

  @ApiProperty()
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty()
  @Column({ default: false })
  emailVerified: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  emailVerificationToken: string | null;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  passwordResetToken: string | null;

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires: Date | null;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PropertyEntity, (property) => property.landlord)
  properties: PropertyEntity[];

  @OneToMany(() => ApplicationEntity, (application) => application.tenant)
  applications: ApplicationEntity[];

  @OneToMany(() => SavedPropertyEntity, (savedProperty) => savedProperty.user)
  savedProperties: SavedPropertyEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
