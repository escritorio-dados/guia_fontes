import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { FormSelectAsync } from '#shared/components/form/FormSelectAsync';
import { useToast } from '#shared/hooks/toast';
import { useGet, usePost } from '#shared/services/useAxios';
import { limitedSize } from '#shared/types/ICommonApi';
import { IReloadModal } from '#shared/types/IModal';

import { IPeriodo } from '#modules/admin/periodos/types/IPeriodo';
import { IUnidadeUnasp } from '#modules/admin/unidadesUnasp/types/IUnidadeUnasp';

import { IVinculoSchema, vinculoSchema } from '../../schemas/vinculo.schema';
import { ICreateVinculoInput, IVinculo } from '../../types/IVinculo';

type ICreateVinculoModal = IReloadModal & { docente_id: string };

export function CreateVinculoModal({
  closeModal,
  openModal,
  reloadList,
  docente_id,
}: ICreateVinculoModal) {
  const { toast } = useToast();

  const { send: createVinculo } = usePost<IVinculo, ICreateVinculoInput>('vinculos');

  const {
    data: periodosData,
    error: periodosError,
    send: getPeriodos,
  } = useGet<IPeriodo[]>({
    url: '/periodos/limited',
    lazy: true,
  });

  const {
    data: unidadesData,
    error: unidadesError,
    send: getUnidades,
  } = useGet<IUnidadeUnasp[]>({
    url: '/unidades_unasp/limited',
    lazy: true,
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IVinculoSchema>({
    resolver: yupResolver(vinculoSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (periodosError != null) {
      toast({ message: periodosError, severity: 'error' });

      return;
    }

    if (unidadesError != null) {
      toast({ message: unidadesError, severity: 'error' });
    }
  }, [toast, periodosError, unidadesError]);

  const onSubmit = useCallback(
    async (input: IVinculoSchema) => {
      const { error: createError } = await createVinculo({
        periodo_id: input.periodo.id,
        unidade_id: input.unidade.id,
        docente_id,
      });

      if (createError != null) {
        toast({ message: createError, severity: 'error' });
        return;
      }

      toast({ message: 'vinculo criado', severity: 'success' });

      reloadList();

      closeModal();
    },
    [closeModal, createVinculo, docente_id, reloadList, toast],
  );

  return (
    <>
      <CustomDialog
        open={openModal}
        closeModal={closeModal}
        title="Cadastrar vinculo"
        maxWidth="sm"
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormSelectAsync
            control={control}
            name="periodo"
            label="Periodo"
            options={periodosData ?? []}
            optionLabel="nome"
            optionValue="id"
            marginType="no-margin"
            errors={errors.periodo as any}
            handleOpen={async () => await getPeriodos()}
            handleFilter={async (params) => await getPeriodos(params)}
            limitFilter={limitedSize}
            filterField="nome"
          />

          <FormSelectAsync
            control={control}
            name="unidade"
            label="Unidade"
            options={unidadesData ?? []}
            optionLabel="nome"
            optionValue="id"
            errors={errors.unidade as any}
            handleOpen={async () => await getUnidades()}
            handleFilter={async (params) => await getUnidades(params)}
            limitFilter={limitedSize}
            filterField="nome"
          />

          <CustomButton type="submit">Cadastrar</CustomButton>
        </form>
      </CustomDialog>
    </>
  );
}
