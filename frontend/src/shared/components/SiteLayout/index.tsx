import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { useNavBar } from '#shared/hooks/navBar';
import { Router } from '#shared/routes';

import { AdminAppBar } from '../AdminAppBar';
import { AdminNavigation } from '../AdminNavigation';
import { Footer } from '../Footer';
import { NavBar } from '../NavBar';
import { MainContent, SiteContainer } from './styles';

export function SiteLayout() {
  const { openNavBar } = useNavBar();
  const location = useLocation();

  if (location.pathname.includes('/admin'))
    return (
      <SiteContainer>
        <AdminNavigation />

        <Box
          className="content"
          sx={(theme) => ({
            transition: openNavBar
              ? theme.transitions.create(['margin', 'max-width'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                })
              : theme.transitions.create(['margin', 'max-width'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
            marginLeft: openNavBar ? '240px' : '0px',
            maxWidth: openNavBar ? 'calc(100vw - 240px)' : '100vw',
          })}
        >
          <AdminAppBar />

          <MainContent>
            <main>
              <Router />
            </main>
          </MainContent>
        </Box>
      </SiteContainer>
    );

  return (
    <>
      <NavBar />

      <Router />

      <Footer />
    </>
  );
}
