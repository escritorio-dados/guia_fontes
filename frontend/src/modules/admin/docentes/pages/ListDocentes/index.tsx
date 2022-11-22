import { FileUpload } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomIconButton } from '#shared/components/CustomIconButton';
import { CustomTable, ICol } from '#shared/components/CustomTable';
import { SortForm } from '#shared/components/SortForm';
import { useKeepStates } from '#shared/hooks/keepStates';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { IPagingResult } from '#shared/types/IPagingResult';
import { getApiConfig, updateApiConfig } from '#shared/utils/apiConfig';
import { getSortOptions, IPaginationConfig } from '#shared/utils/pagination';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { CreateDocenteModal } from '../../components/CreateDocente';
import { DeleteDocenteModal } from '../../components/DeleteDocente';
import { UpdateXmlDocenteModal } from '../../components/UpdateXmlDocente';
import { IDocente, IDocenteFilters } from '../../types/IDocente';
import { defaultDocenteFilter, ListDocentesFilter } from './form';

type IInfoModal = { id: string; nome: string } | null;

type IDocenteInfo = Omit<IDocente, 'imprensa'> & { imprensa: string };

export const defaultApiConfigDocentes: IPaginationConfig<IDocenteFilters> = {
  page: 1,
  sort_by: 'updated_at',
  order_by: 'DESC',
  filters: defaultDocenteFilter,
};

const sortTranslator: Record<string, string> = {
  nome: 'Nome',
  lattes_id: 'Lattes Id',
  contato_assesoria: 'Contato Assesoria',
  cpf: 'CPF',
  imprensa: 'Falar com Imprensa',
  updated_at: 'Data de Atualização',
  created_at: 'Data de Criação',
};

const sortOptions = getSortOptions(sortTranslator);

export const stateKeyDocentes = 'docentes';

export function ListDocente() {
  const keepState = useKeepStates();
  const navigate = useNavigate();

  const [apiConfig, setApiConfig] = useState<IPaginationConfig<IDocenteFilters>>(() =>
    getApiConfig({
      defaultApiConfig: defaultApiConfigDocentes,
      keepState,
      stateKey: stateKeyDocentes,
    }),
  );
  const [deleteDocente, setDeleteDocente] = useState<IInfoModal>(null);
  const [updateDocente, setUpdateDocente] = useState<IInfoModal>(null);
  const [createDocente, setCreateDocente] = useState(false);

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
    data: docentesData,
    error: docentesError,
    send: getDocentes,
  } = useGet<IPagingResult<IDocente>>({
    url: '/docentes',
    lazy: true,
  });

  useEffect(() => {
    void getDocentes({ params: apiParams });
  }, [apiParams, getDocentes]);

  useEffect(() => {
    if (docentesError != null) {
      toast({ message: docentesError, severity: 'error' });
    }
  }, [docentesError, toast]);

  useEffect(() => {
    updateTitle('Docentes');
  }, [updateTitle]);

  const activeFiltersNumber = useMemo(() => {
    return Object.values(removeEmptyFields(apiConfig.filters, true)).filter((data) => data).length;
  }, [apiConfig.filters]);

  const cols = useMemo<Array<ICol<IDocenteInfo>>>(() => {
    return [
      { key: 'nome', header: 'Nome', minWidth: '200px' },
      { key: 'lattesId', header: 'Id Lattes', minWidth: '200px' },
      { key: 'contatoAssesoria', header: 'Contato Assesoria', minWidth: '200px' },
      { key: 'cpf', header: 'CPF', minWidth: '200px' },
      { key: 'imprensa', header: 'Imprensa', minWidth: '70px' },
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
                title="Ir para a página de detalhes"
                action={() => navigate(`/admin/docentes/${id}`)}
              />

              <CustomIconButton
                iconType="custom"
                CustomIcon={<FileUpload />}
                title="Atualizar Xml do Docente"
                action={() => setUpdateDocente({ id, nome })}
              />

              <CustomIconButton
                iconType="delete"
                iconSize="small"
                title="Deletar Docente"
                action={() => setDeleteDocente({ id, nome })}
              />
            </Box>
          );
        },
      },
    ];
  }, [navigate]);

  const docentesInfo = useMemo(() => {
    if (docentesData == null) {
      return [];
    }

    return docentesData.data.map((docente) => ({
      ...docente,
      imprensa: docente.imprensa ? 'Sim' : '',
    }));
  }, [docentesData]);

  return (
    <>
      {deleteDocente != null && (
        <DeleteDocenteModal
          openModal={deleteDocente != null}
          closeModal={() => setDeleteDocente(null)}
          docente={deleteDocente}
          reloadList={async () => await getDocentes({ params: apiParams })}
        />
      )}

      {updateDocente != null && (
        <UpdateXmlDocenteModal
          openModal={updateDocente != null}
          closeModal={() => setUpdateDocente(null)}
          docente={updateDocente}
          reloadList={async () => await getDocentes({ params: apiParams })}
        />
      )}

      {createDocente && (
        <CreateDocenteModal
          openModal={createDocente}
          closeModal={() => setCreateDocente(false)}
          reloadList={async () => await getDocentes({ params: apiParams })}
        />
      )}

      <CustomTable<IDocenteInfo>
        id="docentes"
        cols={cols}
        data={docentesInfo}
        tableMinWidth="550px"
        activeFilters={activeFiltersNumber}
        custom_actions={
          <>
            <CustomIconButton
              action={() => setCreateDocente(true)}
              title="Cadastrar Docente"
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
                  stateKey: stateKeyDocentes,
                }),
              );
            }}
          />
        }
        filterContainer={
          <ListDocentesFilter
            apiConfig={apiConfig}
            updateApiConfig={(filters) => {
              setApiConfig(
                updateApiConfig({
                  apiConfig,
                  keepState,
                  newConfig: { filters, page: 1 },
                  stateKey: stateKeyDocentes,
                }),
              );
            }}
          />
        }
        pagination={{
          currentPage: apiConfig.page,
          totalPages: docentesData?.pagination.totalPages ?? 1,
          totalResults: docentesData?.pagination.totalResults ?? 0,
          changePage: (page) =>
            setApiConfig(
              updateApiConfig({
                apiConfig,
                keepState,
                newConfig: { page },
                stateKey: stateKeyDocentes,
              }),
            ),
        }}
      />
    </>
  );
}
