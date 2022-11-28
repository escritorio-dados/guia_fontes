import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDocenteDto {
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  @IsNotEmpty()
  cpf: string;

  @IsOptional()
  @IsNotEmpty()
  contatoAssesoria: string;

  @IsOptional()
  @IsNotEmpty()
  emailAssesoria: string;

  @IsOptional()
  @IsNotEmpty()
  lattesId: string;

  @IsOptional()
  @IsNotEmpty()
  resumoLattes: string;

  @IsBoolean()
  imprensa: boolean;
}
