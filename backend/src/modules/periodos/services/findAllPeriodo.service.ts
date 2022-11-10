import { Injectable } from '@nestjs/common';

import { IResponsePagination, paginationSizeLarge } from '@shared/types/pagination';
import { IFilterValueAlias } from '@shared/utils/filter/configFiltersRepository';
import { configRangeFilterAlias } from '@shared/utils/filter/configRangeFilter';
import { ISortConfig } from '@shared/utils/filter/configSortRepository';

import { Periodo } from '../entities/Periodo';
import { FindAllLimitedPeriodosQuery } from '../query/findAllLimited.periodos.query';
import { FindPaginationPeriodosQuery } from '../query/findPagination.periodos.query';
import { PeriodosRepository } from '../repositories/periodos.repository';

@Injectable()
export class FindAllPeriodoService {
  constructor(private readonly periodosRepository: PeriodosRepository) {}

  async findAllLimited(query: FindAllLimitedPeriodosQuery) {
    const filters: IFilterValueAlias[] = [
      {
        field: 'nome',
        values: [query.nome],
        operation: 'like',
        alias: ['periodo.'],
      },
    ];

    const periodos = await this.periodosRepository.findLimited({ filters });

    return periodos;
  }

  async findAllPagination(query: FindPaginationPeriodosQuery) {
    const filters: IFilterValueAlias[] = [
      {
        field: 'nome',
        values: [query.nome],
        operation: 'like',
        alias: ['periodo.'],
      },
      {
        field: 'atual',
        values: [query.atual],
        operation: 'equal',
        alias: ['periodo.'],
      },
      {
        field: 'updated_at',
        ...configRangeFilterAlias({ minValue: query.min_updated, maxValue: query.max_updated }),
        alias: ['periodo.'],
      },
    ];

    const sortConfig: ISortConfig = {
      id: { field: 'id', alias: ['periodo.'] },
      nome: { field: 'nome', alias: ['periodo.'] },
      updated_at: { field: 'updated_at', alias: ['periodo.'] },
      created_at: { field: 'created_at', alias: ['periodo.'] },
    };

    const sort = sortConfig[query.sort_by];

    const [periodos, total_results] = await this.periodosRepository.findPagination({
      page: query.page,
      sortBy: sort,
      orderBy: query.order_by,
      filters,
    });

    const apiData: IResponsePagination<Periodo[]> = {
      pagination: {
        page: query.page,
        totalResults: total_results,
        totalPages: Math.ceil(total_results / paginationSizeLarge),
      },
      data: periodos,
    };

    return apiData;
  }
}
