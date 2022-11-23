import { Box, Paper, styled } from '@mui/material';

export const DocenteContainer = styled(Paper)`
  padding: 1rem 2rem;
  width: 100%;

  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.03);
  }
`;

export const LabelValue = styled(Box)`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 0.5rem;
  }

  > strong {
    font-weight: 600;
    color: #df5a35;
    margin-right: 0.5rem;
  }
`;

export const LabelValueBlock = styled(Box)`
  & + div {
    margin-top: 0.5rem;
  }

  > strong {
    font-weight: 600;
    color: #df5a35;
    margin-right: 0.5rem;
  }
`;
