import { Transform, Type } from 'class-transformer';
import { IsDate, IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

import { transformDatesApi } from '@shared/utils/transformDatesApi';

import { UnidadeUnasp } from '../entities/UnidadeUnasp';

const sortFields = ['nome', 'id', 'contatoAssesoria', 'updated_at', 'created_at'];

export class FindPaginationUnidadesUnaspQuery {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @IsIn(sortFields)
  @IsOptional()
  sort_by: keyof UnidadeUnasp = 'updated_at';

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order_by: 'ASC' | 'DESC' = 'DESC';

  @IsNotEmpty()
  @IsOptional()
  nome?: string;

  @IsNotEmpty()
  @IsOptional()
  contatoAssesoria?: string;

  @IsDate()
  @IsOptional()
  @Transform(transformDatesApi)
  min_updated?: Date;

  @IsDate()
  @IsOptional()
  @Transform(transformDatesApi)
  max_updated?: Date;
}
