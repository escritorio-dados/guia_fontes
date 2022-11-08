import { styled, Paper } from '@mui/material';

export const FormStyled = styled('form')`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const AuthContainer = styled(Paper)`
  width: 600px;
  margin: auto;
  padding: 1rem 2rem 2rem;

  h2 {
    font-size: 28px;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
    color: #032860;
  }
`;
