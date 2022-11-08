import { Typography } from '@mui/material';
import { useCallback } from 'react';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { useToast } from '#shared/hooks/toast';
import { useDelete } from '#shared/services/useAxios';
import { TextConfirm } from '#shared/styledComponents/common';
import { IDeleteModal } from '#shared/types/IModal';

type IDeleteUserModal = IDeleteModal & { user: { id: string; nome: string } };

export function DeleteUserModal({ closeModal, user, openModal, updateList }: IDeleteUserModal) {
  const { toast } = useToast();

  const { send: deleteUser } = useDelete(`/users/${user.id}`);

  const handleDelete = useCallback(async () => {
    if (user == null) {
      return;
    }

    const { error } = await deleteUser();

    if (error != null) {
      toast({ message: error, severity: 'error' });

      return;
    }

    updateList(user.id);

    toast({ message: 'usuario deletado', severity: 'success' });

    closeModal();
  }, [closeModal, deleteUser, updateList, toast, user]);

  return (
    <>
      <CustomDialog open={openModal} closeModal={closeModal} title="Excluir Usuario" maxWidth="xs">
        <Typography>Tem Certeza que deseja deletar o usuario:</Typography>

        <TextConfirm>{user.nome}</TextConfirm>

        <CustomButton color="error" onClick={handleDelete}>
          Sim
        </CustomButton>
      </CustomDialog>
    </>
  );
}
