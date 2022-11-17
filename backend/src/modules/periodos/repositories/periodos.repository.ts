import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';

import {
  IFindLimited,
  IFindPagination,
  limitedSize,
  paginationSizeLarge,
} from '@shared/types/pagination';
import { configFiltersQuery } from '@shared/utils/filter/configFiltersRepository';
import { configSortRepository } from '@shared/utils/filter/configSortRepository';

import { Periodo } from '../entities/Periodo';

interface ICreatePeriodo {
  nome: string;
  atual?: boolean;
}

@Injectable()
export class PeriodosRepository {
  constructor(
    @InjectRepository(Periodo)
    private readonly repository: Repository<Periodo>,
  ) {}

  async findPagination({ sortBy, orderBy, page, filters, customFilters }: IFindPagination) {
    const query = this.repository
      .createQueryBuilder('periodo')
      .select(['periodo.id', 'periodo.nome', 'periodo.atual'])
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

  async findLimited({ filters, customFilters }: IFindLimited) {
    const query = this.repository
      .createQueryBuilder('periodo')
      .select(['periodo.id', 'periodo.nome'])
      .orderBy('periodo.nome', 'ASC')
      .take(limitedSize);

    configFiltersQuery({
      query,
      filters,
      customFilters,
    });

    return await query.getMany();
  }

  async findByIds(ids: string[], relations?: string[]) {
    return await this.repository.find({ relations, where: { id: In(ids) } });
  }

  async findById(id: string, relations?: string[]) {
    return await this.repository.findOne({ relations, where: { id } });
  }

  async findByNome(nome: string) {
    return await this.repository.findOne({ where: { nome } });
  }

  async findAtual() {
    return await this.repository.findOne({ where: { atual: true } });
  }

  async create(periodo: ICreatePeriodo, manager?: EntityManager) {
    const repo = manager != null ? manager.getRepository(Periodo) : this.repository;

    const newPeriodo = repo.create(periodo);

    await repo.save(newPeriodo);

    return newPeriodo;
  }

  async delete(periodo: Periodo) {
    await this.repository.remove(periodo);
  }

  async save(periodo: Periodo, manager?: EntityManager) {
    const repo = manager != null ? manager.getRepository(Periodo) : this.repository;

    return await repo.save(periodo);
  }
}
