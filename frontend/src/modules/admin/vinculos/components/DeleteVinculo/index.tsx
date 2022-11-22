import { Typography } from '@mui/material';
import { useCallback } from 'react';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { useToast } from '#shared/hooks/toast';
import { useDelete } from '#shared/services/useAxios';
import { TextConfirm } from '#shared/styledComponents/common';
import { IReloadModal } from '#shared/types/IModal';

type IDeleteVinculoModal = IReloadModal & { vinculo: { id: string; nome: string } };

export function DeleteVinculoModal({
  closeModal,
  vinculo,
  openModal,
  reloadList,
}: IDeleteVinculoModal) {
  const { toast } = useToast();

  const { send: deleteVinculo } = useDelete(`/vinculos/${vinculo.id}`);

  const handleDelete = useCallback(async () => {
    if (vinculo == null) {
      return;
    }

    const { error } = await deleteVinculo();

    if (error != null) {
      toast({ message: error, severity: 'error' });

      return;
    }

    reloadList();

    toast({ message: 'vinculo deletado', severity: 'success' });

    closeModal();
  }, [closeModal, deleteVinculo, reloadList, toast, vinculo]);

  return (
    <>
      <CustomDialog open={openModal} closeModal={closeModal} title="Excluir Vinculo" maxWidth="sm">
        <Typography>Tem Certeza que deseja deletar o vinculo:</Typography>

        <TextConfirm>{vinculo.nome}</TextConfirm>

        <CustomButton color="error" onClick={handleDelete}>
          Sim
        </CustomButton>
      </CustomDialog>
    </>
  );
}
