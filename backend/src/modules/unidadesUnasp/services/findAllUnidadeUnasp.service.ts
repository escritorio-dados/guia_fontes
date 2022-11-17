import { Injectable } from '@nestjs/common';

import { IResponsePagination, paginationSizeLarge } from '@shared/types/pagination';
import { IFilterValueAlias } from '@shared/utils/filter/configFiltersRepository';
import { configRangeFilterAlias } from '@shared/utils/filter/configRangeFilter';
import { ISortConfig } from '@shared/utils/filter/configSortRepository';

import { UnidadeUnasp } from '../entities/UnidadeUnasp';
import { FindAllLimitedUnidadesUnaspQuery } from '../query/findAllLimited.unidadesUnasp.query';
import { FindPaginationUnidadesUnaspQuery } from '../query/findPagination.unidadesUnasp.query';
import { UnidadesUnaspRepository } from '../repositories/unidadesUnasp.repository';

@Injectable()
export class FindAllUnidadeUnaspService {
  constructor(private readonly unidadesUnaspRepository: UnidadesUnaspRepository) {}

  async findAllLimited(query: FindAllLimitedUnidadesUnaspQuery) {
    const filters: IFilterValueAlias[] = [
      {
        field: 'nome',
        values: [query.nome],
        operation: 'like',
        alias: ['unidadeUnasp.'],
      },
    ];

    const unidadesUnasp = await this.unidadesUnaspRepository.findLimited({ filters });

    return unidadesUnasp;
  }

  async findAllPagination(query: FindPaginationUnidadesUnaspQuery) {
    const filters: IFilterValueAlias[] = [
      {
        field: 'nome',
        values: [query.nome],
        operation: 'like',
        alias: ['unidadeUnasp.'],
      },
      {
        field: 'contatoAssesoria',
        values: [query.contatoAssesoria],
        operation: 'like',
        alias: ['unidadeUnasp.'],
      },
      {
        field: 'updated_at',
        ...configRangeFilterAlias({ minValue: query.min_updated, maxValue: query.max_updated }),
        alias: ['unidadeUnasp.'],
      },
    ];

    const sortConfig: ISortConfig = {
      id: { field: 'id', alias: ['unidadeUnasp.'] },
      nome: { field: 'nome', alias: ['unidadeUnasp.'] },
      contatoAssesoria: { field: 'contatoAssesoria', alias: ['unidadeUnasp.'] },
      updated_at: { field: 'updated_at', alias: ['unidadeUnasp.'] },
      created_at: { field: 'created_at', alias: ['unidadeUnasp.'] },
    };

    const sort = sortConfig[query.sort_by];

    const [unidadesUnasp, total_results] = await this.unidadesUnaspRepository.findPagination({
      page: query.page,
      sortBy: sort,
      orderBy: query.order_by,
      filters,
    });

    const apiData: IResponsePagination<UnidadeUnasp[]> = {
      pagination: {
        page: query.page,
        totalResults: total_results,
        totalPages: Math.ceil(total_results / paginationSizeLarge),
      },
      data: unidadesUnasp,
    };

    return apiData;
  }

  async findAllbyId(ids: string[]) {
    return await this.unidadesUnaspRepository.findByIds(ids);
  }
}
