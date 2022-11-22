import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { FormTextField } from '#shared/components/form/FormTextField';
import { useToast } from '#shared/hooks/toast';
import { useGet, usePut } from '#shared/services/useAxios';
import { IReloadModal } from '#shared/types/IModal';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { IAreaSchema, areaSchema } from '../../schemas/area.schema';
import { IArea, IUpdateAreaInput } from '../../types/IArea';

type IAreaInputModal = IReloadModal & { area_id: string };

export function UpdateAreaModal({ closeModal, area_id, openModal, reloadList }: IAreaInputModal) {
  const { toast } = useToast();

  const { data: areaData, error: areaError } = useGet<IArea>({
    url: `/areas_atuacao/${area_id}`,
  });

  const { send: updateArea } = usePut<IArea, IUpdateAreaInput>(`/areas_atuacao/${area_id}`);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAreaSchema>({
    resolver: yupResolver(areaSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (areaError != null) {
      toast({ message: areaError, severity: 'error' });

      closeModal();
    }
  }, [areaError, toast, closeModal]);

  const onSubmit = useCallback(
    async (formData: IAreaSchema) => {
      const fixedData = removeEmptyFields(formData);

      const { error: updateErrors } = await updateArea(fixedData);

      if (updateErrors != null) {
        toast({ message: updateErrors, severity: 'error' });

        return;
      }

      reloadList();

      toast({ message: 'area atualizada', severity: 'success' });

      closeModal();
    },
    [updateArea, reloadList, toast, closeModal],
  );

  return (
    <>
      {areaData != null && (
        <CustomDialog open={openModal} closeModal={closeModal} title="Editar area" maxWidth="sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormTextField
              name="grandeArea"
              label="Grande Area"
              control={control}
              defaultValue={areaData.grandeArea}
              errors={errors.grandeArea}
              marginType="no-margin"
            />

            <FormTextField
              name="areaConhecimento"
              label="Area de Conhecimento"
              control={control}
              defaultValue={areaData.areaConhecimento}
              errors={errors.areaConhecimento}
            />

            <FormTextField
              name="subArea"
              label="Sub Area"
              control={control}
              defaultValue={areaData.subArea}
              errors={errors.subArea}
            />

            <FormTextField
              name="especialidade"
              label="Especialidade"
              control={control}
              defaultValue={areaData.especialidade}
              errors={errors.especialidade}
            />

            <CustomButton type="submit">Salvar Alterações</CustomButton>
          </form>
        </CustomDialog>
      )}
    </>
  );
}
