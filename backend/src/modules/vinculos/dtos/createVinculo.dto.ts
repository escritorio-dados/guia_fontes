import { IsUUID } from 'class-validator';

export class CreateVinculoDto {
  @IsUUID()
  docente_id: string;

  @IsUUID()
  unidade_id: string;

  @IsUUID()
  periodo_id: string;
}
