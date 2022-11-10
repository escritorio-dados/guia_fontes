import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

import { transformBooleanApi, transformDatesApi } from '@shared/utils/transformApi';

import { Periodo } from '../entities/Periodo';

const sortFields = ['nome', 'id', 'updated_at', 'created_at'];

export class FindPaginationPeriodosQuery {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @IsIn(sortFields)
  @IsOptional()
  sort_by: keyof Periodo = 'updated_at';

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order_by: 'ASC' | 'DESC' = 'DESC';

  @IsNotEmpty()
  @IsOptional()
  nome?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(transformBooleanApi)
  atual?: boolean;

  @IsDate()
  @IsOptional()
  @Transform(transformDatesApi)
  min_updated?: Date;

  @IsDate()
  @IsOptional()
  @Transform(transformDatesApi)
  max_updated?: Date;
}
