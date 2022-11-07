import { Brackets, ObjectLiteral, SelectQueryBuilder } from 'typeorm';

type IOperation = 'in' | 'like' | 'gte' | 'lte' | 'between' | 'array_contains' | 'equal';

type IValues = Date | number | string | undefined | null;

export type IFilterValue = [IOperation, ...IValues[]];

export interface IFilterConfig {
  [key: string]: IFilterValue;
}

export interface IFilterValueAlias {
  operation: IOperation;
  values?: IValues[];
  alias: string[];
  field: string;
}

interface IConfigFilterAlias<T extends ObjectLiteral> {
  query: SelectQueryBuilder<T>;
  filter: IFilterValueAlias;
}

function configFiltersAlias<T extends ObjectLiteral>({
  filter: { alias, operation, values, field },
  query,
}: IConfigFilterAlias<T>) {
  if (values == null) {
    return null;
  }

  const validValues = values.filter((value) => value != null);

  if (validValues.length === 0) {
    return null;
  }

  const [alias1, ...subAlias] = alias;

  let filter: string | Brackets = '';

  const value1Name = `${alias1}${field}_1`;
  const value2Name = `${alias1}${field}_2`;
  const valuesName = `${alias1}${field}_values`;

  switch (operation) {
    case 'between':
      filter = new Brackets((qb) => {
        qb.where(`${alias1}${field} between :${value1Name} and :${value2Name}`, {
          [value1Name]: validValues[0],
          [value2Name]: validValues[1],
        });

        subAlias.forEach((a) => {
          qb.orWhere(
            new Brackets((qb2) => {
              qb2
                .where(`${a}${field} between :${value1Name} and :${value2Name}`, {
                  [value1Name]: validValues[0],
                  [value2Name]: validValues[1],
                })
                .andWhere(`${a}id is not null`);
            }),
          );
        });
      });
      break;
    case 'in':
      filter = new Brackets((qb) => {
        qb.where(`${alias1}${field} in (:...${valuesName})`, { [valuesName]: validValues });

        subAlias.forEach((a) => {
          qb.orWhere(
            new Brackets((qb2) => {
              qb2
                .where(`${a}${field} in (:...${valuesName})`, { [valuesName]: validValues })
                .andWhere(`${a}id is not null`);
            }),
          );
        });
      });
      break;
    case 'array_contains':
      filter = new Brackets((qb) => {
        qb.where(`:${value1Name} = any(${alias1}${field})`, { [value1Name]: validValues[0] });

        subAlias.forEach((a) => {
          qb.orWhere(
            new Brackets((qb2) => {
              qb2
                .where(`${value1Name} = any(${a}${field})`, { [value1Name]: validValues[0] })
                .andWhere(`${a}id is not null`);
            }),
          );
        });
      });
      break;
    case 'like':
      filter = new Brackets((qb) => {
        qb.where(`${alias1}${field} ilike :${value1Name}`, { [value1Name]: `%${validValues[0]}%` });

        subAlias.forEach((a) => {
          qb.orWhere(
            new Brackets((qb2) => {
              qb2
                .where(`${a}${field} ilike :${value1Name}`, { [value1Name]: `%${validValues[0]}%` })
                .andWhere(`${a}id is not null`);
            }),
          );
        });
      });
      break;
    case 'equal':
      filter = new Brackets((qb) => {
        qb.where(`${alias1}${field} = :${value1Name}`, { [value1Name]: validValues[0] });

        subAlias.forEach((a) => {
          qb.orWhere(
            new Brackets((qb2) => {
              qb2
                .where(`${a}${field} = :${value1Name}`, { [value1Name]: validValues[0] })
                .andWhere(`${a}id is not null`);
            }),
          );
        });
      });
      break;
    case 'gte':
      filter = new Brackets((qb) => {
        qb.where(`${alias1}${field} >= :${value1Name}`, { [value1Name]: validValues[0] });

        subAlias.forEach((a) => {
          qb.orWhere(
            new Brackets((qb2) => {
              qb2
                .where(`${a}${field} >= :${value1Name}`, { [value1Name]: validValues[0] })
                .andWhere(`${a}id is not null`);
            }),
          );
        });
      });
      break;
    case 'lte':
      filter = new Brackets((qb) => {
        qb.where(`${alias1}${field} <= :${value1Name}`, { [value1Name]: validValues[0] });

        subAlias.forEach((a) => {
          qb.orWhere(
            new Brackets((qb2) => {
              qb2
                .where(`${a}${field} <= :${value1Name}`, { [value1Name]: validValues[0] })
                .andWhere(`${a}id is not null`);
            }),
          );
        });
      });
      break;
    default:
      break;
  }

  query.andWhere(filter);
}

export type ICustomFilters = Array<Brackets | string>;

interface IConfigureFiltersQuery<T extends ObjectLiteral> {
  filters: IFilterValueAlias[];
  query: SelectQueryBuilder<T>;
  customFilters?: ICustomFilters;
}

interface IConfigureFiltersQueryOr<T extends ObjectLiteral> {
  filters: IFilterValueAlias[];
  query: SelectQueryBuilder<T>;
  customFilters?: ICustomFilters[];
}

export function configFiltersQuery<T extends ObjectLiteral>({
  customFilters,
  filters,
  query,
}: IConfigureFiltersQuery<T>) {
  filters.forEach((filter) => {
    configFiltersAlias({ filter, query });
  });

  if (customFilters != null) {
    customFilters.forEach((customFilter) => {
      if (customFilter != null) {
        query.andWhere(customFilter);
      }
    });
  }
}

export function configFiltersQueryOr<T extends ObjectLiteral>({
  customFilters,
  filters,
  query,
}: IConfigureFiltersQueryOr<T>) {
  filters.forEach((filter) => {
    configFiltersAlias({ filter, query });
  });

  if (customFilters != null) {
    customFilters.forEach((customFilter) => {
      const [filter1, ...othersFilters] = customFilter;

      if (filter1 != null) {
        query.andWhere(
          new Brackets((q) => {
            q.where(filter1 as any);

            othersFilters.forEach((otherFilter) => {
              if (otherFilter != null) {
                q.orWhere(otherFilter as any);
              }
            });
          }),
        );
      }
    });
  }
}
