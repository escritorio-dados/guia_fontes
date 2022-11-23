import { Box, Container, Radio, styled, TextField } from '@mui/material';

import background from '#static/home/home.png';

export const HomeContainer = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
  color: #fff;

  > div {
    h1 {
      font-size: 60px;
      font-family: 'Prompt';
      font-weight: 600;
      letter-spacing: 0.2px;
    }

    p {
      font-size: 20px;
      font-weight: 400;
      line-height: 15px;
    }
  }
`;

export const Header = styled(Box)`
  height: 527px;

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

  background: rgba(3, 40, 96, 0.6);
  backdrop-filter: blur(2.5px);
`;

export const BuscasContainer = styled(Box)`
  background: #032860;
  height: 280px;
  color: #fff;

  > div {
    display: flex;
    align-items: center;
    height: 100%;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      h4 {
        font-size: 20px;
        margin-bottom: 1rem;
      }
    }
  }
`;

export const StyledRadio = styled(Radio)`
  color: #fff;
  margin-right: 0.5rem;

  &.Mui-checked {
    color: #df5a35;
  }

  & .MuiSvgIcon-root {
    font-size: 29px;
  }
`;

export const StyledTextField = styled(TextField)`
  background: #fff;
  margin-top: 2rem;
  max-width: 830px;

  border-radius: 30px;

  input::placeholder {
    color: #848484;
    opacity: 1;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-radius: 30px;
    }

    fieldset {
      border-radius: 30px;
    }
  }
`;

export const SobreContainer = styled(Box)`
  padding: 8rem 0 5rem;

  > div {
    > div {
      display: flex;
      align-items: center;

      h2 {
        font-size: 35px;
        color: #df5a35;
        font-weight: 600;
        margin-left: 0.5rem;
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
