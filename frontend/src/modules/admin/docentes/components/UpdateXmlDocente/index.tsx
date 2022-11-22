import { Box, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { useToast } from '#shared/hooks/toast';
import { usePatch } from '#shared/services/useAxios';
import { TextConfirm } from '#shared/styledComponents/common';
import { IReloadModal } from '#shared/types/IModal';

type IUpdateXmlDocenteModal = IReloadModal & { docente: { id: string; nome: string } };

export function UpdateXmlDocenteModal({
  closeModal,
  docente,
  reloadList,
  openModal,
}: IUpdateXmlDocenteModal) {
  const [xml, setXml] = useState<FileList | null>(null);

  const { toast } = useToast();

  const { send: updateXmlDocente } = usePatch(`/docentes/xml/${docente.id}`);

  const handleUpdateXml = useCallback(async () => {
    if (docente == null) {
      return;
    }

    const formData = new FormData();

    if (xml == null) {
      toast({ message: 'Selecione um arquivo para continuar', severity: 'error' });

      return;
    }

    const file = xml[0];

    formData.append('xml', file);

    const { error } = await updateXmlDocente(formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (error != null) {
      toast({ message: error, severity: 'error' });

      return;
    }

    reloadList();

    toast({ message: 'docente atualizado', severity: 'success' });

    closeModal();
  }, [docente, xml, updateXmlDocente, reloadList, toast, closeModal]);

  return (
    <>
      <CustomDialog
        open={openModal}
        closeModal={closeModal}
        title="Atualizar XML Docente"
        maxWidth="xs"
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomButton
            customColor="#032860"
            component="label"
            marginType="no-margin"
            sx={{ mr: '0.5rem', background: '#032860', width: '120px' }}
          >
            Upload XML
            <input
              hidden
              accept=".xml"
              type="file"
              onChange={(event) => setXml(event.target.files)}
            />
          </CustomButton>

          {xml != null ? (
            <Typography>Arquivo Selecionado: {xml[0].name}</Typography>
          ) : (
            <Typography>Nenhum Arquivo Selecionado</Typography>
          )}
        </Box>

        <Typography sx={{ mt: '1rem' }}>
          Tem Certeza que deseja atualizar o xml do docente:
        </Typography>

        <TextConfirm>{docente.nome}</TextConfirm>

        <Typography sx={{ mt: '1rem' }}>
          Os dados de resumo, lattes id e areas de atuação vão ser completamente substituidos pelos
          dados novos
        </Typography>

        <CustomButton color="error" onClick={handleUpdateXml}>
          Sim
        </CustomButton>
      </CustomDialog>
    </>
  );
}
