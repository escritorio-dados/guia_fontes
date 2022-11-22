import { IsUUID } from 'class-validator';

export class VinculoXmlDto {
  @IsUUID()
  unidade_id: string;

  @IsUUID()
  periodo_id: string;
}
