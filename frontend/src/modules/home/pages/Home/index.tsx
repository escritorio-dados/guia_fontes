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
import { useCallback, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleSearch = useCallback(
    (key: string) => {
      if (key === 'Enter') {
        if (grupo === 'imprensa') {
          navigate({
            pathname: '/docentes/imprensa',
            search: `?${createSearchParams({ q: pesquisa })}`,
          });
        } else {
          navigate({
            pathname: '/docentes/pesquisa',
            search: `?${createSearchParams({ q: pesquisa })}`,
          });
        }
      }
    },
    [grupo, navigate, pesquisa],
  );

  return (
    <>
      <Header>
        <HeaderBackground />

        <HomeContainer maxWidth="lg">
          <Box>
            <Typography component="h1">Guia de Fontes</Typography>
            <Typography>Encontre o profissional certo para o seu projeto.</Typography>
          </Box>
        </HomeContainer>
      </Header>

      <BuscasContainer>
        <Container maxWidth="lg">
          <Box>
            <Typography component="h4">Procuro um profissional para:</Typography>

            <FormControl>
              <RadioGroup row value={grupo} onChange={(e) => setGrupo(e.target.value)}>
                <FormControlLabel
                  value="imprensa"
                  control={<StyledRadio />}
                  label="falar com a imprensa"
                />

                <FormControlLabel
                  value="pesquisa"
                  control={<StyledRadio sx={{ ml: '1rem' }} />}
                  label="palestras, treinamentos e pesquisas"
                />
              </RadioGroup>
            </FormControl>

            <StyledTextField
              placeholder="Buscar por: nome do professor, campus onde ele trabalha ou ??rea de conhecimento"
              variant="outlined"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              onKeyDown={(event) => handleSearch(event.key)}
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
            O Guia de Fontes do Centro Universit??rio Adventista de S??o Paulo busca estabelecer uma
            ponte entre os pesquisadores do UNASP, a imprensa e a sociedade. Dessa maneira queremos
            promover a produ????o de conte??do de qualidade, a divulga????o cient??fica e a transpar??ncia
            acad??mica.
          </Typography>

          <Typography>
            Os dados deste Guia de Fontes s??o extra??dos diretamente da Plataforma de Curr??culo
            Lattes, para o portal do UNASP. O Guia pode ser utilizado por jornalistas, assessores de
            comunica????o e outros profissionais comprometidos com a difus??o e interc??mbio de dados e
            informa????es sobre o desenvolvimento da ci??ncia, tecnologia e inova????o.
          </Typography>
        </Container>
      </SobreContainer>
    </>
  );
}
