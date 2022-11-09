import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnidadesUnaspController } from './controllers/unidadesUnasp.controller';
import { UnidadeUnasp } from './entities/UnidadeUnasp';
import { UnidadesUnaspRepository } from './repositories/unidadesUnasp.repository';
import { CommonUnidadeUnaspService } from './services/commonUnidadeUnasp.service';
import { CreateUnidadeUnaspService } from './services/createUnidadeUnasp.service';
import { DeleteUnidadeUnaspService } from './services/deleteUnidadeUnasp.service';
import { FindAllUnidadeUnaspService } from './services/findAllUnidadeUnasp.service';
import { FindOneUnidadeUnaspService } from './services/findOneUnidadeUnasp.service';
import { UpdateUnidadeUnaspService } from './services/updateUnidadeUnasp.service';

const services = [
  UnidadesUnaspRepository,
  CommonUnidadeUnaspService,
  FindAllUnidadeUnaspService,
  FindOneUnidadeUnaspService,
  CreateUnidadeUnaspService,
  UpdateUnidadeUnaspService,
  DeleteUnidadeUnaspService,
];

@Module({
  imports: [TypeOrmModule.forFeature([UnidadeUnasp])],
  controllers: [UnidadesUnaspController],
  providers: services,
  exports: services,
})
export class UnidadesUnaspModule {}
