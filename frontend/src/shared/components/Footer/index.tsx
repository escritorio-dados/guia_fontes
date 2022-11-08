import { Container } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '#static/logo.svg';

import { LinksContainer, Logo, FooterContainer, LogoContainer } from './styles';

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.includes('/admin')) return <></>;

  return (
    <FooterContainer>
      <Container maxWidth="md">
        <LogoContainer>
          <Logo src={logo} onClick={() => navigate('/')} />
        </LogoContainer>

        <LinksContainer>
          <Link to="/como_utilizar">Como utilizar</Link>
          <Link to="/uso_responsavel">Uso responsável</Link>
          <Link to="/contato">Contato</Link>
          <Link to="/faq">FAQ</Link>
        </LinksContainer>
      </Container>
    </FooterContainer>
  );
}
