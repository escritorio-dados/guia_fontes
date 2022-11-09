import { IsNotEmpty } from 'class-validator';

export class UpdateUnidadeUnaspDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  contatoAssesoria: string;
}
