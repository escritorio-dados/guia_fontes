import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { IFindPagination, paginationSizeLarge } from '@shared/types/pagination';
import { configFiltersQuery } from '@shared/utils/filter/configFiltersRepository';
import { configSortRepository } from '@shared/utils/filter/configSortRepository';

import { Docente } from '../entities/Docente';

interface ICreateDocente {
  nome: string;
  cpf?: string;
  contatoAssesoria?: string;
  lattesId?: string;
  resumoLattes?: string;
  imprensa: boolean;
}

@Injectable()
export class DocentesRepository {
  constructor(
    @InjectRepository(Docente)
    private readonly repository: Repository<Docente>,
  ) {}

  async findPagination({ sortBy, orderBy, page, filters, customFilters }: IFindPagination) {
    const query = this.repository
      .createQueryBuilder('docente')
      .select([
        'docente.id',
        'docente.nome',
        'docente.cpf',
        'docente.lattesId',
        'docente.imprensa',
        'docente.contatoAssesoria',
        'areasAtuacao.areaConhecimento',
        'vinculos.id',
        'docente.updated_at',
      ])
      .leftJoin('docente.areasAtuacao', 'areasAtuacao')
      .leftJoin('docente.vinculos', 'vinculos')
      .take(paginationSizeLarge)
      .skip((page - 1) * paginationSizeLarge);

    configSortRepository({ sortConfig: sortBy, order: orderBy, query });

    configFiltersQuery({
      query,
      filters,
      customFilters,
    });

    return await query.getManyAndCount();
  }

  async findById(id: string, relations?: string[]) {
    return await this.repository.findOne({ relations, where: { id } });
  }

  async findByLattes(lattesId: string) {
    return await this.repository.findOne({ where: { lattesId } });
  }

  async create(docente: ICreateDocente, manager?: EntityManager) {
    const repo = manager != null ? manager.getRepository(Docente) : this.repository;

    const newDocente = repo.create(docente);

    await repo.save(newDocente);

    return newDocente;
  }

  async delete(docente: Docente) {
    await this.repository.remove(docente);
  }

  async save(docente: Docente, manager?: EntityManager) {
    const repo = manager != null ? manager.getRepository(Docente) : this.repository;

    return await repo.save(docente);
  }
}
