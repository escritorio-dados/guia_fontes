import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AreasAtuacaoModule } from '@modules/areasAtuacao/areasAtuacao.module';
import { VinculosModule } from '@modules/vinculos/vinculos.module';

import { DocentesController } from './controllers/docentes.controller';
import { Docente } from './entities/Docente';
import { DocentesRepository } from './repositories/docentes.repository';
import { CommonDocenteService } from './services/commonDocente.service';
import { CreateDocenteService } from './services/createDocente.service';
import { FindAllDocenteService } from './services/findAllDocente.service';
import { FindOneDocenteService } from './services/findOneDocente.service';

const services = [
  CreateDocenteService,
  CommonDocenteService,
  DocentesRepository,
  FindAllDocenteService,
  FindOneDocenteService,
];

@Module({
  imports: [TypeOrmModule.forFeature([Docente]), AreasAtuacaoModule, VinculosModule],
  controllers: [DocentesController],
  providers: services,
  exports: services,
})
export class DocentesModule {}
