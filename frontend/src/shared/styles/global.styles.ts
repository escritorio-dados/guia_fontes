import { css } from '@mui/material';

export const cssGlobal = css(css`
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* width */
  *::-webkit-scrollbar {
    width: 0.7rem;
    height: 0.7rem;
  }

  /* Track */
  *::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  /* Handle */
  *::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  /* Handle on hover */
  *::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
`);
