import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';

interface IFormCheckbox {
  name: string;
  label: string;
  defaultValue?: boolean;
  control: Control<any>;
  marginType?: 'no-margin' | 'left-margin';
}

export function FormCheckbox({ marginType, name, control, defaultValue, label }: IFormCheckbox) {
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
      color: '#032860',
      '& .Mui-checked': {
        color: '#032860',
        borderRadius: '20px',
      },
    };
  }, [marginType]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? false}
      render={({ field }) => (
        <FormGroup
          sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <FormControlLabel
            sx={sxFixed}
            control={
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={label}
          />
        </FormGroup>
      )}
    />
  );
}
