import { IsUUID } from 'class-validator';

export class UpdateVinculoDto {
  @IsUUID()
  unidade_id: string;

  @IsUUID()
  periodo_id: string;
}
