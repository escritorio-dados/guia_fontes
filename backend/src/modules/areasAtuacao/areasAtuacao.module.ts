import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AreaAtuacao } from './entities/AreaAtuacao';
import { AreasAtuacaoRepository } from './repositories/areasAtuacao.repository';
import { CreateAreaAtuacaoService } from './services/createAreaAtuacao.service';
import { DeleteAreaAtuacaoService } from './services/deleteAreaAtuacao.service';

const services = [CreateAreaAtuacaoService, AreasAtuacaoRepository, DeleteAreaAtuacaoService];

@Module({
  imports: [TypeOrmModule.forFeature([AreaAtuacao])],
  controllers: [],
  providers: services,
  exports: services,
})
export class AreasAtuacaoModule {}
