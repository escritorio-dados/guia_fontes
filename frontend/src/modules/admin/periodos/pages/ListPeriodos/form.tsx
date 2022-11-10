import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { FilterListForm, IListFilter } from '#shared/components/FilterListForm';
import { FormCheckbox } from '#shared/components/form/FormCheck';
import { FormDateTimePicker } from '#shared/components/form/FormDateTimePicker';
import { FormTextField } from '#shared/components/form/FormTextField';

import { IPeriodoFilters } from '../../types/IPeriodo';

export const defaultPeriodoFilter: IPeriodoFilters = {
  nome: '',
  atual: false,
  min_updated: null,
  max_updated: null,
};

export function ListPeriodosFilter({ apiConfig, ...props }: IListFilter<IPeriodoFilters>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset: resetForm,
  } = useForm<IPeriodoFilters>();

  return (
    <FilterListForm
      defaultFilter={defaultPeriodoFilter}
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
            name="atual"
            label="Periodo Atual"
            marginType="no-margin"
            defaultValue={apiConfig.filters.atual}
          />
        </Grid>
      </Grid>
    </FilterListForm>
  );
}
