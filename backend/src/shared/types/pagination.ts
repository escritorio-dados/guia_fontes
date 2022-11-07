import { ICustomFilters, IFilterValueAlias } from '@shared/utils/filter/configFiltersRepository';
import { ISortValue } from '@shared/utils/filter/configSortRepository';

export interface IResponsePagination<T> {
  pagination: {
    totalResults: number;
    totalPages: number;
    page: number;
  };
  data: T;
}

export interface IFindPagination {
  sortBy: ISortValue;
  orderBy: 'ASC' | 'DESC';
  page: number;
  filters: IFilterValueAlias[];
  customFilters?: ICustomFilters;
}

export const paginationSizeSmall = 3;

export const paginationSize = 10;

export const paginationSizeLarge = 25;

export const limitedSize = 100;

export interface IFindLimited {
  filters: IFilterValueAlias[];
  customFilters?: ICustomFilters;
}
