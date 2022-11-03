import { Search } from '@mui/icons-material';
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  InputAdornment,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import sobreLogo from '#static/home/sobre.svg';

import {
  BuscasContainer,
  Header,
  HeaderBackground,
  HomeContainer,
  SobreContainer,
  StyledRadio,
  StyledTextField,
} from './styles';

export function Home() {
  const [pesquisa, setPesquisa] = useState('');
  const [grupo, setGrupo] = useState('imprensa');

  return (
    <>
      <Header>
        <HeaderBackground />

        <HomeContainer maxWidth="lg">
          <Box>
            <Typography component="h1">Guia de Fontes</Typography>
            <Typography>Seu contato direto com o nosso conteúdo</Typography>
          </Box>
        </HomeContainer>
      </Header>

      <BuscasContainer>
        <Container maxWidth="lg">
          <Box>
            <FormControl>
              <RadioGroup row value={grupo} onChange={(e) => setGrupo(e.target.value)}>
                <FormControlLabel
                  value="imprensa"
                  control={<StyledRadio />}
                  label="Procuro profissional para: Entrevista para imprensa"
                />

                <FormControlLabel
                  value="pesquisa"
                  control={<StyledRadio sx={{ ml: '1rem' }} />}
                  label="Procuro profissional para: Atividades como palestras, treinamentos e pesquisas"
                />
              </RadioGroup>
            </FormControl>

            <StyledTextField
              placeholder="Buscar por: Nome do professor, campus onde ele trabalha, área de conhecimento"
              variant="outlined"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#848484' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Container>
      </BuscasContainer>

      <SobreContainer>
        <Container maxWidth="lg">
          <Box>
            <img src={sobreLogo} />

            <Typography component="h2">Sobre</Typography>
          </Box>

          <Typography>
            O Guia de Fontes do Centro Universitário Adventista de São Paulo busca estabelecer uma
            ponte entre os pesquisadores do Unasp e a imprensa e a sociedade. Dessa maneira queremos
            promover a produção de conteúdo de qualidade, a divulgação científica e a transparência
            acadêmica.
          </Typography>

          <Typography>
            Os dados deste Guia de Fontes são extraídos diretamente da plataforma de Currículo
            Lattes com aprovação do Conselho Nacional de Desenvolvimento Científico e Tecnológico, o
            CNPq, para o portal do UNASP. O Guia pode ser utilizado por jornalistas, assessores de
            comunicação e outros profissionais comprometidos com a difusão e intercâmbio de dados e
            informações sobre o desenvolvimento da ciência, tecnologia e inovação.
          </Typography>
        </Container>
      </SobreContainer>
    </>
  );
}
