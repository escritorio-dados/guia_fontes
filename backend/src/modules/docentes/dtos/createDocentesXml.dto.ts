import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

import { transformBooleanApi } from '@shared/utils/transformApi';

import { VinculoXmlDto } from '@modules/vinculos/dtos/vinculoXmlDto';

export class CreateDocentesXmlDto {
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  @IsNotEmpty()
  cpf: string;

  @IsOptional()
  @IsNotEmpty()
  contato_assesoria: string;

  @IsOptional()
  @IsBoolean()
  @Transform(transformBooleanApi)
  imprensa = false;

  @IsOptional()
  @Type(() => VinculoXmlDto)
  @IsArray()
  @ValidateNested({ each: true })
  vinculos: VinculoXmlDto[] = [];
}
