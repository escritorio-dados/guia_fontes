import { useEffect, useMemo } from 'react';

import { CustomDialog } from '#shared/components/CustomDialog';
import { LabelValue } from '#shared/components/info/LabelValue';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { IBaseModal } from '#shared/types/IModal';
import { parseDateApi } from '#shared/utils/parseDateApi';

import { IUser } from '../../types/IUser';

type IInfoUserModal = IBaseModal & { user_id: string };

export function InfoUserModal({ closeModal, user_id, openModal }: IInfoUserModal) {
  const { toast } = useToast();

  const { data: userData, error: userError } = useGet<IUser>({ url: `/users/${user_id}` });

  useEffect(() => {
    if (userError != null) {
      toast({ message: userError, severity: 'error' });

      closeModal();
    }
  }, [userError, toast, closeModal]);

  const userInfo = useMemo(() => {
    if (userData == null) {
      return null;
    }

    return {
      ...userData,
      created_at: parseDateApi(userData.created_at, 'dd/MM/yyyy (HH:mm)', '-'),
      updated_at: parseDateApi(userData.updated_at, 'dd/MM/yyyy (HH:mm)', '-'),
    };
  }, [userData]);

  return (
    <>
      {userInfo != null && (
        <CustomDialog
          open={openModal}
          closeModal={closeModal}
          title="Informações usuario"
          maxWidth="sm"
        >
          <LabelValue label="Nome:" value={userInfo.nome} />

          <LabelValue label="E-mail:" value={userInfo.email} />

          <LabelValue label="Criado em:" value={userInfo.created_at} />

          <LabelValue label="Atualizado em:" value={userInfo.updated_at} />
        </CustomDialog>
      )}
    </>
  );
}
