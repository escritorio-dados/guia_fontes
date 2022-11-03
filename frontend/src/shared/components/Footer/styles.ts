import { Box, styled } from '@mui/material';

export const FooterContainer = styled(Box)`
  width: 100%;
  background: #032860;
  padding: 3rem 0;
  margin-top: auto;

  > div {
    display: flex;
    align-items: center;
  }
`;

export const LinksContainer = styled(Box)`
  display: flex;
  align-items: center;

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

export const LogoContainer = styled(Box)`
  padding: 1.5rem;
  margin-right: 1.5rem;
  border-right: 2px solid #fff;
`;

export const Logo = styled('img')`
  cursor: pointer;
  height: 49px;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
