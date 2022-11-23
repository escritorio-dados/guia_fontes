import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

import { transformBooleanApi } from '@shared/utils/transformApi';

export class FindPublicDocentesQuery {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @IsNotEmpty()
  @IsOptional()
  query?: string;

  @Transform(transformBooleanApi)
  @IsBoolean()
  @IsOptional()
  imprensa?: boolean;
}
