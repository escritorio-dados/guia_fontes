import * as yup from 'yup';

export interface IUnidadeUnaspSchema {
  nome: string;
}

export const unidadeUnaspSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
});
