import { Typography } from '@mui/material';
import { useCallback } from 'react';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { useToast } from '#shared/hooks/toast';
import { useDelete } from '#shared/services/useAxios';
import { TextConfirm } from '#shared/styledComponents/common';
import { IReloadModal } from '#shared/types/IModal';

type IDeleteAreaModal = IReloadModal & { area: { id: string; nome: string } };

export function DeleteAreaModal({ closeModal, area, openModal, reloadList }: IDeleteAreaModal) {
  const { toast } = useToast();

  const { send: deleteArea } = useDelete(`/areas_atuacao/${area.id}`);

  const handleDelete = useCallback(async () => {
    if (area == null) {
      return;
    }

    const { error } = await deleteArea();

    if (error != null) {
      toast({ message: error, severity: 'error' });

      return;
    }

    reloadList();

    toast({ message: 'area deletada', severity: 'success' });

    closeModal();
  }, [closeModal, deleteArea, reloadList, toast, area]);

  return (
    <>
      <CustomDialog open={openModal} closeModal={closeModal} title="Excluir Area" maxWidth="sm">
        <Typography>Tem Certeza que deseja deletar a area:</Typography>

        <TextConfirm>{area.nome}</TextConfirm>

        <CustomButton color="error" onClick={handleDelete}>
          Sim
        </CustomButton>
      </CustomDialog>
    </>
  );
}
