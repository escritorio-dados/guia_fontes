import { styled, Typography } from '@mui/material';

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
