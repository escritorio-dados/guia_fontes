import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { FormSelectAsync } from '#shared/components/form/FormSelectAsync';
import { useToast } from '#shared/hooks/toast';
import { useGet, usePut } from '#shared/services/useAxios';
import { limitedSize } from '#shared/types/ICommonApi';
import { IReloadModal } from '#shared/types/IModal';

import { IPeriodo } from '#modules/admin/periodos/types/IPeriodo';
import { IUnidadeUnasp } from '#modules/admin/unidadesUnasp/types/IUnidadeUnasp';

import { IVinculoSchema, vinculoSchema } from '../../schemas/vinculo.schema';
import { IVinculo, IUpdateVinculoInput } from '../../types/IVinculo';

type IVinculoInputModal = IReloadModal & { vinculo_id: string };

export function UpdateVinculoModal({
  closeModal,
  vinculo_id,
  openModal,
  reloadList,
}: IVinculoInputModal) {
  const { toast } = useToast();

  const { data: vinculoData, error: vinculoError } = useGet<IVinculo>({
    url: `/vinculos/${vinculo_id}`,
  });

  const { send: updateVinculo } = usePut<IVinculo, IUpdateVinculoInput>(`/vinculos/${vinculo_id}`);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IVinculoSchema>({
    resolver: yupResolver(vinculoSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

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

  useEffect(() => {
    if (vinculoError != null) {
      toast({ message: vinculoError, severity: 'error' });

      closeModal();

      return;
    }

    if (periodosError != null) {
      toast({ message: periodosError, severity: 'error' });

      return;
    }

    if (unidadesError != null) {
      toast({ message: unidadesError, severity: 'error' });
    }
  }, [vinculoError, toast, closeModal, periodosError, unidadesError]);

  const onSubmit = useCallback(
    async (formData: IVinculoSchema) => {
      const { error: updateErrors } = await updateVinculo({
        periodo_id: formData.periodo.id,
        unidade_id: formData.unidade.id,
      });

      if (updateErrors != null) {
        toast({ message: updateErrors, severity: 'error' });

        return;
      }

      reloadList();

      toast({ message: 'vinculo atualizado', severity: 'success' });

      closeModal();
    },
    [updateVinculo, reloadList, toast, closeModal],
  );

  const periodosOptions = useMemo(() => {
    const options = periodosData == null ? [] : periodosData;

    if (vinculoData?.periodo != null) {
      const filter = options.find((periodo) => periodo.id === vinculoData.periodo?.id);

      if (filter == null) {
        options.push(vinculoData.periodo as any);
      }
    }

    return options;
  }, [periodosData, vinculoData]);

  const unidadesOptions = useMemo(() => {
    const options = unidadesData == null ? [] : unidadesData;

    if (vinculoData?.unidadeUnasp != null) {
      const filter = options.find((unidade) => unidade.id === vinculoData.unidadeUnasp?.id);

      if (filter == null) {
        options.push(vinculoData.unidadeUnasp as any);
      }
    }

    return options;
  }, [unidadesData, vinculoData]);

  return (
    <>
      {vinculoData != null && (
        <CustomDialog open={openModal} closeModal={closeModal} title="Editar vinculo" maxWidth="sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormSelectAsync
              control={control}
              name="periodo"
              label="Periodo"
              options={periodosOptions}
              defaultValue={vinculoData.periodo}
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
              options={unidadesOptions}
              defaultValue={vinculoData.unidadeUnasp}
              optionLabel="nome"
              optionValue="id"
              errors={errors.unidade as any}
              handleOpen={async () => await getUnidades()}
              handleFilter={async (params) => await getUnidades(params)}
              limitFilter={limitedSize}
              filterField="nome"
            />

            <CustomButton type="submit">Salvar Alterações</CustomButton>
          </form>
        </CustomDialog>
      )}
    </>
  );
}
