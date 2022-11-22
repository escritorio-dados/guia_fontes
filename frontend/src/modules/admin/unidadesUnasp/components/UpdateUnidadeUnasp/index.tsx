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

import { IUnidadeUnaspSchema, unidadeUnaspSchema } from '../../schemas/unidadeUnasp.schema';
import { IUnidadeUnasp, IUnidadeUnaspInput } from '../../types/IUnidadeUnasp';

type IUnidadeUnaspInputModal = IUpdateModal<IUnidadeUnasp> & { unidade_unasp_id: string };

export function UpdateUnidadeUnaspModal({
  closeModal,
  unidade_unasp_id,
  openModal,
  updateList,
}: IUnidadeUnaspInputModal) {
  const { toast } = useToast();

  const { data: unidadeUnaspData, error: unidadeUnaspError } = useGet<IUnidadeUnasp>({
    url: `/unidades_unasp/${unidade_unasp_id}`,
  });

  const { send: updateUnidadeUnasp } = usePut<IUnidadeUnasp, IUnidadeUnaspInput>(
    `/unidades_unasp/${unidade_unasp_id}`,
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUnidadeUnaspSchema>({
    resolver: yupResolver(unidadeUnaspSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (unidadeUnaspError != null) {
      toast({ message: unidadeUnaspError, severity: 'error' });

      closeModal();
    }
  }, [unidadeUnaspError, toast, closeModal]);

  const onSubmit = useCallback(
    async (formData: IUnidadeUnaspSchema) => {
      const fixedData = removeEmptyFields(formData);

      const { error: updateErrors, data } = await updateUnidadeUnasp(fixedData);

      if (updateErrors != null) {
        toast({ message: updateErrors, severity: 'error' });

        return;
      }

      updateList(unidade_unasp_id, data as IUnidadeUnasp);

      toast({ message: 'unidade atualizada', severity: 'success' });

      closeModal();
    },
    [updateUnidadeUnasp, updateList, unidade_unasp_id, toast, closeModal],
  );

  return (
    <>
      {unidadeUnaspData != null && (
        <CustomDialog open={openModal} closeModal={closeModal} title="Editar unidade" maxWidth="sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormTextField
              name="nome"
              label="Nome"
              defaultValue={unidadeUnaspData.nome}
              control={control}
              errors={errors.nome}
              marginType="no-margin"
            />

            <CustomButton type="submit">Salvar Alterações</CustomButton>
          </form>
        </CustomDialog>
      )}
    </>
  );
}
