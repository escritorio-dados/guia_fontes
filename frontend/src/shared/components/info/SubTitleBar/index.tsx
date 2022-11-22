import { BoxProps, Typography } from '@mui/material';

import { SubTitleBarContainer } from './styles';

type ISubTitleBar = BoxProps & { title: string };

export function SubTitleBar({ title, ...props }: ISubTitleBar) {
  return (
    <SubTitleBarContainer {...props}>
      <Typography component="h3">{title}</Typography>
    </SubTitleBarContainer>
  );
}
