import { isAfter } from 'date-fns';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { getDynamicField } from '../getDynamicField';

export interface ISortConfig {
  [key: string]: ISortValue;
}

export interface ISortValue {
  field: string;
  alias: string[];
  subField?: string[];
}

interface IConfigSortRepository<T extends ObjectLiteral> {
  query: SelectQueryBuilder<T>;
  sortConfig: ISortValue;
  order: 'ASC' | 'DESC';
}

export function configSortRepository<T extends ObjectLiteral>({
  query,
  sortConfig: { alias, field },
  order,
}: IConfigSortRepository<T>) {
  const [alias1, ...otherAlias] = alias;

  query.orderBy(`${alias1}${field}`, order, 'NULLS LAST');

  otherAlias.forEach((a) => {
    query.addOrderBy(`${a}${field}`, order, 'NULLS LAST');
  });
}

type ISubFieldsValues = Date | string | number;

function sortSubFunction(a: ISubFieldsValues, b: ISubFieldsValues, order: number) {
  if (a == null) {
    return 1 * order;
  }

  if (b == null) {
    return -1 * order;
  }

  if (a instanceof Date && b instanceof Date) {
    return isAfter(a, b) ? 1 * order : -1 * order;
  }

  return a >= b ? 1 * order : -1 * order;
}

interface ISortSubs<T> {
  sort: ISortValue;
  subfield: string;
  list: T[];
  orderBy: string;
}

export function sortSubs<T>({ list, sort, subfield, orderBy }: ISortSubs<T>) {
  if (sort.subField == null) {
    return list;
  }

  return list.map((item) => {
    return {
      ...item,
      [subfield]: item[subfield].sort((a, b) => {
        const order = orderBy === 'ASC' ? 1 : -1;

        return sortSubFunction(
          getDynamicField({ fields: sort.subField as string[], object: a }),
          getDynamicField({ fields: sort.subField as string[], object: b }),
          order,
        );
      }),
    };
  });
}
