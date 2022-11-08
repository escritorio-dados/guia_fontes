import { Container } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '#static/logo.svg';

import { LinksContainer, Logo, NavBarContainer } from './styles';

export function NavBar() {
  const navigate = useNavigate();

  const location = useLocation();

  if (location.pathname.includes('/admin')) return <></>;

  return (
    <NavBarContainer>
      <Container maxWidth="md">
        <Logo src={logo} onClick={() => navigate('/')} />

        <LinksContainer>
          <Link to="/como_utilizar">Como utilizar</Link>
          <Link to="/uso_responsavel">Uso responsável</Link>
          <Link to="/contato">Contato</Link>
          <Link to="/faq">FAQ</Link>
        </LinksContainer>
      </Container>
    </NavBarContainer>
  );
}
