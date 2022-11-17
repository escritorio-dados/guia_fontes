import { Transform } from 'class-transformer';
import { IsBoolean, IsUUID } from 'class-validator';

import { transformBooleanApi } from '@shared/utils/transformApi';

export class VinculoXmlDto {
  @IsUUID()
  unidade_id: string;

  @IsUUID()
  periodo_id: string;

  @IsBoolean()
  @Transform(transformBooleanApi)
  dominante: boolean;
}
