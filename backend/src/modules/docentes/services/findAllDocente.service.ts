import { Injectable } from '@nestjs/common';

import { IResponsePagination, paginationSizeLarge } from '@shared/types/pagination';
import { IFilterValueAlias } from '@shared/utils/filter/configFiltersRepository';
import { configRangeFilterAlias } from '@shared/utils/filter/configRangeFilter';
import { ISortConfig } from '@shared/utils/filter/configSortRepository';

import { Docente } from '../entities/Docente';
import { FindPaginationDocentesQuery } from '../query/findPagination.docentes.query';
import { DocentesRepository } from '../repositories/docentes.repository';

@Injectable()
export class FindAllDocenteService {
  constructor(private readonly docentesRepository: DocentesRepository) {}

  async findAllPagination(query: FindPaginationDocentesQuery) {
    const filters: IFilterValueAlias[] = [
      {
        field: 'nome',
        values: [query.nome],
        operation: 'like',
        alias: ['docente.'],
      },
      {
        field: 'area',
        values: [query.imprensa === true ? 'true' : undefined],
        operation: 'equal',
        alias: ['docente.'],
      },
      {
        field: 'areaConhecimento',
        values: [query.area],
        operation: 'like',
        alias: ['areasAtuacao.'],
      },
      {
        field: 'unidade_id',
        values: [query.unidade_id],
        operation: 'equal',
        alias: ['vinculos.'],
      },
      {
        field: 'periodo_id',
        values: [query.periodo_id],
        operation: 'equal',
        alias: ['vinculos.'],
      },
      {
        field: 'updated_at',
        ...configRangeFilterAlias({ minValue: query.min_updated, maxValue: query.max_updated }),
        alias: ['docente.'],
      },
    ];

    const sortConfig: ISortConfig = {
      id: { field: 'id', alias: ['docente.'] },
      nome: { field: 'nome', alias: ['docente.'] },
      imprensa: { field: 'imprensa', alias: ['docente.'] },
      lattes_id: { field: 'lattesId', alias: ['docente.'] },
      updated_at: { field: 'updated_at', alias: ['docente.'] },
      created_at: { field: 'created_at', alias: ['docente.'] },
    };

    const sort = sortConfig[query.sort_by];

    const [docentes, total_results] = await this.docentesRepository.findPagination({
      page: query.page,
      sortBy: sort,
      orderBy: query.order_by,
      filters,
    });

    const apiData: IResponsePagination<Docente[]> = {
      pagination: {
        page: query.page,
        totalResults: total_results,
        totalPages: Math.ceil(total_results / paginationSizeLarge),
      },
      data: docentes,
    };

    return apiData;
  }
}