import { Box, BoxProps, Typography } from '@mui/material';

import { SubTitleBarContainer } from './styles';

type ISubTitleBar = BoxProps & { title: string; actions?: JSX.Element };

export function SubTitleBar({ title, actions, ...props }: ISubTitleBar) {
  return (
    <SubTitleBarContainer {...props}>
      <Typography component="h3">{title}</Typography>

      <Box>{actions}</Box>
    </SubTitleBarContainer>
  );
}
