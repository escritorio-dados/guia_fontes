import { BoxProps, Typography } from '@mui/material';

import { FieldValueContainer } from './styles';

type ILabelValue = BoxProps & { label: string; value: string | JSX.Element };

export function LabelValue({ label, value, fontSize, display, ...props }: ILabelValue) {
  return (
    <FieldValueContainer display={display} {...props}>
      <Typography component="strong" fontSize={fontSize}>
        {label}
      </Typography>

      {typeof value === 'string' ? (
        <Typography component="span" whiteSpace="pre-wrap" fontSize={fontSize}>
          {value}
        </Typography>
      ) : (
        <>{value}</>
      )}
    </FieldValueContainer>
  );
}
