import { createTheme, ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from '#shared/components/Footer';
import { NavBar } from '#shared/components/NavBar';
import { Router } from '#shared/routes';
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

      <BrowserRouter>
        <ScrollToTop />

        <NavBar />

        <Router />

        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
