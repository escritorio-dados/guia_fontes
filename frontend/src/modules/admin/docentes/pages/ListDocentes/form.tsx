import { Grid } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { FilterListForm, IListFilter } from '#shared/components/FilterListForm';
import { FormCheckbox } from '#shared/components/form/FormCheck';
import { FormDateTimePicker } from '#shared/components/form/FormDateTimePicker';
import { FormSelectAsync } from '#shared/components/form/FormSelectAsync';
import { FormTextField } from '#shared/components/form/FormTextField';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { limitedSize } from '#shared/types/ICommonApi';

import { IPeriodo } from '#modules/admin/periodos/types/IPeriodo';
import { IUnidadeUnasp } from '#modules/admin/unidadesUnasp/types/IUnidadeUnasp';

import { IDocenteFilters } from '../../types/IDocente';

export const defaultDocenteFilter: IDocenteFilters = {
  nome: '',
  area: '',
  contato_assesoria: '',
  cpf: '',
  lattes_id: '',
  periodo: null,
  unidade: null,
  imprensa: false,
  min_updated: null,
  max_updated: null,
};

export function ListDocentesFilter({ apiConfig, ...props }: IListFilter<IDocenteFilters>) {
  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset: resetForm,
  } = useForm<IDocenteFilters>();

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
    if (periodosError != null) {
      toast({ message: periodosError, severity: 'error' });

      return;
    }

    if (unidadesError != null) {
      toast({ message: unidadesError, severity: 'error' });
    }
  }, [toast, periodosError, unidadesError]);

  const periodosOptions = useMemo(() => {
    const options = periodosData == null ? [] : periodosData;

    if (apiConfig.filters.periodo != null) {
      const filter = options.find((periodo) => periodo.id === apiConfig.filters.periodo?.id);

      if (filter == null) {
        options.push(apiConfig.filters.periodo as any);
      }
    }

    return options;
  }, [apiConfig.filters.periodo, periodosData]);

  const unidadesOptions = useMemo(() => {
    const options = unidadesData == null ? [] : unidadesData;

    if (apiConfig.filters.unidade != null) {
      const filter = options.find((unidade) => unidade.id === apiConfig.filters.unidade?.id);

      if (filter == null) {
        options.push(apiConfig.filters.unidade as any);
      }
    }

    return options;
  }, [apiConfig.filters.unidade, unidadesData]);

  return (
    <FilterListForm
      defaultFilter={defaultDocenteFilter}
      handleSubmit={handleSubmit}
      resetForm={resetForm}
      {...props}
    >
      <Grid container spacing={2}>
        <Grid item lg={4} sm={6} xs={12}>
          <FormTextField
            control={control}
            name="nome"
            label="Nome"
            marginType="no-margin"
            defaultValue={apiConfig.filters.nome}
            errors={errors.nome}
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={12}>
          <FormTextField
            control={control}
            name="contato_assesoria"
            label="Contato Assessoria"
            marginType="no-margin"
            defaultValue={apiConfig.filters.contato_assesoria}
            errors={errors.contato_assesoria}
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={12}>
          <FormTextField
            control={control}
            name="cpf"
            label="CPF"
            marginType="no-margin"
            defaultValue={apiConfig.filters.cpf}
            errors={errors.cpf}
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={12}>
          <FormTextField
            control={control}
            name="lattes_id"
            label="Id Lattes"
            marginType="no-margin"
            defaultValue={apiConfig.filters.lattes_id}
            errors={errors.lattes_id}
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={12}>
          <FormTextField
            control={control}
            name="area"
            label="Area"
            marginType="no-margin"
            defaultValue={apiConfig.filters.area}
            errors={errors.area}
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={12}>
          <FormSelectAsync
            control={control}
            name="periodo"
            label="Periodo"
            options={periodosOptions}
            optionLabel="nome"
            optionValue="id"
            defaultValue={apiConfig.filters.periodo}
            marginType="no-margin"
            errors={errors.periodo as any}
            // loading={periodosLoading}
            handleOpen={async () => await getPeriodos()}
            handleFilter={async (params) => await getPeriodos(params)}
            limitFilter={limitedSize}
            filterField="nome"
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={12}>
          <FormSelectAsync
            control={control}
            name="unidade"
            label="Unidade"
            options={unidadesOptions}
            optionLabel="nome"
            optionValue="id"
            defaultValue={apiConfig.filters.unidade}
            marginType="no-margin"
            errors={errors.unidade as any}
            // loading={unidadesLoading}
            handleOpen={async () => await getUnidades()}
            handleFilter={async (params) => await getUnidades(params)}
            limitFilter={limitedSize}
            filterField="nome"
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={12}>
          <FormDateTimePicker
            control={control}
            name="min_updated"
            label="Data de Atualização (Min)"
            marginType="no-margin"
            defaultValue={apiConfig.filters.min_updated}
            errors={errors.min_updated}
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={12}>
          <FormDateTimePicker
            control={control}
            name="max_updated"
            label="Data de Atualização (Max)"
            marginType="no-margin"
            defaultValue={apiConfig.filters.max_updated}
            errors={errors.max_updated}
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={12} sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <FormCheckbox
            control={control}
            name="imprensa"
            label="Pode Falar Com Imprensa"
            marginType="no-margin"
            defaultValue={apiConfig.filters.imprensa}
          />
        </Grid>
      </Grid>
    </FilterListForm>
  );
}
