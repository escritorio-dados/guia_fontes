import { Home } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ButtonHome } from '#shared/styledComponents/common';

import { Header, HeaderBackground, HeaderContainer, ConteudoContainer, FaqCard } from './styles';

export function Faq() {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <HeaderBackground />

        <HeaderContainer maxWidth="lg">
          <Box>
            <Typography component="h1">FAQ</Typography>
          </Box>
        </HeaderContainer>
      </Header>

      <ConteudoContainer>
        <Container maxWidth="lg">
          <Box sx={{ width: '70%', margin: 'auto' }}>
            <ButtonHome variant="outlined" onClick={() => navigate('/')}>
              <Home />
              Voltar ao Início
            </ButtonHome>
          </Box>

          <FaqCard elevation={3}>
            <Typography component="h3">
              Quais professores do UNASP estão vinculados ao Guia de Fontes?
            </Typography>

            <Typography>
              Todos os professores da instituição estão disponíveis no Guia de Fontes. No entanto,
              na categoria de comunicação com a imprensa são apresentados os professores que possuem
              certificação de mídia training.
            </Typography>
          </FaqCard>

          <FaqCard elevation={3}>
            <Typography component="h3">
              Posso entrar em contato direto com os professores?
            </Typography>

            <Typography>
              Para atividades científicas e educativas, como palestras, treinamentos e participação
              em bancas, o contato pode ser feito diretamente com o professor. No entanto, contatos
              que buscam dialogar com a imprensa devem ser feitos através do assessor, que
              facilitará o processo de entrevistas e ações correlatas.
            </Typography>
          </FaqCard>

          <FaqCard elevation={3}>
            <Typography component="h3">Como proceder quando não houver retorno?</Typography>

            <Typography>
              Os profissionais estão orientados a responder em até 24h. Caso não seja atendido neste
              período, envie novamente e aguarde.
            </Typography>
          </FaqCard>

          <FaqCard elevation={3}>
            <Typography component="h3">
              Como posso contatar a assessoria para outros fins?
            </Typography>

            <Typography>
              Caso deseje tirar outras dúvidas, entre em contato com a assessoria pelo e-mail
              ana.silveira@adventistas.org
            </Typography>
          </FaqCard>

          <FaqCard elevation={3}>
            <Typography component="h3">Qual o período de atualização do Guia de fontes?</Typography>

            <Typography>
              Os dados cadastrados na Plataforma Lattes são atualizados por cada docente conforme o
              avanço e progresso de suas atividades formativas, profissionais e científicas.
            </Typography>
          </FaqCard>
        </Container>
      </ConteudoContainer>
    </>
  );
}
