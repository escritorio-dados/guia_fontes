import { Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { CustomIconButton } from '#shared/components/CustomIconButton';
import { CustomTable, ICol } from '#shared/components/CustomTable';
import { SortForm } from '#shared/components/SortForm';
import { useAuth } from '#shared/hooks/auth';
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

import { CreateUserModal } from '../../components/CreateUser';
import { DeleteUserModal } from '../../components/DeleteUser';
import { InfoUserModal } from '../../components/InfoUser';
import { UpdateUserModal } from '../../components/UpdateUser';
import { IUser, IUserFilters } from '../../types/IUser';
import { defaultUserFilter, ListUsersFilter } from './form';

type IDeleteModal = { id: string; nome: string } | null;
type IUpdateModal = { id: string } | null;

export const defaultApiConfigUsers: IPaginationConfig<IUserFilters> = {
  page: 1,
  sort_by: 'updated_at',
  order_by: 'DESC',
  filters: defaultUserFilter,
};

const sortTranslator: Record<string, string> = {
  name: 'Nome',
  email: 'Email',
  updated_at: 'Data de Atualização',
  created_at: 'Data de Criação',
};

const sortOptions = getSortOptions(sortTranslator);

export const stateKeyUsers = 'users';

export function ListUser() {
  const keepState = useKeepStates();

  const [apiConfig, setApiConfig] = useState<IPaginationConfig<IUserFilters>>(() =>
    getApiConfig({
      defaultApiConfig: defaultApiConfigUsers,
      keepState,
      stateKey: stateKeyUsers,
    }),
  );
  const [deleteUser, setDeleteUser] = useState<IDeleteModal>(null);
  const [infoUser, setInfoUser] = useState<IUpdateModal>(null);
  const [updateUser, setUpdateUser] = useState<IUpdateModal>(null);
  const [createUser, setCreateUser] = useState(false);

  const { user: userLogged } = useAuth();
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
    data: usersData,
    error: usersError,
    send: getUsers,
    updateData: updateUsersData,
  } = useGet<IPagingResult<IUser>>({
    url: '/users',
    lazy: true,
  });

  useEffect(() => {
    void getUsers({ params: apiParams });
  }, [apiParams, getUsers]);

  useEffect(() => {
    if (usersError != null) {
      toast({ message: usersError, severity: 'error' });
    }
  }, [usersError, toast]);

  useEffect(() => {
    updateTitle('Usuarios');
  }, [updateTitle]);

  const activeFiltersNumber = useMemo(() => {
    return Object.values(removeEmptyFields(apiConfig.filters, true)).filter((data) => data).length;
  }, [apiConfig.filters]);

  const cols = useMemo<Array<ICol<IUser>>>(() => {
    return [
      { key: 'nome', header: 'Nome', minWidth: '200px' },
      { key: 'email', header: 'Email', minWidth: '200px' },
      {
        header: 'Opções',
        maxWidth: '150px',
        minWidth: '150px',
        customColumn: ({ id, nome }) => {
          const canDelete = id !== userLogged.id;

          return (
            <Box display="flex" alignItems="center">
              <CustomIconButton
                iconType="info"
                iconSize="small"
                title="Informações"
                action={() => setInfoUser({ id })}
              />

              <CustomIconButton
                iconType="edit"
                iconSize="small"
                title="Editar Usuario"
                action={() => setUpdateUser({ id })}
              />

              {canDelete && (
                <CustomIconButton
                  iconType="delete"
                  iconSize="small"
                  title="Deletar Usuario"
                  action={() => setDeleteUser({ id, nome })}
                />
              )}
            </Box>
          );
        },
      },
    ];
  }, [userLogged.id]);

  return (
    <>
      {deleteUser != null && (
        <DeleteUserModal
          openModal={deleteUser != null}
          closeModal={() => setDeleteUser(null)}
          user={deleteUser}
          updateList={(id) => updateUsersData((current) => handleDeleteItem({ id, current }))}
        />
      )}

      {updateUser != null && (
        <UpdateUserModal
          openModal={updateUser != null}
          closeModal={() => setUpdateUser(null)}
          user_id={updateUser.id}
          updateList={(id, data) =>
            updateUsersData((current) => handleUpdateItem({ id, data, current }))
          }
        />
      )}

      {infoUser != null && (
        <InfoUserModal
          openModal={infoUser != null}
          closeModal={() => setInfoUser(null)}
          user_id={infoUser.id}
        />
      )}

      {createUser && (
        <CreateUserModal
          openModal={createUser}
          closeModal={() => setCreateUser(false)}
          addList={(data) => updateUsersData((current) => handleAddItem({ data, current }))}
        />
      )}

      <CustomTable<IUser>
        id="users"
        cols={cols}
        data={usersData?.data ?? []}
        tableMinWidth="550px"
        activeFilters={activeFiltersNumber}
        custom_actions={
          <>
            <CustomIconButton
              action={() => setCreateUser(true)}
              title="Cadastrar Usuario"
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
                  stateKey: stateKeyUsers,
                }),
              );
            }}
          />
        }
        filterContainer={
          <ListUsersFilter
            apiConfig={apiConfig}
            updateApiConfig={(filters) => {
              setApiConfig(
                updateApiConfig({
                  apiConfig,
                  keepState,
                  newConfig: { filters, page: 1 },
                  stateKey: stateKeyUsers,
                }),
              );
            }}
          />
        }
        pagination={{
          currentPage: apiConfig.page,
          totalPages: usersData?.pagination.totalPages ?? 1,
          totalResults: usersData?.pagination.totalResults ?? 0,
          changePage: (page) =>
            setApiConfig(
              updateApiConfig({
                apiConfig,
                keepState,
                newConfig: { page },
                stateKey: stateKeyUsers,
              }),
            ),
        }}
      />
    </>
  );
}
