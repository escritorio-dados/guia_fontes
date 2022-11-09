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
import {
  getSortOptions,
  handleAddItem,
  handleDeleteItem,
  handleUpdateItem,
  IPaginationConfig,
} from '#shared/utils/pagination';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { CreateUnidadeUnaspModal } from '../../components/CreateUnidadeUnasp';
import { DeleteUnidadeUnaspModal } from '../../components/DeleteUnidadeUnasp';
import { InfoUnidadeUnaspModal } from '../../components/InfoUnidadeUnasp';
import { UpdateUnidadeUnaspModal } from '../../components/UpdateUnidadeUnasp';
import { IUnidadeUnasp, IUnidadeUnaspFilters } from '../../types/IUnidadeUnasp';
import { defaultUnidadeUnaspFilter, ListUnidadeUnaspsFilter } from './form';

type IDeleteModal = { id: string; nome: string } | null;
type IUpdateModal = { id: string } | null;

export const defaultApiConfigUnidadeUnasps: IPaginationConfig<IUnidadeUnaspFilters> = {
  page: 1,
  sort_by: 'updated_at',
  order_by: 'DESC',
  filters: defaultUnidadeUnaspFilter,
};

const sortTranslator: Record<string, string> = {
  nome: 'Nome',
  contatoAssesoria: 'Contato Assesoria',
  updated_at: 'Data de Atualização',
  created_at: 'Data de Criação',
};

const sortOptions = getSortOptions(sortTranslator);

export const stateKeyUnidadeUnasps = 'unidadesUnasp';

export function ListUnidadeUnasp() {
  const keepState = useKeepStates();

  const [apiConfig, setApiConfig] = useState<IPaginationConfig<IUnidadeUnaspFilters>>(() =>
    getApiConfig({
      defaultApiConfig: defaultApiConfigUnidadeUnasps,
      keepState,
      stateKey: stateKeyUnidadeUnasps,
    }),
  );
  const [deleteUnidadeUnasp, setDeleteUnidadeUnasp] = useState<IDeleteModal>(null);
  const [infoUnidadeUnasp, setInfoUnidadeUnasp] = useState<IUpdateModal>(null);
  const [updateUnidadeUnasp, setUpdateUnidadeUnasp] = useState<IUpdateModal>(null);
  const [createUnidadeUnasp, setCreateUnidadeUnasp] = useState(false);

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
    data: unidadesUnaspData,
    error: unidadesUnaspError,
    send: getUnidadeUnasps,
    updateData: updateUnidadeUnaspsData,
  } = useGet<IPagingResult<IUnidadeUnasp>>({
    url: '/unidades_unasp',
    lazy: true,
  });

  useEffect(() => {
    void getUnidadeUnasps({ params: apiParams });
  }, [apiParams, getUnidadeUnasps]);

  useEffect(() => {
    if (unidadesUnaspError != null) {
      toast({ message: unidadesUnaspError, severity: 'error' });
    }
  }, [unidadesUnaspError, toast]);

  useEffect(() => {
    updateTitle('Unidades Unasp');
  }, [updateTitle]);

  const activeFiltersNumber = useMemo(() => {
    return Object.values(removeEmptyFields(apiConfig.filters, true)).filter((data) => data).length;
  }, [apiConfig.filters]);

  const cols = useMemo<Array<ICol<IUnidadeUnasp>>>(() => {
    return [
      { key: 'nome', header: 'Nome', minWidth: '200px' },
      { key: 'contatoAssesoria', header: 'Contato Assesoria', minWidth: '200px' },
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
                action={() => setInfoUnidadeUnasp({ id })}
              />

              <CustomIconButton
                iconType="edit"
                iconSize="small"
                title="Editar Unidade"
                action={() => setUpdateUnidadeUnasp({ id })}
              />

              <CustomIconButton
                iconType="delete"
                iconSize="small"
                title="Deletar Unidade"
                action={() => setDeleteUnidadeUnasp({ id, nome })}
              />
            </Box>
          );
        },
      },
    ];
  }, []);

  return (
    <>
      {deleteUnidadeUnasp != null && (
        <DeleteUnidadeUnaspModal
          openModal={deleteUnidadeUnasp != null}
          closeModal={() => setDeleteUnidadeUnasp(null)}
          unidadeUnasp={deleteUnidadeUnasp}
          updateList={(id) =>
            updateUnidadeUnaspsData((current) => handleDeleteItem({ id, current }))
          }
        />
      )}

      {updateUnidadeUnasp != null && (
        <UpdateUnidadeUnaspModal
          openModal={updateUnidadeUnasp != null}
          closeModal={() => setUpdateUnidadeUnasp(null)}
          unidade_unasp_id={updateUnidadeUnasp.id}
          updateList={(id, data) =>
            updateUnidadeUnaspsData((current) => handleUpdateItem({ id, data, current }))
          }
        />
      )}

      {infoUnidadeUnasp != null && (
        <InfoUnidadeUnaspModal
          openModal={infoUnidadeUnasp != null}
          closeModal={() => setInfoUnidadeUnasp(null)}
          unidade_unasp_id={infoUnidadeUnasp.id}
        />
      )}

      {createUnidadeUnasp && (
        <CreateUnidadeUnaspModal
          openModal={createUnidadeUnasp}
          closeModal={() => setCreateUnidadeUnasp(false)}
          addList={(data) => updateUnidadeUnaspsData((current) => handleAddItem({ data, current }))}
        />
      )}

      <CustomTable<IUnidadeUnasp>
        id="unidadesUnasp"
        cols={cols}
        data={unidadesUnaspData?.data ?? []}
        tableMinWidth="550px"
        activeFilters={activeFiltersNumber}
        custom_actions={
          <>
            <CustomIconButton
              action={() => setCreateUnidadeUnasp(true)}
              title="Cadastrar Unidade"
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
                  stateKey: stateKeyUnidadeUnasps,
                }),
              );
            }}
          />
        }
        filterContainer={
          <ListUnidadeUnaspsFilter
            apiConfig={apiConfig}
            updateApiConfig={(filters) => {
              setApiConfig(
                updateApiConfig({
                  apiConfig,
                  keepState,
                  newConfig: { filters, page: 1 },
                  stateKey: stateKeyUnidadeUnasps,
                }),
              );
            }}
          />
        }
        pagination={{
          currentPage: apiConfig.page,
          totalPages: unidadesUnaspData?.pagination.totalPages ?? 1,
          totalResults: unidadesUnaspData?.pagination.totalResults ?? 0,
          changePage: (page) =>
            setApiConfig(
              updateApiConfig({
                apiConfig,
                keepState,
                newConfig: { page },
                stateKey: stateKeyUnidadeUnasps,
              }),
            ),
        }}
      />
    </>
  );
}
