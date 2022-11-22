import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocentesModule } from '@modules/docentes/docentes.module';

import { AreasAtuacaoController } from './controllers/areasAtuacao.controller';
import { AreaAtuacao } from './entities/AreaAtuacao';
import { AreasAtuacaoRepository } from './repositories/areasAtuacao.repository';
import { CommonAreaAtuacaoService } from './services/commonAreaAtuacao.service';
import { CreateAreaAtuacaoService } from './services/createAreaAtuacao.service';
import { DeleteAreaAtuacaoService } from './services/deleteAreaAtuacao.service';
import { FindOneAreaAtuacaoService } from './services/findOneAreaAtuacao.service';
import { UpdateAreaAtuacaoService } from './services/updateAreaAtuacao.service';

const services = [
  CreateAreaAtuacaoService,
  AreasAtuacaoRepository,
  DeleteAreaAtuacaoService,
  CommonAreaAtuacaoService,
  FindOneAreaAtuacaoService,
  UpdateAreaAtuacaoService,
];

@Module({
  imports: [TypeOrmModule.forFeature([AreaAtuacao]), forwardRef(() => DocentesModule)],
  controllers: [AreasAtuacaoController],
  providers: services,
  exports: services,
})
export class AreasAtuacaoModule {}
