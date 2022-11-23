import { Box, Container, styled, TextField } from '@mui/material';

import background from '#static/search/imprensa.png';

export const HomeContainer = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  > div {
    display: flex;
    align-items: center;
    flex-direction: column;

    h1 {
      font-size: 60px;
      font-family: 'Prompt';
      font-weight: 600;
      letter-spacing: 0.2px;
    }

    p {
      font-size: 20px;
      font-weight: 400;
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

export const StyledTextField = styled(TextField)`
  background: #fff;
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

export const PesquisaContainer = styled(Box)`
  padding: 3rem 0 5rem;

  h2 {
    font-size: 35px;
    color: #df5a35;
    font-weight: 600;
    margin-left: 0.5rem;
  }
`;
