import { styled, Box } from '@mui/material';

export const SiteContainer = styled(Box)`
  margin-top: 64px;
  min-height: 100vh;
  width: 100vw;
  overflow-x: auto;
  overflow-y: hidden;

  display: flex;

  div.content {
    flex: 1;
  }

  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const MainContent = styled(Box)`
  height: calc(100vh - 4rem);
  overflow: auto;

  > main {
    padding: 2rem 1rem;
  }
`;
