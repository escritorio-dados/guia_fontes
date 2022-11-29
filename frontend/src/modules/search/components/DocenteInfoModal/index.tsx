import { Box, Grid, Paper } from '@mui/material';
import { useEffect, useMemo } from 'react';

import { CustomDialog } from '#shared/components/CustomDialog';
import { LabelValue } from '#shared/components/info/LabelValue';
import { SubTitleBar } from '#shared/components/info/SubTitleBar';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { IBaseModal } from '#shared/types/IModal';

import { IDocentePublic } from '../../types/IDocente';

type IInfoDocenteModal = IBaseModal & { docente_id: string };

export function DocenteInfoModal({ closeModal, docente_id, openModal }: IInfoDocenteModal) {
  const { toast } = useToast();

  const { data: docenteData, error: docenteError } = useGet<IDocentePublic>({
    url: `/public/docentes/${docente_id}`,
  });

  useEffect(() => {
    if (docenteError != null) {
      toast({ message: docenteError, severity: 'error' });

      closeModal();
    }
  }, [docenteError, toast, closeModal]);

  const docenteInfo = useMemo(() => {
    if (docenteData == null) {
      return null;
    }

    return {
      ...docenteData,
      contatoAssesoria: docenteData.contatoAssesoria ?? '71 9667-1238',
      emailAssesoria: docenteData.emailAssesoria ?? 'ana.silveira@adventistas.org',
      lattesId: docenteData.lattesId ?? '-',
      resumoLattes: docenteData.resumoLattes?.replaceAll('&#10;', ' ') ?? '-',
      unidade: docenteData.vinculos.map(({ unidadeUnasp }) => unidadeUnasp.nome).join('; '),
      areasAtuacao: docenteData.areasAtuacao.map((area) => ({
        ...area,
        grandeArea: area.grandeArea.toUpperCase(),
      })),
    };
  }, [docenteData]);

  return (
    <>
      {docenteInfo != null && (
        <CustomDialog
          open={openModal}
          closeModal={closeModal}
          title="Informações do Docente"
          maxWidth="lg"
        >
          <Box sx={{ padding: '0.5em' }}>
            <LabelValue label="Nome:" value={docenteInfo.nome} />

            <LabelValue label="Lattes ID:" value={docenteInfo.lattesId} />

            <LabelValue label="Resumo:" value={docenteInfo.resumoLattes} />

            <LabelValue label="Unidades do UNASP:" value={docenteInfo.unidade} />

            <LabelValue label="Contato assessoria:" value={docenteInfo.contatoAssesoria} />

            <LabelValue label="E-mail assessoria:" value={docenteInfo.emailAssesoria} />
          </Box>

          <SubTitleBar title="Áreas de atuacação" />

          <Grid container spacing={2}>
            {docenteInfo.areasAtuacao.map((area) => (
              <Grid key={area.id} item xs={12} sm={6} md={4}>
                <Paper elevation={2} sx={{ padding: '0.5rem' }}>
                  <LabelValue label="Grande área:" value={area.grandeArea} />

                  <LabelValue label="Área de conhecimento:" value={area.areaConhecimento} />

                  <LabelValue label="Sub área:" value={area.subArea ?? ''} />

                  <LabelValue label="Especialidade:" value={area.especialidade ?? ''} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CustomDialog>
      )}
    </>
  );
}
