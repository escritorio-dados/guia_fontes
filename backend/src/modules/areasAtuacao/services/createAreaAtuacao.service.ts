import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { Docente } from '@modules/docentes/entities/Docente';

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
  constructor(private readonly areasAtuacaoRepository: AreasAtuacaoRepository) {}

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
