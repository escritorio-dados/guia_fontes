import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { FormTextField } from '#shared/components/form/FormTextField';
import { useToast } from '#shared/hooks/toast';
import { useGet, usePut } from '#shared/services/useAxios';
import { IUpdateModal } from '#shared/types/IModal';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { IUpdateUserSchema, updateUserSchema } from '../../schemas/update.user.schema';
import { IUser, IUpdateUser } from '../../types/IUser';

type IUpdateUserModal = IUpdateModal<IUser> & { user_id: string };

export function UpdateUserModal({ closeModal, user_id, openModal, updateList }: IUpdateUserModal) {
  const { toast } = useToast();

  const { data: userData, error: userError } = useGet<IUser>({ url: `/users/${user_id}` });

  const { send: updateUser } = usePut<IUser, IUpdateUser>(`/users/${user_id}`);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUpdateUserSchema>({
    resolver: yupResolver(updateUserSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (userError != null) {
      toast({ message: userError, severity: 'error' });

      closeModal();
    }
  }, [userError, toast, closeModal]);

  const onSubmit = useCallback(
    async (formData: IUpdateUserSchema) => {
      const fixedData = removeEmptyFields(formData);

      const { error: updateErrors, data } = await updateUser(fixedData);

      if (updateErrors != null) {
        toast({ message: updateErrors, severity: 'error' });

        return;
      }

      updateList(user_id, data as IUser);

      toast({ message: 'usuario atualizado', severity: 'success' });

      closeModal();
    },
    [updateUser, updateList, user_id, toast, closeModal],
  );

  return (
    <>
      {userData != null && (
        <CustomDialog open={openModal} closeModal={closeModal} title="Editar usuario" maxWidth="md">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormTextField
              name="nome"
              label="Nome"
              defaultValue={userData.nome}
              control={control}
              errors={errors.nome}
              marginType="no-margin"
            />

            <FormTextField
              name="email"
              label="E-mail"
              control={control}
              errors={errors.email}
              defaultValue={userData.email}
            />

            <FormTextField
              name="password"
              label="Senha Nova"
              type="password"
              placeholder="Mantenha em branco para não alterar"
              inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}
              control={control}
              errors={errors.password}
            />

            <FormTextField
              name="confirmPassword"
              label="Confirmar Senha"
              type="password"
              placeholder="Mantenha em branco para não alterar"
              inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}
              control={control}
              errors={errors.confirmPassword}
            />

            <CustomButton type="submit">Salvar Alterações</CustomButton>
          </form>
        </CustomDialog>
      )}
    </>
  );
}
