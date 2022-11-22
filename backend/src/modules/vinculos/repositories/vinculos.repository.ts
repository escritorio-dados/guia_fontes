import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Docente } from '@modules/docentes/entities/Docente';
import { Periodo } from '@modules/periodos/entities/Periodo';
import { UnidadeUnasp } from '@modules/unidadesUnasp/entities/UnidadeUnasp';

import { Vinculo } from '../entities/Vinculo';

export interface ICreateVinculo {
  unidadeUnasp: UnidadeUnasp;
  docente: Docente;
  periodo: Periodo;
}

@Injectable()
export class VinculosRepository {
  constructor(
    @InjectRepository(Vinculo)
    private readonly repository: Repository<Vinculo>,
  ) {}

  async findById(id: string, relations?: string[]) {
    return await this.repository.findOne({ relations, where: { id } });
  }

  async createMany(vinculo: ICreateVinculo[], manager?: EntityManager) {
    const repo = manager != null ? manager.getRepository(Vinculo) : this.repository;

    const newVinculo = repo.create(vinculo);

    await repo.save(newVinculo);

    return newVinculo;
  }

  async delete(vinculo: Vinculo) {
    await this.repository.remove(vinculo);
  }

  async save(vinculo: Vinculo) {
    return await this.repository.save(vinculo);
  }
}
