import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vinculo } from './entities/Vinculo';

const services = [];

@Module({
  imports: [TypeOrmModule.forFeature([Vinculo])],
  controllers: [],
  providers: services,
  exports: services,
})
export class VinculosModule {}
