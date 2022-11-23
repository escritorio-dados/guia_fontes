import { Search } from '@mui/icons-material';
import { Box, Container, Grid, InputAdornment, Pagination, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';

import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { IPagingResult } from '#shared/types/IPagingResult';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { DocenteCard } from '#modules/search/components/DocenteCard';
import { IDocentePublic } from '#modules/search/types/IDocente';

import {
  Header,
  HeaderBackground,
  HomeContainer,
  PesquisaContainer,
  StyledTextField,
} from './styles';

export function SearchDocentesImprensa() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [pesquisa, setPesquisa] = useState(() => {
    const query = searchParams.get('q');

    return query ?? '';
  });

  const [novaPesquisa, setNovaPesquisa] = useState(() => {
    const query = searchParams.get('q');

    return query ?? '';
  });

  const { toast } = useToast();

  const {
    data: docentesData,
    error: docentesError,
    send: getDocentes,
  } = useGet<IPagingResult<IDocentePublic>>({
    url: '/public/docentes',
    lazy: true,
  });

  useEffect(() => {
    void getDocentes({ params: { imprensa: true, ...removeEmptyFields({ query: pesquisa }) } });
  }, [getDocentes, pesquisa]);

  useEffect(() => {
    if (docentesError != null) {
      toast({ message: docentesError, severity: 'error' });
    }
  }, [docentesError, toast]);

  const handleSearch = useCallback(
    (key: string) => {
      if (key === 'Enter') {
        setPesquisa(novaPesquisa);

        setSearchParams(createSearchParams({ q: novaPesquisa }));
      }
    },
    [novaPesquisa, setSearchParams],
  );

  return (
    <>
      <Header>
        <HeaderBackground />

        <HomeContainer maxWidth="lg">
          <Box>
            <Typography component="h1">Você buscou por:</Typography>
            <Typography>Um profissional para falar com a imprensa</Typography>
          </Box>
        </HomeContainer>
      </Header>

      <PesquisaContainer>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: '2rem' }}>
            <StyledTextField
              label="Pesquisa"
              placeholder="Buscar por: Nome do professor, campus onde ele trabalha ou área de conhecimento"
              variant="outlined"
              value={novaPesquisa}
              onChange={(e) => setNovaPesquisa(e.target.value)}
              onKeyDown={(event) => handleSearch(event.key)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#032860' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: '2rem' }}>
            <Typography component="h2">Resultados</Typography>
          </Box>

          <Grid container spacing={2}>
            {docentesData?.data.map((docente) => (
              <Grid item xs={12} sm={6} md={4} key={docente.id}>
                <DocenteCard docente={docente} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '2rem' }}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={docentesData?.pagination.totalPages ?? 1}
              page={docentesData?.pagination.page ?? 1}
              onChange={async (_, newPage) =>
                await getDocentes({
                  params: {
                    page: newPage,
                    imprensa: true,
                    ...removeEmptyFields({ query: pesquisa }),
                  },
                })
              }
            />

            <Typography sx={{ ml: '1rem' }}>
              {docentesData?.pagination.totalResults ?? 0} Resultados
            </Typography>
          </Box>
        </Container>
      </PesquisaContainer>
    </>
  );
}
