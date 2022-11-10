import { Typography } from '@mui/material';
import { useCallback } from 'react';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { useToast } from '#shared/hooks/toast';
import { useDelete } from '#shared/services/useAxios';
import { TextConfirm } from '#shared/styledComponents/common';
import { IDeleteModal } from '#shared/types/IModal';

type IDeletePeriodoModal = IDeleteModal & { periodo: { id: string; nome: string } };

export function DeletePeriodoModal({
  closeModal,
  periodo,
  openModal,
  updateList,
}: IDeletePeriodoModal) {
  const { toast } = useToast();

  const { send: deletePeriodo } = useDelete(`/periodos/${periodo.id}`);

  const handleDelete = useCallback(async () => {
    if (periodo == null) {
      return;
    }

    const { error } = await deletePeriodo();

    if (error != null) {
      toast({ message: error, severity: 'error' });

      return;
    }

    updateList(periodo.id);

    toast({ message: 'unidade deletada', severity: 'success' });

    closeModal();
  }, [closeModal, deletePeriodo, updateList, toast, periodo]);

  return (
    <>
      <CustomDialog open={openModal} closeModal={closeModal} title="Excluir Periodo" maxWidth="xs">
        <Typography>Tem Certeza que deseja deletar o periodo:</Typography>

        <TextConfirm>{periodo.nome}</TextConfirm>

        <CustomButton color="error" onClick={handleDelete}>
          Sim
        </CustomButton>
      </CustomDialog>
    </>
  );
}
