import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  IFindLimited,
  IFindPagination,
  limitedSize,
  paginationSizeLarge,
} from '@shared/types/pagination';
import { configFiltersQuery } from '@shared/utils/filter/configFiltersRepository';
import { configSortRepository } from '@shared/utils/filter/configSortRepository';

import { UnidadeUnasp } from '../entities/UnidadeUnasp';

interface ICreateUnidadeUnasp {
  nome: string;
  contatoAssesoria: string;
}

@Injectable()
export class UnidadesUnaspRepository {
  constructor(
    @InjectRepository(UnidadeUnasp)
    private readonly repository: Repository<UnidadeUnasp>,
  ) {}

  async findPagination({ sortBy, orderBy, page, filters, customFilters }: IFindPagination) {
    const query = this.repository
      .createQueryBuilder('unidadeUnasp')
      .select(['unidadeUnasp.id', 'unidadeUnasp.nome', 'unidadeUnasp.contatoAssesoria'])
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
      .createQueryBuilder('unidadeUnasp')
      .select(['unidadeUnasp.id', 'unidadeUnasp.nome'])
      .orderBy('unidadeUnasp.nome', 'ASC')
      .take(limitedSize);

    configFiltersQuery({
      query,
      filters,
      customFilters,
    });

    return await query.getMany();
  }

  async findById(id: string, relations?: string[]) {
    return await this.repository.findOne({ relations, where: { id } });
  }

  async findByNome(nome: string) {
    return await this.repository.findOne({ where: { nome } });
  }

  async create(unidadeUnasp: ICreateUnidadeUnasp) {
    const newUnidadeUnasp = this.repository.create(unidadeUnasp);

    await this.repository.save(newUnidadeUnasp);

    return newUnidadeUnasp;
  }

  async delete(unidadeUnasp: UnidadeUnasp) {
    await this.repository.remove(unidadeUnasp);
  }

  async save(unidadeUnasp: UnidadeUnasp) {
    return await this.repository.save(unidadeUnasp);
  }
}
