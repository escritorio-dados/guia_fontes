import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CustomButton } from '#shared/components/CustomButton';
import { FormTextField } from '#shared/components/form/FormTextField';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import { usePatch } from '#shared/services/useAxios';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { IChangePasswordSchema, changePasswordSchema } from '../../schemas/changePassword.schema';
import { IUser, IChangePasswordInput } from '../../types/IUser';
import { ChangePasswordContainer } from './styles';

export function ChangePasswordUser() {
  const { updateTitle } = useTitle();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { send: updateUser } = usePatch<IUser, IChangePasswordInput>(`/users/me/password`);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    updateTitle('Alterar Senha');
  }, [updateTitle]);

  const handleChangePassword = useCallback(
    async (input: IChangePasswordSchema) => {
      removeEmptyFields(input);

      const { error } = await updateUser(input);

      if (error != null) {
        toast({ message: error, severity: 'error' });

        return;
      }

      toast({ message: 'senha atualizada', severity: 'success' });

      navigate(-1);
    },
    [navigate, toast, updateUser],
  );

  return (
    <>
      <ChangePasswordContainer elevation={3}>
        <Typography component="h2">Alterar Senha</Typography>

        <form onSubmit={handleSubmit(handleChangePassword)} noValidate>
          <FormTextField
            required
            type="password"
            control={control}
            name="oldPassword"
            label="Senha Atual"
            marginType="no-margin"
            errors={errors.oldPassword}
            inputProps={{
              autocomplete: 'new-password',
              form: {
                autocomplete: 'off',
              },
            }}
          />

          <FormTextField
            required
            type="password"
            control={control}
            name="newPassword"
            label="Nova Senha"
            errors={errors.newPassword}
            inputProps={{
              autocomplete: 'new-password',
              form: {
                autocomplete: 'off',
              },
            }}
          />

          <FormTextField
            required
            type="password"
            control={control}
            name="confirmPassword"
            label="Confirmar Nova Senha"
            errors={errors.confirmPassword}
            inputProps={{
              autocomplete: 'new-password',
              form: {
                autocomplete: 'off',
              },
            }}
          />

          <CustomButton type="submit">Alterar a Senha</CustomButton>

          <CustomButton color="info" onClick={() => navigate(-1)}>
            Cancelar
          </CustomButton>
        </form>
      </ChangePasswordContainer>
    </>
  );
}
