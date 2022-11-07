import { Injectable } from '@nestjs/common';

import { IResponsePagination, paginationSizeLarge } from '@shared/types/pagination';
import { IFilterValueAlias } from '@shared/utils/filter/configFiltersRepository';
import { configRangeFilterAlias } from '@shared/utils/filter/configRangeFilter';
import { ISortConfig } from '@shared/utils/filter/configSortRepository';

import { User } from '../entities/User';
import { FindAllLimitedUsersQuery } from '../query/findAllLimited.users.query';
import { FindPaginationUsersQuery } from '../query/findPagination.users.query';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class FindAllUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAllLimited(query: FindAllLimitedUsersQuery) {
    const filters: IFilterValueAlias[] = [
      {
        field: 'email',
        values: [query.email],
        operation: 'like',
        alias: ['user.'],
      },
    ];

    const users = await this.usersRepository.findLimited({ filters });

    return users;
  }

  async findAllPagination(query: FindPaginationUsersQuery) {
    const filters: IFilterValueAlias[] = [
      {
        field: 'nome',
        values: [query.nome],
        operation: 'like',
        alias: ['user.'],
      },
      {
        field: 'email',
        values: [query.email],
        operation: 'like',
        alias: ['user.'],
      },
      {
        field: 'updated_at',
        ...configRangeFilterAlias({ minValue: query.min_updated, maxValue: query.max_updated }),
        alias: ['user.'],
      },
    ];

    const sortConfig: ISortConfig = {
      id: { field: 'id', alias: ['user.'] },
      name: { field: 'name', alias: ['user.'] },
      email: { field: 'email', alias: ['user.'] },
      updated_at: { field: 'updated_at', alias: ['user.'] },
      created_at: { field: 'created_at', alias: ['user.'] },
    };

    const sort = sortConfig[query.sort_by];

    const [users, total_results] = await this.usersRepository.findPagination({
      page: query.page,
      sortBy: sort,
      orderBy: query.order_by,
      filters,
    });

    const apiData: IResponsePagination<User[]> = {
      pagination: {
        page: query.page,
        totalResults: total_results,
        totalPages: Math.ceil(total_results / paginationSizeLarge),
      },
      data: users,
    };

    return apiData;
  }
}
