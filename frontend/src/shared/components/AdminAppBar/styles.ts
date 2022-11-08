import { Box, styled, AppBar, Toolbar } from '@mui/material';

export const AppBarStyled = styled(AppBar)`
  background: #032860;
  height: 4rem;
  border-bottom: 1px solid #fff;

  * {
    color: #fff;
  }
`;

export const ToolbarStyled = styled(Toolbar)`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuHeader = styled(Box)`
  color: #032860;
  padding: 0.7rem;
  border-bottom: 1px solid #032860;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const MenuOptions = styled(Box)`
  button {
    color: #032860;
    padding: 0.8rem 0.5rem;
  }
`;
