// apps/api/src/applications/applications.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import {ApplicationEntity, PropertyEntity, UserEntity} from "../../entities";

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity, PropertyEntity, UserEntity])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
