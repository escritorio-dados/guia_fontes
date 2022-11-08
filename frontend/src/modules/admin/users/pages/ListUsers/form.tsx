import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { FilterListForm, IListFilter } from '#shared/components/FilterListForm';
import { FormDateTimePicker } from '#shared/components/form/FormDateTimePicker';
import { FormTextField } from '#shared/components/form/FormTextField';

import { IUserFilters } from '../../types/IUser';

export const defaultUserFilter: IUserFilters = {
  nome: '',
  email: '',
  min_updated: null,
  max_updated: null,
};

export function ListUsersFilter({ apiConfig, ...props }: IListFilter<IUserFilters>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset: resetForm,
  } = useForm<IUserFilters>();

  return (
    <FilterListForm
      defaultFilter={defaultUserFilter}
      handleSubmit={handleSubmit}
      resetForm={resetForm}
      {...props}
    >
      <Grid container spacing={2}>
        <Grid item lg={4} sm={6} xs={12}>
          <FormTextField
            control={control}
            name="name"
            label="Nome"
            marginType="no-margin"
            defaultValue={apiConfig.filters.nome}
            errors={errors.nome}
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={12}>
          <FormTextField
            control={control}
            name="email"
            label="E-mail"
            marginType="no-margin"
            defaultValue={apiConfig.filters.email}
            errors={errors.email}
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
