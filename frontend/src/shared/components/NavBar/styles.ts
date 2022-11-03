import { Box, styled } from '@mui/material';

export const NavBarContainer = styled(Box)`
  width: 100%;
  background: #032860;
  padding: 1.5rem;

  > div {
    display: flex;
    align-items: center;
  }
`;

export const LinksContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: 3rem;

  a {
    color: #fff;
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 12px;
    text-decoration: none;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }

    & + a {
      margin-left: 1.8rem;
    }
  }
`;

export const Logo = styled('img')`
  cursor: pointer;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
