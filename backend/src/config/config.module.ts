import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

import { JwtAuthGuard } from '@shared/providers/auth/guards/jwtAuth.guard';

import { postgresConnection } from './typeorm.config';

config();

@Module({
  imports: [
    // Typeorm
    TypeOrmModule.forRoot({
      ...postgresConnection,
      autoLoadEntities: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ConfigModule {}
