import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAreaAtuacaoDto {
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
