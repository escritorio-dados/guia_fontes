import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocentesModule } from '@modules/docentes/docentes.module';
import { PeriodosModule } from '@modules/periodos/periodos.module';
import { UnidadesUnaspModule } from '@modules/unidadesUnasp/unidadesUnasp.module';

import { VinculosController } from './controllers/vinculos.controller';
import { Vinculo } from './entities/Vinculo';
import { VinculosRepository } from './repositories/vinculos.repository';
import { CommonVinculoService } from './services/commonVinculo.service';
import { CreateVinculoService } from './services/createVinculo.service';
import { DeleteVinculoService } from './services/deleteVinculo.service';
import { FindOneVinculoService } from './services/findOneVinculo.service';
import { UpdateVinculoService } from './services/updateVinculo.service';

const services = [
  CreateVinculoService,
  VinculosRepository,
  FindOneVinculoService,
  DeleteVinculoService,
  UpdateVinculoService,
  CommonVinculoService,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Vinculo]),
    UnidadesUnaspModule,
    PeriodosModule,
    forwardRef(() => DocentesModule),
  ],
  controllers: [VinculosController],
  providers: services,
  exports: services,
})
export class VinculosModule {}
