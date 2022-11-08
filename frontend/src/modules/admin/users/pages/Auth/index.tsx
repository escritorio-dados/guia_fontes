import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

import { CustomButton } from '#shared/components/CustomButton';
import { FormTextField } from '#shared/components/form/FormTextField';
import { useAuth } from '#shared/hooks/auth';
import { useTitle } from '#shared/hooks/title';

import { authSchema, IAuthSchema } from '../../schemas/auth.schema';
import { AuthContainer, FormStyled } from './styles';

export function Auth() {
  const { updateTitle } = useTitle();
  const { signIn, logged } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuthSchema>({
    resolver: yupResolver(authSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (logged) {
      if (state?.returnThisPage != null) {
        navigate(-1);
      } else {
        navigate('/admin');
      }
    }

    updateTitle('Autenticação');
  }, [navigate, logged, updateTitle, state]);

  const onSubmit = useCallback(
    async (input: IAuthSchema) => {
      await signIn(input);
    },
    [signIn],
  );

  return (
    <AuthContainer elevation={2}>
      <Typography component="h2">Login</Typography>

      <FormStyled onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormTextField
          required
          control={control}
          name="email"
          label="E-mail"
          marginType="no-margin"
          errors={errors.email}
        />

        <FormTextField
          required
          control={control}
          autoComplete="current-password"
          type="password"
          name="password"
          label="Senha"
          errors={errors.password}
        />

        <CustomButton type="submit">Entrar</CustomButton>
      </FormStyled>
    </AuthContainer>
  );
}
