import { Typography } from '@mui/material';
import { useCallback } from 'react';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { useToast } from '#shared/hooks/toast';
import { useDelete } from '#shared/services/useAxios';
import { TextConfirm } from '#shared/styledComponents/common';
import { IDeleteModal } from '#shared/types/IModal';

type IDeleteUnidadeUnaspModal = IDeleteModal & { unidadeUnasp: { id: string; nome: string } };

export function DeleteUnidadeUnaspModal({
  closeModal,
  unidadeUnasp,
  openModal,
  updateList,
}: IDeleteUnidadeUnaspModal) {
  const { toast } = useToast();

  const { send: deleteUnidadeUnasp } = useDelete(`/unidades_unasp/${unidadeUnasp.id}`);

  const handleDelete = useCallback(async () => {
    if (unidadeUnasp == null) {
      return;
    }

    const { error } = await deleteUnidadeUnasp();

    if (error != null) {
      toast({ message: error, severity: 'error' });

      return;
    }

    updateList(unidadeUnasp.id);

    toast({ message: 'unidade deletada', severity: 'success' });

    closeModal();
  }, [closeModal, deleteUnidadeUnasp, updateList, toast, unidadeUnasp]);

  return (
    <>
      <CustomDialog open={openModal} closeModal={closeModal} title="Excluir Unidade" maxWidth="xs">
        <Typography>Tem Certeza que deseja deletar a unidade:</Typography>

        <TextConfirm>{unidadeUnasp.nome}</TextConfirm>

        <CustomButton color="error" onClick={handleDelete}>
          Sim
        </CustomButton>
      </CustomDialog>
    </>
  );
}
