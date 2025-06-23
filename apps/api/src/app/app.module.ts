import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { PropertiesModule } from './properties/properties.module';
import { ApplicationsModule } from './applications/applications.module';

import {ApplicationEntity, PropertyEntity, SavedPropertyEntity, UserEntity} from '../entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [
          UserEntity,
          PropertyEntity,
          ApplicationEntity,
          SavedPropertyEntity,
        ],
        synchronize: /*configService.get('NODE_ENV') !== 'production'*/true,
        logging: configService.get('NODE_ENV') === 'development',
        ssl: { rejectUnauthorized: false },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    PropertiesModule,
    ApplicationsModule,
  ],
  providers: [
    EmailService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
