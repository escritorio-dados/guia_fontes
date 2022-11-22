import * as yup from 'yup';

import { IPeriodo } from '#modules/admin/periodos/types/IPeriodo';
import { IUnidadeUnasp } from '#modules/admin/unidadesUnasp/types/IUnidadeUnasp';

export interface IVinculoSchema {
  unidade: IUnidadeUnasp;
  periodo: IPeriodo;
}

export const vinculoSchema = yup.object().shape({
  unidade: yup.object().nullable().required('A unidade é obrigatória'),
  periodo: yup.object().nullable().required('O periodo é obrigatório'),
});
