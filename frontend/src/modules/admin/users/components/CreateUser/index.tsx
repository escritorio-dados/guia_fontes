import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { FormTextField } from '#shared/components/form/FormTextField';
import { useToast } from '#shared/hooks/toast';
import { usePost } from '#shared/services/useAxios';
import { IAddModal } from '#shared/types/IModal';

import { ICreateUserSchema, createUserSchema } from '../../schemas/create.user.schema';
import { ICreateUser, IUser } from '../../types/IUser';

export function CreateUserModal({ closeModal, openModal, addList }: IAddModal<IUser>) {
  const { toast } = useToast();

  const { send: createUser } = usePost<IUser, ICreateUser>('users');

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ICreateUserSchema>({
    resolver: yupResolver(createUserSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit = useCallback(
    async (input: ICreateUserSchema) => {
      const { error: createError, data: newUser } = await createUser(input);

      if (createError != null) {
        toast({ message: createError, severity: 'error' });
        return;
      }

      toast({ message: 'usuario criado', severity: 'success' });

      addList(newUser as IUser);

      closeModal();
    },
    [closeModal, createUser, addList, toast],
  );

  return (
    <>
      <CustomDialog
        open={openModal}
        closeModal={closeModal}
        title="Cadastrar usuario"
        maxWidth="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormTextField
            name="nome"
            label="Nome"
            control={control}
            errors={errors.nome}
            marginType="no-margin"
          />

          <FormTextField name="email" label="E-mail" control={control} errors={errors.email} />

          <FormTextField
            name="password"
            label="Senha"
            type="password"
            autoComplete="off"
            control={control}
            errors={errors.password}
          />

          <FormTextField
            name="confirmPassword"
            label="Confirmar Senha"
            type="password"
            autoComplete="off"
            control={control}
            errors={errors.confirmPassword}
          />

          <CustomButton type="submit">Cadastrar</CustomButton>
        </form>
      </CustomDialog>
    </>
  );
}
