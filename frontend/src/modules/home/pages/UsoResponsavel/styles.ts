import { Box, Container, styled } from '@mui/material';

import background from '#static/home/uso_responsavel.png';

export const HeaderContainer = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  > div {
    h1 {
      font-size: 60px;
      font-family: 'Prompt';
      font-weight: 600;
      letter-spacing: 0.2px;
    }
  }
`;

export const Header = styled(Box)`
  height: 471px;

  background: url(${background}) no-repeat;
  background-size: cover;

  position: relative;

  z-index: -1;
`;

export const HeaderBackground = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  background: linear-gradient(
    180deg,
    #032860 14.45%,
    rgba(3, 40, 96, 0.749283) 58.34%,
    rgba(3, 40, 96, 0) 131.34%
  );
`;

export const ConteudoContainer = styled(Box)`
  padding: 8rem 0 5rem;
  margin-bottom: 3rem;

  > div {
    > div {
      display: flex;
      align-items: center;

      h2 {
        font-size: 35px;
        color: #df5a35;
        font-weight: 600;
        margin-left: 1rem;
      }

      margin-bottom: 5rem;
    }

    p {
      margin-top: 2rem;
      font-size: 20px;
      font-weight: 400;
      color: #032860;
      letter-spacing: 0.2px;
    }
  }
`;
