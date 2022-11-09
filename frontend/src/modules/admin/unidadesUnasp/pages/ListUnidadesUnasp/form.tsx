import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { FilterListForm, IListFilter } from '#shared/components/FilterListForm';
import { FormDateTimePicker } from '#shared/components/form/FormDateTimePicker';
import { FormTextField } from '#shared/components/form/FormTextField';

import { IUnidadeUnaspFilters } from '../../types/IUnidadeUnasp';

export const defaultUnidadeUnaspFilter: IUnidadeUnaspFilters = {
  nome: '',
  contatoAssesoria: '',
  min_updated: null,
  max_updated: null,
};

export function ListUnidadeUnaspsFilter({
  apiConfig,
  ...props
}: IListFilter<IUnidadeUnaspFilters>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset: resetForm,
  } = useForm<IUnidadeUnaspFilters>();

  return (
    <FilterListForm
      defaultFilter={defaultUnidadeUnaspFilter}
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
            name="contatoAssesoria"
            label="Contato Assesoria"
            marginType="no-margin"
            defaultValue={apiConfig.filters.contatoAssesoria}
            errors={errors.contatoAssesoria}
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
      </Grid>
    </FilterListForm>
  );
}
