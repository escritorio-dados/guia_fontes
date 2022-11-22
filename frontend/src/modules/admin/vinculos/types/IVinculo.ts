import { ICommonApi } from '#shared/types/ICommonApi';

import { IPeriodo } from '#modules/admin/periodos/types/IPeriodo';
import { IUnidadeUnasp } from '#modules/admin/unidadesUnasp/types/IUnidadeUnasp';

export type IVinculo = ICommonApi & {
  unidadeUnasp: IUnidadeUnasp;
  periodo: IPeriodo;
};

export interface ICreateVinculoInput {
  docente_id: string;
  unidade_id: string;
  periodo_id: string;
}

export interface IUpdateVinculoInput {
  unidade_id: string;
  periodo_id: string;
}
