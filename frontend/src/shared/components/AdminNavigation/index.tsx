import { Drawer, List, Typography } from '@mui/material';

import { useAuth } from '#shared/hooks/auth';
import { useNavBar } from '#shared/hooks/navBar';

import { navigationsItems } from './data';
import { ListItemNav } from './ListItemNav';
import { ListItemNavGroup } from './ListItemNavGroup';
import { NavContainer } from './styles';

export function AdminNavigation() {
  const { logged } = useAuth();
  const { openNavBar } = useNavBar();

  return (
    <>
      {logged && (
        <Drawer
          variant="persistent"
          anchor="left"
          open={openNavBar}
          sx={{ flexShrink: 0, overflow: 'hidden' }}
        >
          <NavContainer>
            <header>
              <Typography component="h1">Guia de Fontes</Typography>
            </header>

            <List component="nav">
              {navigationsItems.map((navItem) => {
                if (navItem.group && navItem.items != null) {
                  return (
                    <ListItemNavGroup key={navItem.title} text={navItem.title ?? ''}>
                      {navItem.items.map((item) => (
                        <ListItemNav key={item.title} nested to={item.link} text={item.title} />
                      ))}
                    </ListItemNavGroup>
                  );
                }

                if (navItem.item != null) {
                  return (
                    <ListItemNav
                      key={navItem.item.title}
                      to={navItem.item.link}
                      text={navItem.item.title}
                    />
                  );
                }

                return <></>;
              })}
            </List>
          </NavContainer>
        </Drawer>
      )}
    </>
  );
}
