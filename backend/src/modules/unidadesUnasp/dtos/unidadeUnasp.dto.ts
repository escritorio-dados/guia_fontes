import { IsNotEmpty } from 'class-validator';

export class UnidadeUnaspDto {
  @IsNotEmpty()
  nome: string;
}
