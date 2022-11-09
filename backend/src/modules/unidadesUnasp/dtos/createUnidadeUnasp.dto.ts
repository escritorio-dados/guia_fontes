import { IsNotEmpty } from 'class-validator';

export class CreateUnidadeUnaspDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  contatoAssesoria: string;
}
