import { useEffect, useMemo } from 'react';

import { CustomDialog } from '#shared/components/CustomDialog';
import { LabelValue } from '#shared/components/info/LabelValue';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { IBaseModal } from '#shared/types/IModal';
import { parseDateApi } from '#shared/utils/parseDateApi';

import { IPeriodo } from '../../types/IPeriodo';

type IInfoPeriodoModal = IBaseModal & { periodo_id: string };

export function InfoPeriodoModal({ closeModal, periodo_id, openModal }: IInfoPeriodoModal) {
  const { toast } = useToast();

  const { data: periodoData, error: periodoError } = useGet<IPeriodo>({
    url: `/periodos/${periodo_id}`,
  });

  useEffect(() => {
    if (periodoError != null) {
      toast({ message: periodoError, severity: 'error' });

      closeModal();
    }
  }, [periodoError, toast, closeModal]);

  const periodoInfo = useMemo(() => {
    if (periodoData == null) {
      return null;
    }

    return {
      ...periodoData,
      atual: periodoData.atual ? 'Sim' : 'Não',
      created_at: parseDateApi(periodoData.created_at, 'dd/MM/yyyy (HH:mm)', '-'),
      updated_at: parseDateApi(periodoData.updated_at, 'dd/MM/yyyy (HH:mm)', '-'),
    };
  }, [periodoData]);

  return (
    <>
      {periodoInfo != null && (
        <CustomDialog
          open={openModal}
          closeModal={closeModal}
          title="Informações unidade"
          maxWidth="sm"
        >
          <LabelValue label="Nome:" value={periodoInfo.nome} />

          <LabelValue label="Atual:" value={periodoInfo.atual} />

          <LabelValue label="Criado em:" value={periodoInfo.created_at} />

          <LabelValue label="Atualizado em:" value={periodoInfo.updated_at} />
        </CustomDialog>
      )}
    </>
  );
}
