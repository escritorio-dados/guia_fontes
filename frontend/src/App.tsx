import { createTheme, ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { SiteLayout } from '#shared/components/SiteLayout';
import { AppProvider } from '#shared/hooks';
import { ScrollToTop } from '#shared/routes/scrollToTop';
import { cssGlobal } from '#shared/styles/global.styles';

const theme = createTheme({
  typography: {
    fontFamily: `"Poppins", "Helvetica", "Arial", sans-serif`,
    fontSize: 12,
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <GlobalStyles styles={cssGlobal} />

      <AppProvider>
        <BrowserRouter>
          <ScrollToTop />

          <SiteLayout />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}
