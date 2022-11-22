/* eslint-disable no-nested-ternary */
import { Autocomplete, AutocompleteRenderOptionState, TextField } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { PopperStyled } from './styles';

interface ICustomSelectAsync {
  label: string;
  value: any;
  onChange: (newValue: any) => void;
  options: any;
  optionLabel?: string;
  optionValue?: string;
  multiple?: boolean;
  errors?: string;
  disabled?: boolean;
  marginType?: 'no-margin' | 'left-margin';
  required?: boolean;
  freeSolo?: boolean;
  handleOpen: () => void;
  handleFilter: (filterParams?: any) => void;
  limitFilter: number;
  filterField: string;
  helperText?: string;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    options: any,
    state: AutocompleteRenderOptionState,
  ) => JSX.Element;
}

export function CustomSelectAsync({
  multiple,
  options,
  optionLabel,
  label,
  errors,
  disabled,
  marginType,
  required,
  freeSolo,
  handleOpen,
  handleFilter,
  limitFilter = 100,
  filterField,
  helperText,
  onChange,
  value,
  optionValue,
  renderOption,
}: ICustomSelectAsync) {
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

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

  const handleFilters = useCallback(
    (inputValue: string) => {
      if ((options != null && options.length >= limitFilter) || filtered) {
        const filterParams =
          inputValue !== '' ? { params: { [filterField]: inputValue } } : undefined;

        handleFilter(filterParams);

        setFiltered(inputValue !== '');
      }
    },
    [filterField, filtered, handleFilter, limitFilter, options],
  );

  const handleOnOpen = useCallback(() => {
    setOpen(true);

    if (firstLoad) {
      handleOpen();

      setFirstLoad(false);
    }
  }, [firstLoad, handleOpen]);

  return (
    <Autocomplete
      noOptionsText="Nenhuma Opção"
      filterSelectedOptions
      open={open}
      getOptionLabel={getLabel}
      freeSolo={freeSolo}
      multiple={multiple}
      options={options}
      disabled={disabled}
      onChange={(_, data) => onChange(data)}
      onInputChange={(_, newInputValue) => handleFilters(newInputValue)}
      isOptionEqualToValue={isOptionValueEqual}
      PopperComponent={PopperStyled}
      loadingText="Carregando"
      onOpen={handleOnOpen}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      renderOption={renderOption ?? undefined}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          label={label}
          error={errors != null}
          helperText={errors ?? helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: <>{params.InputProps.endAdornment}</>,
          }}
          sx={sxFixed}
        />
      )}
      fullWidth
    />
  );
}
