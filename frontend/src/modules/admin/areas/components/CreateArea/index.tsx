import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { FormTextField } from '#shared/components/form/FormTextField';
import { useToast } from '#shared/hooks/toast';
import { usePost } from '#shared/services/useAxios';
import { IReloadModal } from '#shared/types/IModal';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { IAreaSchema, areaSchema } from '../../schemas/area.schema';
import { ICreateAreaInput, IArea } from '../../types/IArea';

type ICreateAreaModal = IReloadModal & { docente_id: string };

export function CreateAreaModal({
  closeModal,
  openModal,
  reloadList,
  docente_id,
}: ICreateAreaModal) {
  const { toast } = useToast();

  const { send: createArea } = usePost<IArea, ICreateAreaInput>('areas_atuacao');

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IAreaSchema>({
    resolver: yupResolver(areaSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit = useCallback(
    async (input: IAreaSchema) => {
      const { error: createError } = await createArea({ ...removeEmptyFields(input), docente_id });

      if (createError != null) {
        toast({ message: createError, severity: 'error' });
        return;
      }

      toast({ message: 'area criada', severity: 'success' });

      reloadList();

      closeModal();
    },
    [closeModal, createArea, docente_id, reloadList, toast],
  );

  return (
    <>
      <CustomDialog open={openModal} closeModal={closeModal} title="Cadastrar area" maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormTextField
            name="grandeArea"
            label="Grande Area"
            control={control}
            errors={errors.grandeArea}
            marginType="no-margin"
          />

          <FormTextField
            name="areaConhecimento"
            label="Area de Conhecimento"
            control={control}
            errors={errors.areaConhecimento}
          />

          <FormTextField
            name="subArea"
            label="Sub Area"
            control={control}
            errors={errors.subArea}
          />

          <FormTextField
            name="especialidade"
            label="Especialidade"
            control={control}
            errors={errors.especialidade}
          />

          <CustomButton type="submit">Cadastrar</CustomButton>
        </form>
      </CustomDialog>
    </>
  );
}
