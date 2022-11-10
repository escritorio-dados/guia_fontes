import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindAllLimitedPeriodosQuery {
  @IsNotEmpty()
  @IsOptional()
  nome?: string;
}
