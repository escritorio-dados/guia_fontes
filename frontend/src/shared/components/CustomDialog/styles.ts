import { Box, styled } from '@mui/material';

export const Title = styled(Box)`
  cursor: move;

  display: flex;
  align-items: center;
  padding: 0.25rem;
  background: #032860;
  color: #fff;

  svg {
    color: #fff;
  }

  border-bottom: 0px;
  border-radius: 5px 5px 0 0;

  h3 {
    flex: 1;
    font-size: 1.25rem;
    margin: 0 0.25rem;
  }
`;

export const Content = styled(Box)`
  overflow: auto;
  padding: 1.5rem;
  background: #eee;

  border-top: 0px;

  border-radius: 0 0 5px 5px;
`;
