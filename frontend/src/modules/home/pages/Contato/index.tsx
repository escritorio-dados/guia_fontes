import { Home } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ButtonHome } from '#shared/styledComponents/common';

import comoUtilizarIcon from '#static/home/contato_icon.svg';

import {
  Header,
  HeaderBackground,
  HeaderContainer,
  ConteudoContainer,
  TextoDestaque,
} from './styles';

export function Contato() {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <HeaderBackground />

        <HeaderContainer maxWidth="lg">
          <Box>
            <Typography component="h1">Contato</Typography>
          </Box>
        </HeaderContainer>
      </Header>

      <ConteudoContainer>
        <Container maxWidth="lg">
          <ButtonHome variant="outlined" onClick={() => navigate('/')}>
            <Home />
            Voltar ao Início
          </ButtonHome>

          <Box>
            <img src={comoUtilizarIcon} />

            <Typography component="h2">Contato</Typography>
          </Box>

          <Typography>
            Teve dificuldades para encontrar um profissional ou deseja outro serviço que não foi
            contemplado nas opções do Guia de Fontes? Entre em contato conosco. Envie sua mensagem
            para <TextoDestaque>ana.silveira@adventistas.org</TextoDestaque> e esclareça suas
            dúvidas.
          </Typography>
        </Container>
      </ConteudoContainer>
    </>
  );
}
