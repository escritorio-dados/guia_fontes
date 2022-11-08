import { OutlinedTextFieldProps, TextField } from '@mui/material';
import { useMemo } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type IFormTextField = Omit<OutlinedTextFieldProps, 'variant'> & {
  name: string;
  control: Control<any>;
  errors?: FieldError | undefined;
  marginType?: 'no-margin' | 'left-margin';
};

export function FormTextField({
  errors,
  marginType,
  sx,
  name,
  control,
  defaultValue,
  helperText,
  ...props
}: IFormTextField) {
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
      ...sx,
    };
  }, [marginType, sx]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ''}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          variant="outlined"
          error={errors != null}
          sx={sxFixed}
          helperText={errors != null ? errors.message : helperText}
          {...props}
        />
      )}
    />
  );
}
