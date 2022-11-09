import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { FormTextField } from '#shared/components/form/FormTextField';
import { useToast } from '#shared/hooks/toast';
import { usePost } from '#shared/services/useAxios';
import { IAddModal } from '#shared/types/IModal';

import { IUnidadeUnaspSchema, unidadeUnaspSchema } from '../../schemas/unidadeUnasp.schema';
import { IUnidadeUnaspInput, IUnidadeUnasp } from '../../types/IUnidadeUnasp';

export function CreateUnidadeUnaspModal({
  closeModal,
  openModal,
  addList,
}: IAddModal<IUnidadeUnasp>) {
  const { toast } = useToast();

  const { send: createUnidadeUnasp } = usePost<IUnidadeUnasp, IUnidadeUnaspInput>('unidades_unasp');

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IUnidadeUnaspSchema>({
    resolver: yupResolver(unidadeUnaspSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit = useCallback(
    async (input: IUnidadeUnaspSchema) => {
      const { error: createError, data: newUnidadeUnasp } = await createUnidadeUnasp(input);

      if (createError != null) {
        toast({ message: createError, severity: 'error' });
        return;
      }

      toast({ message: 'unidade criada', severity: 'success' });

      addList(newUnidadeUnasp as IUnidadeUnasp);

      closeModal();
    },
    [closeModal, createUnidadeUnasp, addList, toast],
  );

  return (
    <>
      <CustomDialog
        open={openModal}
        closeModal={closeModal}
        title="Cadastrar unidade"
        maxWidth="sm"
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormTextField
            name="nome"
            label="Nome"
            control={control}
            errors={errors.nome}
            marginType="no-margin"
          />

          <FormTextField
            name="contatoAssesoria"
            label="Contato Assesoria"
            control={control}
            errors={errors.contatoAssesoria}
          />

          <CustomButton type="submit">Cadastrar</CustomButton>
        </form>
      </CustomDialog>
    </>
  );
}
