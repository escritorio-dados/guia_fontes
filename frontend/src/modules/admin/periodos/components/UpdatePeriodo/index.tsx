import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { FormCheckbox } from '#shared/components/form/FormCheck';
import { FormTextField } from '#shared/components/form/FormTextField';
import { useToast } from '#shared/hooks/toast';
import { useGet, usePut } from '#shared/services/useAxios';
import { IReloadModal } from '#shared/types/IModal';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { IPeriodoSchema, periodoSchema } from '../../schemas/periodo.schema';
import { IPeriodo, IPeriodoInput } from '../../types/IPeriodo';

type IPeriodoInputModal = IReloadModal & { periodo_id: string };

export function UpdatePeriodoModal({
  closeModal,
  periodo_id,
  openModal,
  reloadList,
}: IPeriodoInputModal) {
  const { toast } = useToast();

  const { data: periodoData, error: periodoError } = useGet<IPeriodo>({
    url: `/periodos/${periodo_id}`,
  });

  const { send: updatePeriodo } = usePut<IPeriodo, IPeriodoInput>(`/periodos/${periodo_id}`);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPeriodoSchema>({
    resolver: yupResolver(periodoSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (periodoError != null) {
      toast({ message: periodoError, severity: 'error' });

      closeModal();
    }
  }, [periodoError, toast, closeModal]);

  const onSubmit = useCallback(
    async (formData: IPeriodoSchema) => {
      const fixedData = removeEmptyFields(formData);

      const { error: updateErrors } = await updatePeriodo(fixedData);

      if (updateErrors != null) {
        toast({ message: updateErrors, severity: 'error' });

        return;
      }

      reloadList();

      toast({ message: 'periodo atualizado', severity: 'success' });

      closeModal();
    },
    [updatePeriodo, reloadList, toast, closeModal],
  );

  return (
    <>
      {periodoData != null && (
        <CustomDialog open={openModal} closeModal={closeModal} title="Editar periodo" maxWidth="sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormTextField
              name="nome"
              label="Nome"
              defaultValue={periodoData.nome}
              control={control}
              errors={errors.nome}
              marginType="no-margin"
            />

            <FormCheckbox
              name="atual"
              label="Periodo Atual"
              control={control}
              defaultValue={periodoData.atual}
            />

            <CustomButton type="submit">Salvar Alterações</CustomButton>
          </form>
        </CustomDialog>
      )}
    </>
  );
}
