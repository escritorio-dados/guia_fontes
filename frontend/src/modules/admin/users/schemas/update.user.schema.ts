import * as yup from 'yup';

export interface IUpdateUserSchema {
  nome: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export const updateUserSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  password: yup.string().nullable(true),
  confirmPassword: yup
    .string()
    .nullable(true)
    .test({
      test: (pass, ctx) => {
        return ctx.parent.password === pass;
      },
      message: 'As senhas não são iguais',
    }),
});
