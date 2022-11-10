import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { FormCheckbox } from '#shared/components/form/FormCheck';
import { FormTextField } from '#shared/components/form/FormTextField';
import { useToast } from '#shared/hooks/toast';
import { usePost } from '#shared/services/useAxios';
import { IReloadModal } from '#shared/types/IModal';

import { IPeriodoSchema, periodoSchema } from '../../schemas/periodo.schema';
import { IPeriodoInput, IPeriodo } from '../../types/IPeriodo';

export function CreatePeriodoModal({ closeModal, openModal, reloadList }: IReloadModal) {
  const { toast } = useToast();

  const { send: createPeriodo } = usePost<IPeriodo, IPeriodoInput>('periodos');

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IPeriodoSchema>({
    resolver: yupResolver(periodoSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit = useCallback(
    async (input: IPeriodoSchema) => {
      const { error: createError } = await createPeriodo(input);

      if (createError != null) {
        toast({ message: createError, severity: 'error' });
        return;
      }

      toast({ message: 'periodo criado', severity: 'success' });

      reloadList();

      closeModal();
    },
    [closeModal, createPeriodo, reloadList, toast],
  );

  return (
    <>
      <CustomDialog
        open={openModal}
        closeModal={closeModal}
        title="Cadastrar periodo"
        maxWidth="xs"
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormTextField
            name="nome"
            label="Nome"
            control={control}
            errors={errors.nome}
            marginType="no-margin"
          />

          <FormCheckbox name="atual" label="Periodo Atual" control={control} />

          <CustomButton type="submit">Cadastrar</CustomButton>
        </form>
      </CustomDialog>
    </>
  );
}
