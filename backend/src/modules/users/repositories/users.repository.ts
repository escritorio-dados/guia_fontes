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

import { User } from '../entities/User';

interface ICreateUser {
  nome: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findPagination({ sortBy, orderBy, page, filters, customFilters }: IFindPagination) {
    const query = this.repository
      .createQueryBuilder('user')
      .select(['user.id', 'user.nome', 'user.email'])
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
      .createQueryBuilder('user')
      .select(['user.id', 'user.email'])
      .orderBy('user.email', 'ASC')
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

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  async create(user: ICreateUser) {
    const newUser = this.repository.create(user);

    await this.repository.save(newUser);

    return newUser;
  }

  async delete(user: User) {
    await this.repository.remove(user);
  }

  async save(user: User) {
    return await this.repository.save(user);
  }
}
