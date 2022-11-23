import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AreasAtuacaoModule } from '@modules/areasAtuacao/areasAtuacao.module';
import { VinculosModule } from '@modules/vinculos/vinculos.module';

import { DocentesController } from './controllers/docentes.controller';
import { PublicDocentesController } from './controllers/publicDocentes.controller';
import { Docente } from './entities/Docente';
import { DocentesRepository } from './repositories/docentes.repository';
import { CommonDocenteService } from './services/commonDocente.service';
import { CreateDocenteService } from './services/createDocente.service';
import { DeleteDocenteService } from './services/deleteDocente.service';
import { FindAllDocenteService } from './services/findAllDocente.service';
import { FindOneDocenteService } from './services/findOneDocente.service';
import { UpdateDocenteService } from './services/updateDocente.service';

const services = [
  CreateDocenteService,
  CommonDocenteService,
  DocentesRepository,
  FindAllDocenteService,
  FindOneDocenteService,
  UpdateDocenteService,
  DeleteDocenteService,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Docente]),
    forwardRef(() => AreasAtuacaoModule),
    forwardRef(() => VinculosModule),
  ],
  controllers: [DocentesController, PublicDocentesController],
  providers: services,
  exports: services,
})
export class DocentesModule {}
