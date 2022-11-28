import * as yup from 'yup';

export interface IUpdateDocenteSchema {
  nome: string;
  cpf?: string;
  contatoAssesoria?: string;
  emailAssesoria?: string;
  lattesId?: string;
  resumoLattes?: string;
  imprensa?: boolean;
}

export const updateDocenteSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
});
