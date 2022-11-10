import * as yup from 'yup';

export interface IPeriodoSchema {
  nome: string;
  atual?: boolean;
}

export const periodoSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
});
