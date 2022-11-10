import { Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { CustomIconButton } from '#shared/components/CustomIconButton';
import { CustomTable, ICol } from '#shared/components/CustomTable';
import { SortForm } from '#shared/components/SortForm';
import { useKeepStates } from '#shared/hooks/keepStates';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { IPagingResult } from '#shared/types/IPagingResult';
import { getApiConfig, updateApiConfig } from '#shared/utils/apiConfig';
import { getSortOptions, handleDeleteItem, IPaginationConfig } from '#shared/utils/pagination';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { CreatePeriodoModal } from '../../components/CreatePeriodo';
import { DeletePeriodoModal } from '../../components/DeletePeriodo';
import { InfoPeriodoModal } from '../../components/InfoPeriodo';
import { UpdatePeriodoModal } from '../../components/UpdatePeriodo';
import { IPeriodo, IPeriodoFilters } from '../../types/IPeriodo';
import { defaultPeriodoFilter, ListPeriodosFilter } from './form';

type IDeleteModal = { id: string; nome: string } | null;
type IUpdateModal = { id: string } | null;

type IPeriodoInfo = Omit<IPeriodo, 'atual'> & { atual: string };

export const defaultApiConfigPeriodos: IPaginationConfig<IPeriodoFilters> = {
  page: 1,
  sort_by: 'updated_at',
  order_by: 'DESC',
  filters: defaultPeriodoFilter,
};

const sortTranslator: Record<string, string> = {
  nome: 'Nome',
  updated_at: 'Data de Atualização',
  created_at: 'Data de Criação',
};

const sortOptions = getSortOptions(sortTranslator);

export const stateKeyPeriodos = 'periodos';

export function ListPeriodo() {
  const keepState = useKeepStates();

  const [apiConfig, setApiConfig] = useState<IPaginationConfig<IPeriodoFilters>>(() =>
    getApiConfig({
      defaultApiConfig: defaultApiConfigPeriodos,
      keepState,
      stateKey: stateKeyPeriodos,
    }),
  );
  const [deletePeriodo, setDeletePeriodo] = useState<IDeleteModal>(null);
  const [infoPeriodo, setInfoPeriodo] = useState<IUpdateModal>(null);
  const [updatePeriodo, setUpdatePeriodo] = useState<IUpdateModal>(null);
  const [createPeriodo, setCreatePeriodo] = useState(false);

  const { updateTitle } = useTitle();
  const { toast } = useToast();

  const apiParams = useMemo(() => {
    return {
      page: apiConfig.page,
      sort_by: apiConfig.sort_by,
      order_by: apiConfig.order_by,
      ...removeEmptyFields(apiConfig.filters),
    };
  }, [apiConfig]);

  const {
    data: periodosData,
    error: periodosError,
    send: getPeriodos,
    updateData: updatePeriodosData,
  } = useGet<IPagingResult<IPeriodo>>({
    url: '/periodos',
    lazy: true,
  });

  useEffect(() => {
    void getPeriodos({ params: apiParams });
  }, [apiParams, getPeriodos]);

  useEffect(() => {
    if (periodosError != null) {
      toast({ message: periodosError, severity: 'error' });
    }
  }, [periodosError, toast]);

  useEffect(() => {
    updateTitle('Periodos');
  }, [updateTitle]);

  const activeFiltersNumber = useMemo(() => {
    return Object.values(removeEmptyFields(apiConfig.filters, true)).filter((data) => data).length;
  }, [apiConfig.filters]);

  const cols = useMemo<Array<ICol<IPeriodoInfo>>>(() => {
    return [
      { key: 'nome', header: 'Nome', minWidth: '200px' },
      { key: 'atual', header: 'Atual', minWidth: '50px' },
      {
        header: 'Opções',
        maxWidth: '150px',
        minWidth: '150px',
        customColumn: ({ id, nome }) => {
          return (
            <Box display="flex" alignItems="center">
              <CustomIconButton
                iconType="info"
                iconSize="small"
                title="Informações"
                action={() => setInfoPeriodo({ id })}
              />

              <CustomIconButton
                iconType="edit"
                iconSize="small"
                title="Editar Periodo"
                action={() => setUpdatePeriodo({ id })}
              />

              <CustomIconButton
                iconType="delete"
                iconSize="small"
                title="Deletar Periodo"
                action={() => setDeletePeriodo({ id, nome })}
              />
            </Box>
          );
        },
      },
    ];
  }, []);

  const periodosInfo = useMemo(() => {
    if (periodosData == null) {
      return [];
    }

    return periodosData.data.map((periodo) => ({
      ...periodo,
      atual: periodo.atual ? 'Sim' : '',
    }));
  }, [periodosData]);

  return (
    <>
      {deletePeriodo != null && (
        <DeletePeriodoModal
          openModal={deletePeriodo != null}
          closeModal={() => setDeletePeriodo(null)}
          periodo={deletePeriodo}
          updateList={(id) => updatePeriodosData((current) => handleDeleteItem({ id, current }))}
        />
      )}

      {updatePeriodo != null && (
        <UpdatePeriodoModal
          openModal={updatePeriodo != null}
          closeModal={() => setUpdatePeriodo(null)}
          periodo_id={updatePeriodo.id}
          reloadList={async () => await getPeriodos({ params: apiParams })}
        />
      )}

      {infoPeriodo != null && (
        <InfoPeriodoModal
          openModal={infoPeriodo != null}
          closeModal={() => setInfoPeriodo(null)}
          periodo_id={infoPeriodo.id}
        />
      )}

      {createPeriodo && (
        <CreatePeriodoModal
          openModal={createPeriodo}
          closeModal={() => setCreatePeriodo(false)}
          reloadList={async () => await getPeriodos({ params: apiParams })}
        />
      )}

      <CustomTable<IPeriodoInfo>
        id="periodos"
        cols={cols}
        data={periodosInfo}
        tableMinWidth="550px"
        tableMaxWidth="900px"
        activeFilters={activeFiltersNumber}
        custom_actions={
          <>
            <CustomIconButton
              action={() => setCreatePeriodo(true)}
              title="Cadastrar Periodo"
              iconType="add"
            />
          </>
        }
        sortContainer={
          <SortForm
            sortOptions={sortOptions}
            sortTranslator={sortTranslator}
            defaultOrder={apiConfig.order_by}
            defaultSort={apiConfig.sort_by}
            updateSort={(sort_by, order_by) => {
              setApiConfig(
                updateApiConfig({
                  apiConfig,
                  keepState,
                  newConfig: { sort_by, order_by },
                  stateKey: stateKeyPeriodos,
                }),
              );
            }}
          />
        }
        filterContainer={
          <ListPeriodosFilter
            apiConfig={apiConfig}
            updateApiConfig={(filters) => {
              setApiConfig(
                updateApiConfig({
                  apiConfig,
                  keepState,
                  newConfig: { filters, page: 1 },
                  stateKey: stateKeyPeriodos,
                }),
              );
            }}
          />
        }
        pagination={{
          currentPage: apiConfig.page,
          totalPages: periodosData?.pagination.totalPages ?? 1,
          totalResults: periodosData?.pagination.totalResults ?? 0,
          changePage: (page) =>
            setApiConfig(
              updateApiConfig({
                apiConfig,
                keepState,
                newConfig: { page },
                stateKey: stateKeyPeriodos,
              }),
            ),
        }}
      />
    </>
  );
}
