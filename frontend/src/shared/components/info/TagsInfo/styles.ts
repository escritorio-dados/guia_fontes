import { Box, styled } from '@mui/material';

export const FieldContainer = styled(Box)`
  strong {
    font-weight: bold;
    color: #df5a35;
  }

  & + div {
    margin-top: 1rem;
  }
`;

export const TagsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;

  margin-left: 1.5rem;

  > span {
    display: block;
    border-radius: 5px;
    background: #032860;
    color: #fff;
    padding: 0.3rem;

    margin-top: 0.5rem;
    margin-left: 0.5rem;
  }
`;
