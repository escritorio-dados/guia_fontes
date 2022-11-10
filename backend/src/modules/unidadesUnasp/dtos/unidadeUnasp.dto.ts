import { IsNotEmpty, IsOptional } from 'class-validator';

export class UnidadeUnaspDto {
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  @IsNotEmpty()
  contatoAssesoria?: string;
}
