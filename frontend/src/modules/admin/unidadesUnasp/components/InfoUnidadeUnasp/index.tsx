import { useEffect, useMemo } from 'react';

import { CustomDialog } from '#shared/components/CustomDialog';
import { LabelValue } from '#shared/components/info/LabelValue';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { IBaseModal } from '#shared/types/IModal';
import { parseDateApi } from '#shared/utils/parseDateApi';

import { IUnidadeUnasp } from '../../types/IUnidadeUnasp';

type IInfoUnidadeUnaspModal = IBaseModal & { unidade_unasp_id: string };

export function InfoUnidadeUnaspModal({
  closeModal,
  unidade_unasp_id,
  openModal,
}: IInfoUnidadeUnaspModal) {
  const { toast } = useToast();

  const { data: unidadeUnaspData, error: unidadeUnaspError } = useGet<IUnidadeUnasp>({
    url: `/unidades_unasp/${unidade_unasp_id}`,
  });

  useEffect(() => {
    if (unidadeUnaspError != null) {
      toast({ message: unidadeUnaspError, severity: 'error' });

      closeModal();
    }
  }, [unidadeUnaspError, toast, closeModal]);

  const unidadeUnaspInfo = useMemo(() => {
    if (unidadeUnaspData == null) {
      return null;
    }

    return {
      ...unidadeUnaspData,
      created_at: parseDateApi(unidadeUnaspData.created_at, 'dd/MM/yyyy (HH:mm)', '-'),
      updated_at: parseDateApi(unidadeUnaspData.updated_at, 'dd/MM/yyyy (HH:mm)', '-'),
    };
  }, [unidadeUnaspData]);

  return (
    <>
      {unidadeUnaspInfo != null && (
        <CustomDialog
          open={openModal}
          closeModal={closeModal}
          title="Informações unidade"
          maxWidth="sm"
        >
          <LabelValue label="Nome:" value={unidadeUnaspInfo.nome} />

          <LabelValue label="Criado em:" value={unidadeUnaspInfo.created_at} />

          <LabelValue label="Atualizado em:" value={unidadeUnaspInfo.updated_at} />
        </CustomDialog>
      )}
    </>
  );
}
