import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeriodosModule } from '@modules/periodos/periodos.module';
import { UnidadesUnaspModule } from '@modules/unidadesUnasp/unidadesUnasp.module';

import { Vinculo } from './entities/Vinculo';
import { VinculosRepository } from './repositories/vinculos.repository';
import { CreateVinculoService } from './services/createVinculo.service';

const services = [CreateVinculoService, VinculosRepository];

@Module({
  imports: [TypeOrmModule.forFeature([Vinculo]), UnidadesUnaspModule, PeriodosModule],
  controllers: [],
  providers: services,
  exports: services,
})
export class VinculosModule {}
