import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';

import { transformBooleanApi } from '@shared/utils/transformApi';

import { VinculoXmlDto } from '@modules/vinculos/dtos/vinculoXmlDto';

export class CreateDocentesXmlDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  lattes_id: string;

  @IsBoolean()
  @Transform(transformBooleanApi)
  imprensa: boolean;

  @Type(() => VinculoXmlDto)
  @IsArray()
  @ValidateNested({ each: true })
  vinculos: VinculoXmlDto[];
}
