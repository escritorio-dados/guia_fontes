import { Box, Container, Typography } from '@mui/material';

import comoUtilizarIcon from '#static/home/contato_icon.svg';

import {
  Header,
  HeaderBackground,
  HeaderContainer,
  ConteudoContainer,
  TextoDestaque,
} from './styles';

export function Contato() {
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
