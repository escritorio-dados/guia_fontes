import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AreaAtuacao } from './entities/AreaAtuacao';

const services = [];

@Module({
  imports: [TypeOrmModule.forFeature([AreaAtuacao])],
  controllers: [],
  providers: services,
  exports: services,
})
export class AreasAtuacaoModule {}
