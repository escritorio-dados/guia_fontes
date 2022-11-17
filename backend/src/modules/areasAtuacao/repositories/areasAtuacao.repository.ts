import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Docente } from '@modules/docentes/entities/Docente';

import { AreaAtuacao } from '../entities/AreaAtuacao';

interface ICreateAreaAtuacao {
  areaConhecimento: string;
  grandeArea?: string;
  subArea?: string;
  especialidade?: string;
  docente: Docente;
}

@Injectable()
export class AreasAtuacaoRepository {
  constructor(
    @InjectRepository(AreaAtuacao)
    private readonly repository: Repository<AreaAtuacao>,
  ) {}

  async findById(id: string, relations?: string[]) {
    return await this.repository.findOne({ relations, where: { id } });
  }

  async createMany(areaAtuacao: ICreateAreaAtuacao[], manager?: EntityManager) {
    const repo = manager != null ? manager.getRepository(AreaAtuacao) : this.repository;

    const newAreaAtuacao = repo.create(areaAtuacao);

    await repo.save(newAreaAtuacao);

    return newAreaAtuacao;
  }

  async delete(areaAtuacao: AreaAtuacao) {
    await this.repository.remove(areaAtuacao);
  }

  async save(areaAtuacao: AreaAtuacao) {
    return await this.repository.save(areaAtuacao);
  }
}
