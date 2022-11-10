import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class PeriodoDto {
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  @IsBoolean()
  atual?: boolean;
}
