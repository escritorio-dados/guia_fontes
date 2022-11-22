import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { SubTitleBar } from '#shared/components/info/SubTitleBar';
import { useGet } from '#shared/services/useAxios';

import { IDocente } from '../../types/IDocente';

export function InfoDocentes() {
  const params = useParams();

  const { data: docenteData, error: docenteError } = useGet<IDocente>({
    url: `/docentes/${params.id}`,
  });

  return (
    <>
      <SubTitleBar title="Informações do Docente" sx={{ mt: 0 }} />

      <Typography>Banana: {params.id}</Typography>
    </>
  );
}
