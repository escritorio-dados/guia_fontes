/* eslint-disable no-nested-ternary */
import { Autocomplete, TextField } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import { PopperStyled } from './styles';

interface IFormAutoComplete {
  name: string;
  label: string;
  control: Control<any>;
  defaultValue?: any;
  options: any;
  optionLabel?: string;
  optionValue?: string;
  multiple?: boolean;
  errors?: FieldError | FieldError[];
  disabled?: boolean;
  marginType?: 'no-margin' | 'left-margin';
  required?: boolean;
  freeSolo?: boolean;
}

export function FormSelect({
  multiple,
  options,
  optionLabel,
  optionValue,
  control,
  label,
  name,
  defaultValue,
  errors,
  disabled,
  marginType,
  required,
  freeSolo,
}: IFormAutoComplete) {
  const sxFixed = useMemo(() => {
    let marginTop: string | undefined = '1em';
    let marginLeft: string | undefined;

    if (marginType != null) {
      marginTop = undefined;
    }

    if (marginType === 'left-margin') {
      marginLeft = '1em';
    }

    return {
      marginTop,
      marginLeft,
    };
  }, [marginType]);

  const getLabel = useCallback<(option: any) => string>(
    (option: any) => {
      if (option == null) {
        return '';
      }

      if (optionLabel == null) {
        return option;
      }

      return option[optionLabel];
    },
    [optionLabel],
  );

  const isOptionValueEqual = useCallback(
    (option: any, value: any) => {
      if (optionValue == null) {
        return option === value;
      }

      return option[optionValue] === value[optionValue];
    },
    [optionValue],
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? (multiple === true ? [] : null)}
      render={({ field }) => (
        <Autocomplete
          {...field}
          noOptionsText="Nenhuma Opção"
          filterSelectedOptions
          getOptionLabel={getLabel}
          freeSolo={freeSolo}
          multiple={multiple}
          options={options}
          disabled={disabled}
          onChange={(_, data) => field.onChange(data)}
          isOptionEqualToValue={isOptionValueEqual}
          PopperComponent={PopperStyled}
          renderInput={(params) => (
            <TextField
              {...params}
              required={required}
              label={label}
              name={name}
              error={errors != null}
              helperText={
                errors != null ? (Array.isArray(errors) ? errors[0].message : errors.message) : ''
              }
              inputProps={{
                ...params.inputProps,
              }}
              sx={sxFixed}
            />
          )}
          fullWidth
        />
      )}
    />
  );
}
