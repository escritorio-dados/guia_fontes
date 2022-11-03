import { Box, Container, Paper, styled } from '@mui/material';

import background from '#static/home/faq.png';

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
    #032860 18.1%,
    rgba(3, 40, 96, 0.96) 28.17%,
    rgba(3, 40, 96, 0.92) 37.78%,
    rgba(3, 40, 96, 0.775723) 52.88%,
    rgba(3, 40, 96, 0) 107.17%
  );
`;

export const ConteudoContainer = styled(Box)`
  padding: 8rem 0 5rem;
  margin-bottom: 3rem;
`;

export const FaqCard = styled(Paper)`
  border-radius: 5px;
  background: #032860;
  padding: 1.5rem;
  width: 70%;
  margin: auto;

  & + div {
    margin-top: 2rem;
  }

  > h3 {
    font-size: 20px;
    color: #df5a35;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  > p {
    font-size: 15px;
    font-weight: 400;
    color: #fff;
  }
`;
