import * as yup from 'yup';

export interface IDocenteSchema {
  nome: string;
  cpf?: string;
  contato_assesoria?: string;
  imprensa?: boolean;
}

export const docenteSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
});
