import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Docente } from './entities/Docente';

const services = [];

@Module({
  imports: [TypeOrmModule.forFeature([Docente])],
  controllers: [],
  providers: services,
  exports: services,
})
export class DocentesModule {}
