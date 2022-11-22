import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { Docente } from '@modules/docentes/entities/Docente';
import { FindOneDocenteService } from '@modules/docentes/services/findOneDocente.service';

import { CreateAreaAtuacaoDto } from '../dtos/createAreaAtuacao.dto';
import { AreasAtuacaoRepository } from '../repositories/areasAtuacao.repository';
import { getAreaAtuacaoUniqueKey } from '../utils/getUniqueKeyAreaAtuacao';

export interface ICreateAreaAtuacaoXml {
  areaConhecimento: string;
  grandeArea?: string;
  subArea?: string;
  especialidade?: string;
  docente: Docente;
}

@Injectable()
export class CreateAreaAtuacaoService {
  constructor(
    private readonly areasAtuacaoRepository: AreasAtuacaoRepository,
    private readonly findOneDocenteService: FindOneDocenteService,
  ) {}

  async execute({
    areaConhecimento,
    docente_id,
    especialidade,
    grandeArea,
    subArea,
  }: CreateAreaAtuacaoDto) {
    const docente = await this.findOneDocenteService.getDocente(docente_id);

    return await this.areasAtuacaoRepository.create({
      areaConhecimento,
      docente,
      especialidade,
      grandeArea,
      subArea,
    });
  }

  async createManyFromXml(areas: ICreateAreaAtuacaoXml[], manager: EntityManager) {
    const objectAreas = Object.fromEntries(
      areas.map((area) => {
        const key = getAreaAtuacaoUniqueKey(area, true);

        return [key, area];
      }),
    );

    return await this.areasAtuacaoRepository.createMany(Object.values(objectAreas), manager);
  }
}
