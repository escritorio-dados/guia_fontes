import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

import { transformBooleanApi, transformDatesApi } from '@shared/utils/transformApi';

import { Docente } from '../entities/Docente';

const sortFields = ['nome', 'id', 'updated_at', 'created_at', 'imprensa', 'lattes_id'];

export class FindPaginationDocentesQuery {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @IsIn(sortFields)
  @IsOptional()
  sort_by: keyof Docente = 'updated_at';

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order_by: 'ASC' | 'DESC' = 'DESC';

  @IsNotEmpty()
  @IsOptional()
  nome?: string;

  @IsNotEmpty()
  @IsOptional()
  area?: string;

  @IsUUID()
  @IsOptional()
  unidade_id?: string;

  @IsUUID()
  @IsOptional()
  periodo_id?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(transformBooleanApi)
  imprensa?: boolean;

  @IsDate()
  @IsOptional()
  @Transform(transformDatesApi)
  min_updated?: Date;

  @IsDate()
  @IsOptional()
  @Transform(transformDatesApi)
  max_updated?: Date;
}
