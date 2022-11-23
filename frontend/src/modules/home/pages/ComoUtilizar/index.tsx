import { Home } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ButtonHome } from '#shared/styledComponents/common';

import comoUtilizarIcon from '#static/home/como_utilizar_icon.svg';

import { Header, HeaderBackground, HeaderContainer, ConteudoContainer } from './styles';

export function ComoUtilizar() {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <HeaderBackground />

        <HeaderContainer maxWidth="lg">
          <Box>
            <Typography component="h1">Como Utilizar</Typography>
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

            <Typography component="h2">Como utilizar?</Typography>
          </Box>

          <Typography>
            Você pode navegar pelo Guia por meio do campo de busca. Os resultados são alcançados por
            meio da inserção no espaço de busca de palavras-chave sobre o nome, titulação ou área do
            conhecimento do profissional que se busca contatar. Estão catalogados na ferramenta
            professores de todos os campi do Unasp e do ensino à distância.
          </Typography>

          <Typography>
            Ainda, é preciso assinalar obrigatoriamente a finalidade do contato. Há duas opções: (1)
            estou buscando um pesquisador para falar com a imprensa ou (2) estou buscando um
            pesquisador para outras atividades. A primeira oportuniza entrevistas para notícias,
            reportagens, podcasts e outros formatos e gêneros do jornalismo, contemplando as
            demandas da assessoria de imprensa; enquanto o segundo viabiliza o contato com os
            docentes da instituição para atividades de cunho científico e educativo, tais como
            pesquisas, treinamentos, palestras, consultorias e atividades correlatas.
          </Typography>
        </Container>
      </ConteudoContainer>
    </>
  );
}
