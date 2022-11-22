import { ButtonProps, Button } from '@mui/material';
import { useMemo } from 'react';

type ICButtonProps = ButtonProps & {
  marginType?: 'no-margin' | 'left-margin';
  customColor?: string;
  component?: string;
};

export function CustomButton({
  customColor,
  marginType,
  sx,
  variant,
  children,
  ...props
}: ICButtonProps) {
  const sxFixed = useMemo(() => {
    let marginTop: string | undefined = '1rem';
    let marginLeft: string | undefined;

    if (marginType != null) {
      marginTop = undefined;
    }

    if (marginType === 'left-margin') {
      marginLeft = '1rem';
    }

    return {
      marginTop,
      marginLeft,
      backgroundColor: customColor ?? '#032860',
      ...sx,

      transition: '0.2s filter',

      '&:hover': {
        filter: 'brightness(0.9)',
        backgroundColor: customColor ?? '#032860',
      },
    };
  }, [customColor, marginType, sx]);

  return (
    <Button fullWidth variant={variant ?? 'contained'} size="medium" sx={sxFixed} {...props}>
      {children}
    </Button>
  );
}
