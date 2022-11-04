import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

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
})
export class ConfigModule {}
