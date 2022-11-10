import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeriodosController } from './controllers/periodos.controller';
import { Periodo } from './entities/Periodo';
import { PeriodosRepository } from './repositories/periodos.repository';
import { CommonPeriodoService } from './services/commonPeriodo.service';
import { CreatePeriodoService } from './services/createPeriodo.service';
import { DeletePeriodoService } from './services/deletePeriodo.service';
import { FindAllPeriodoService } from './services/findAllPeriodo.service';
import { FindOnePeriodoService } from './services/findOnePeriodo.service';
import { UpdatePeriodoService } from './services/updatePeriodo.service';

const services = [
  PeriodosRepository,
  CommonPeriodoService,
  FindAllPeriodoService,
  FindOnePeriodoService,
  CreatePeriodoService,
  UpdatePeriodoService,
  DeletePeriodoService,
];

@Module({
  imports: [TypeOrmModule.forFeature([Periodo])],
  controllers: [PeriodosController],
  providers: services,
  exports: services,
})
export class PeriodosModule {}
