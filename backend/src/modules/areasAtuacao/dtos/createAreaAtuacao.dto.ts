import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateAreaAtuacaoDto {
  @IsUUID()
  docente_id: string;

  @IsNotEmpty()
  grandeArea: string;

  @IsNotEmpty()
  areaConhecimento: string;

  @IsOptional()
  @IsNotEmpty()
  subArea: string;

  @IsOptional()
  @IsNotEmpty()
  especialidade: string;
}
