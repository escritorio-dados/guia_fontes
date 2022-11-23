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
      contatoAssesoria: docenteData.contatoAssesoria ?? '-',
      lattesId: docenteData.lattesId ?? '-',
      resumoLattes: docenteData.resumoLattes ?? '-',
      imprensa: docenteData.imprensa ? 'Sim' : 'Não',
      unidade: docenteData.vinculos.map(({ unidadeUnasp }) => unidadeUnasp.nome).join('; '),
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

            <LabelValue label="Contato Assesoria:" value={docenteInfo.contatoAssesoria} />

            <LabelValue label="Lattes ID:" value={docenteInfo.lattesId} />

            <LabelValue label="Resumo:" value={docenteInfo.resumoLattes} />

            <LabelValue label="Pode falar com imprensa:" value={docenteInfo.imprensa} />

            <LabelValue label="Unidades do Unasp:" value={docenteInfo.unidade} />
          </Box>

          <SubTitleBar title="Areas de Atuacação" />

          <Grid container spacing={2}>
            {docenteInfo.areasAtuacao.map((area) => (
              <Grid key={area.id} item xs={12} sm={6} md={4}>
                <Paper elevation={2} sx={{ padding: '0.5rem' }}>
                  <LabelValue label="Grande Area:" value={area.grandeArea} />

                  <LabelValue label="Area de Conhecimento:" value={area.areaConhecimento} />

                  <LabelValue label="Sub Area:" value={area.subArea ?? ''} />

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