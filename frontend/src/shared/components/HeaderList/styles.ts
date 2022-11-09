import { Box, styled } from '@mui/material';
import { Badge, Collapse } from '@mui/material';

export const HeaderContainer = styled(Box)`
  border-bottom: 1px solid #fff;
`;

export const HeaderActions = styled(Box)`
  background: #032860;
  color: #fff;
  border-radius: 5px 5px 0 0;

  min-height: 4rem;
  padding: 0.5rem 1rem;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    color: #fff;
  }
`;

export const HeaderFilter = styled(Collapse)`
  > div {
    padding: 1rem;
  }
`;

export const FooterContainer = styled(Box)`
  background: #032860;
  min-height: 4rem;
  padding: 1rem;
  color: #fff;

  border-radius: 0 0 5px 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    color: #fff;
    border-color: #fff;
  }
`;

export const ActiveFiltersNumber = styled(Badge)`
  & .MuiBadge-badge {
    right: 6px;
    top: 10px;
    padding: 0 4px;
  }
`;
