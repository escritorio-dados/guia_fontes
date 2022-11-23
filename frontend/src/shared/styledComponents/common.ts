import { Button, styled, Typography } from '@mui/material';

export const TextEllipsis = styled(Typography)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const TextConfirm = styled(Typography)`
  color: #df5a35;
  margin-top: 1rem;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const ButtonHome = styled(Button)`
  border: 1px solid #032860;
  border-radius: 25px;
  margin-bottom: 2.5rem;
  color: #032860;
  transition: background 0.3s;

  svg {
    color: #032860;
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: #03286020;
    border-color: #032860;
  }
`;
