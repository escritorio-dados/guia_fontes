import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindAllLimitedUnidadesUnaspQuery {
  @IsNotEmpty()
  @IsOptional()
  nome?: string;
}
