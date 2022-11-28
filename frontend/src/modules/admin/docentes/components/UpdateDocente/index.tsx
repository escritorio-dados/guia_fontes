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

import { IUpdateDocenteSchema, updateDocenteSchema } from '../../schemas/updateDocente.schema';
import { IDocente, IUpdateDocenteInput } from '../../types/IDocente';

type IDocenteInputModal = IReloadModal & { docente_id: string };

export function UpdateDocenteModal({
  closeModal,
  docente_id,
  openModal,
  reloadList,
}: IDocenteInputModal) {
  const { toast } = useToast();

  const { data: docenteData, error: docenteError } = useGet<IDocente>({
    url: `/docentes/${docente_id}`,
  });

  const { send: updateDocente } = usePut<IDocente, IUpdateDocenteInput>(`/docentes/${docente_id}`);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUpdateDocenteSchema>({
    resolver: yupResolver(updateDocenteSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (docenteError != null) {
      toast({ message: docenteError, severity: 'error' });

      closeModal();
    }
  }, [docenteError, toast, closeModal]);

  const onSubmit = useCallback(
    async (formData: IUpdateDocenteSchema) => {
      const fixedData = removeEmptyFields(formData);

      const { error: updateErrors } = await updateDocente(fixedData);

      if (updateErrors != null) {
        toast({ message: updateErrors, severity: 'error' });

        return;
      }

      reloadList();

      toast({ message: 'docente atualizado', severity: 'success' });

      closeModal();
    },
    [updateDocente, reloadList, toast, closeModal],
  );

  return (
    <>
      {docenteData != null && (
        <CustomDialog open={openModal} closeModal={closeModal} title="Editar docente" maxWidth="md">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormTextField
              name="nome"
              label="Nome"
              defaultValue={docenteData.nome}
              control={control}
              errors={errors.nome}
              marginType="no-margin"
            />

            <FormTextField
              name="cpf"
              label="CPF"
              defaultValue={docenteData.cpf}
              control={control}
              errors={errors.cpf}
            />

            <FormTextField
              name="contatoAssesoria"
              label="Contato Assesoria"
              defaultValue={docenteData.contatoAssesoria}
              control={control}
              errors={errors.contatoAssesoria}
            />

            <FormTextField
              name="emailAssesoria"
              label="Email Assesoria"
              defaultValue={docenteData.emailAssesoria}
              control={control}
              errors={errors.emailAssesoria}
            />

            <FormTextField
              name="lattesId"
              label="Id Lattes"
              defaultValue={docenteData.lattesId}
              control={control}
              errors={errors.lattesId}
            />

            <FormTextField
              name="resumoLattes"
              label="Resumo Lattes"
              multiline
              defaultValue={docenteData.resumoLattes}
              control={control}
              errors={errors.resumoLattes}
            />

            <FormCheckbox
              name="imprensa"
              label="Pode falar com a imprensa?"
              control={control}
              defaultValue={docenteData.imprensa}
            />

            <CustomButton type="submit">Salvar Alterações</CustomButton>
          </form>
        </CustomDialog>
      )}
    </>
  );
}
