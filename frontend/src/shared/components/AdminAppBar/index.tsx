import { Menu as IconMenu, Person } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '#shared/hooks/auth';
import { useNavBar } from '#shared/hooks/navBar';
import { useTitle } from '#shared/hooks/title';
import { TextEllipsis } from '#shared/styledComponents/common';

import { CustomIconButton } from '../CustomIconButton';
import { CustomPopover } from '../CustomPopover';
import { CustomTooltip } from '../CustomTooltip';
import { AppBarStyled, ToolbarStyled, MenuHeader, MenuOptions } from './styles';

export function AdminAppBar() {
  const navigate = useNavigate();
  const { logged, signOut, user } = useAuth();
  const { openNavBar, togleNavBar } = useNavBar();
  const { title } = useTitle();

  const handleSignOut = useCallback(async () => {
    await signOut();

    navigate('/auth');
  }, [navigate, signOut]);

  return (
    <AppBarStyled position="absolute">
      <ToolbarStyled
        sx={(theme) => ({
          transition: openNavBar
            ? theme.transitions.create(['margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              })
            : theme.transitions.create(['margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          marginLeft: openNavBar ? '240px' : '0px',
        })}
      >
        {logged && (
          <CustomIconButton
            action={togleNavBar}
            title={openNavBar ? 'Ocultar Menu' : 'Mostrar Menu'}
            iconType="custom"
            CustomIcon={<IconMenu />}
          />
        )}

        <Box maxWidth="70%">
          <CustomTooltip title={title}>
            <TextEllipsis fontSize="1.3rem">{title}</TextEllipsis>
          </CustomTooltip>
        </Box>

        {logged && (
          <CustomPopover help="Usuario" icon={<Person />}>
            <CustomTooltip title={user.nome}>
              <MenuHeader>{user.nome}</MenuHeader>
            </CustomTooltip>

            <MenuOptions>
              <Button
                fullWidth
                variant="text"
                onClick={() => navigate('/admin/users/changePassword')}
              >
                Alterar Senha
              </Button>

              <Button fullWidth variant="text" onClick={handleSignOut}>
                Sair
              </Button>
            </MenuOptions>
          </CustomPopover>
        )}
      </ToolbarStyled>
    </AppBarStyled>
  );
}
