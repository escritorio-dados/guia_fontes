import { Home } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ButtonHome } from '#shared/styledComponents/common';

import comoUtilizarIcon from '#static/home/uso_responsavel_icon.svg';

import { Header, HeaderBackground, HeaderContainer, ConteudoContainer } from './styles';

export function UsoResponsavel() {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <HeaderBackground />

        <HeaderContainer maxWidth="lg">
          <Box>
            <Typography component="h1">Uso Responsável</Typography>
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

            <Typography component="h2">Uso responsável</Typography>
          </Box>

          <Typography>
            Ao acessar o Guia de Fontes, os usuários se comprometem a respeitar todos os direitos de
            propriedade intelectual e os decorrentes da proteção de marcas, patentes e/ou desenhos
            industriais, depositados ou registrados em, bem como todos os direitos referentes a
            terceiros que porventura estejam, ou estiverem de alguma forma, disponíveis no serviço.
            O simples acesso ao serviço e dados não confere aos usuários qualquer direito ao uso dos
            nomes, títulos, palavras, frases, marcas, patentes, imagens, dados e informações, dentre
            outras, que nele estejam ou estiverem disponíveis. Também, estão excluídas quaisquer
            possibilidades de uso para fins comerciais e publicitários ou qualquer outra natureza
            que fuja da proposta para que o Guia de Fontes foi criado.
          </Typography>
        </Container>
      </ConteudoContainer>
    </>
  );
}
