import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { AppError } from '@shared/errors/AppError';

import { Docente } from '@modules/docentes/entities/Docente';
import { FindOneDocenteService } from '@modules/docentes/services/findOneDocente.service';
import { Periodo } from '@modules/periodos/entities/Periodo';
import { FindAllPeriodoService } from '@modules/periodos/services/findAllPeriodo.service';
import { FindOnePeriodoService } from '@modules/periodos/services/findOnePeriodo.service';
import { UnidadeUnasp } from '@modules/unidadesUnasp/entities/UnidadeUnasp';
import { FindAllUnidadeUnaspService } from '@modules/unidadesUnasp/services/findAllUnidadeUnasp.service';
import { FindOneUnidadeUnaspService } from '@modules/unidadesUnasp/services/findOneUnidadeUnasp.service';

import { CreateVinculoDto } from '../dtos/createVinculo.dto';
import { vinculoErrors } from '../errors/vinculo.errors';
import { ICreateVinculo, VinculosRepository } from '../repositories/vinculos.repository';
import { getVinculoUniqueKey } from '../utils/getUniqueKeyVinculo';
import { CommonVinculoService } from './commonVinculo.service';

export interface ICreateVinculoXml {
  unidade_id: string;
  periodo_id: string;
  docente: Docente;
}

interface IItemMap<T> {
  [key: string]: null | T;
}

@Injectable()
export class CreateVinculoService {
  constructor(
    private readonly vinculosRepository: VinculosRepository,
    private readonly commonVinculoService: CommonVinculoService,
    private readonly findAllUnidadeUnaspService: FindAllUnidadeUnaspService,
    private readonly findOneUnidadeUnaspService: FindOneUnidadeUnaspService,
    private readonly findAllPeriodoService: FindAllPeriodoService,
    private readonly findOnePeriodoService: FindOnePeriodoService,
    private readonly findOneDocenteService: FindOneDocenteService,
  ) {}

  async execute({ docente_id, periodo_id, unidade_id }: CreateVinculoDto) {
    await this.commonVinculoService.checkVinculo({ docente_id, periodo_id, unidade_id });

    const docente = await this.findOneDocenteService.getDocente(docente_id);
    const periodo = await this.findOnePeriodoService.execute(periodo_id);
    const unidade = await this.findOneUnidadeUnaspService.execute(unidade_id);

    return await this.vinculosRepository.create({ docente, periodo, unidadeUnasp: unidade });
  }

  async createManyFromXml(vinculos: ICreateVinculoXml[], manager: EntityManager) {
    const periodosMap: IItemMap<Periodo> = {};
    const unidadesMap: IItemMap<UnidadeUnasp> = {};

    vinculos.forEach((vinculo) => {
      periodosMap[vinculo.periodo_id] = null;
      unidadesMap[vinculo.unidade_id] = null;
    });

    const unidades = await this.findAllUnidadeUnaspService.findAllbyId(Object.keys(unidadesMap));

    unidades.forEach((unidade) => (unidadesMap[unidade.id] = unidade));

    const periodos = await this.findAllPeriodoService.findAllbyId(Object.keys(periodosMap));

    periodos.forEach((periodo) => (periodosMap[periodo.id] = periodo));

    const objectVinculos = Object.fromEntries(
      vinculos.map<[string, ICreateVinculo]>((vinculo) => {
        const key = getVinculoUniqueKey(vinculo);

        const unidade = unidadesMap[vinculo.unidade_id];

        if (unidade == null) {
          throw new AppError(vinculoErrors.someUnidadeNotFount);
        }

        const periodo = periodosMap[vinculo.periodo_id];

        if (periodo == null) {
          throw new AppError(vinculoErrors.somePeriodoNotFound);
        }

        return [key, { ...vinculo, unidadeUnasp: unidade, periodo }];
      }),
    );

    return await this.vinculosRepository.createMany(Object.values(objectVinculos), manager);
  }
}
