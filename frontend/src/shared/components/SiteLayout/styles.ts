import { styled, Box } from '@mui/material';

export const SiteContainer = styled(Box)`
  min-height: 100vh;
  width: 100vw;
  overflow-x: auto;
  overflow-y: hidden;

  display: flex;

  div.content {
    flex: 1;
  }
`;

export const MainContent = styled(Box)`
  height: calc(100vh - 4rem);
  overflow: auto;
  margin-top: 4rem;
  background-color: #eee;

  > main {
    padding: 2rem 1rem;
  }
`;
