import { Typography } from '@mui/material';
import { useCallback } from 'react';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { useToast } from '#shared/hooks/toast';
import { useDelete } from '#shared/services/useAxios';
import { TextConfirm } from '#shared/styledComponents/common';
import { IReloadModal } from '#shared/types/IModal';

type IDeleteDocenteModal = IReloadModal & { docente: { id: string; nome: string } };

export function DeleteDocenteModal({
  closeModal,
  docente,
  openModal,
  reloadList,
}: IDeleteDocenteModal) {
  const { toast } = useToast();

  const { send: deleteDocente } = useDelete(`/docentes/${docente.id}`);

  const handleDelete = useCallback(async () => {
    if (docente == null) {
      return;
    }

    const { error } = await deleteDocente();

    if (error != null) {
      toast({ message: error, severity: 'error' });

      return;
    }

    reloadList();

    toast({ message: 'docente deletado', severity: 'success' });

    closeModal();
  }, [closeModal, deleteDocente, reloadList, toast, docente]);

  return (
    <>
      <CustomDialog open={openModal} closeModal={closeModal} title="Excluir Docente" maxWidth="sm">
        <Typography>Tem Certeza que deseja deletar o docente:</Typography>

        <TextConfirm>{docente.nome}</TextConfirm>

        <CustomButton color="error" onClick={handleDelete}>
          Sim
        </CustomButton>
      </CustomDialog>
    </>
  );
}
