import { Clear, QueryBuilder, Today } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import { CalendarPickerView, DatePicker } from '@mui/x-date-pickers';
import { useMemo } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomIconButton } from '#shared/components/CustomIconButton';

interface IFormDatePicker {
  name: string;
  label: string;
  control: Control<any>;
  defaultValue?: Date | null;
  errors?: FieldError;
  disabled?: boolean;
  margin_type?: 'no-margin' | 'left-margin';
  required?: boolean;
  customView?: CalendarPickerView[];
}

export function FormDatePicker({
  control,
  label,
  name,
  defaultValue,
  errors,
  disabled,
  margin_type,
  required,
  customView,
}: IFormDatePicker) {
  const sxFixed = useMemo(() => {
    let marginTop: string | undefined = '1em';
    let marginLeft: string | undefined;

    if (margin_type != null) {
      marginTop = undefined;
    }

    if (margin_type === 'left-margin') {
      marginLeft = '1em';
    }

    return {
      marginTop,
      marginLeft,
      width: '100%',
    };
  }, [margin_type]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? null}
        render={({ field }) => (
          <>
            <DatePicker
              onChange={(newValue) => field.onChange(newValue)}
              value={field.value}
              disabled={disabled}
              views={customView ?? ['year', 'month', 'day']}
              showToolbar
              showDaysOutsideCurrentMonth
              components={{
                ActionBar: ({ onSetToday, onClear }) => (
                  <Box
                    display="flex"
                    sx={(theme) => ({ borderTop: `1px solid ${theme.palette.divider}` })}
                  >
                    <CustomButton
                      variant="text"
                      size="medium"
                      onClick={onSetToday}
                      marginType="no-margin"
                    >
                      Hoje
                    </CustomButton>

                    <CustomButton
                      variant="text"
                      size="medium"
                      onClick={onClear}
                      marginType="no-margin"
                    >
                      Limpar
                    </CustomButton>
                  </Box>
                ),
                OpenPickerIcon: () => <Today fontSize="medium" />,
              }}
              OpenPickerButtonProps={{
                size: 'small',
                sx: { marginRight: '-0.5rem', marginLeft: '-0.4rem' },
              }}
              renderInput={(textFieldProps) => (
                <TextField
                  {...textFieldProps}
                  required={required}
                  label={label}
                  name={name}
                  error={errors != null}
                  helperText={errors != null ? errors.message : ''}
                  InputProps={{
                    ...textFieldProps.InputProps,
                    endAdornment: (
                      <>
                        {field.value != null && (
                          <CustomIconButton
                            action={() => field.onChange(null)}
                            iconType="custom"
                            title="Limpar"
                            size="small"
                            sx={{ zIndex: 10, padding: '2px' }}
                            CustomIcon={<Clear fontSize="small" />}
                          />
                        )}

                        <CustomIconButton
                          action={() => field.onChange(new Date())}
                          iconType="custom"
                          title="Agora"
                          size="medium"
                          sx={{ zIndex: 10, padding: '2px' }}
                          CustomIcon={<QueryBuilder fontSize="small" />}
                        />

                        {textFieldProps.InputProps?.endAdornment}
                      </>
                    ),
                  }}
                  sx={sxFixed}
                />
              )}
            />
          </>
        )}
      />
    </>
  );
}
