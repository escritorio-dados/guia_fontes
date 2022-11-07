import { IFilterValueAlias } from './configFiltersRepository';

interface IConfigRangeFilter {
  minValue?: Date | number;
  maxValue?: Date | number;
}

type DateFilter = Omit<IFilterValueAlias, 'alias' | 'field'>;

export function configRangeFilterAlias({ minValue, maxValue }: IConfigRangeFilter): DateFilter {
  const dateFilter: DateFilter = { operation: 'gte', values: [minValue] };

  if (minValue != null && maxValue != null) {
    if (minValue === maxValue) {
      dateFilter.operation = 'equal';
      dateFilter.values = [minValue];
    } else {
      dateFilter.operation = 'between';
      dateFilter.values = [minValue, maxValue];
    }
  } else if (minValue != null) {
    dateFilter.operation = 'gte';
    dateFilter.values = [minValue];
  } else if (maxValue != null) {
    dateFilter.operation = 'lte';
    dateFilter.values = [maxValue];
  }

  return dateFilter;
}
