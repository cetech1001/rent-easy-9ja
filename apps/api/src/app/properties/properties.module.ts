import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import {ApplicationEntity, PropertyEntity, SavedPropertyEntity, UserEntity} from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity, SavedPropertyEntity, ApplicationEntity, UserEntity])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
