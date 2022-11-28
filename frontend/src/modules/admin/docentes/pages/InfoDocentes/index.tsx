import { AddCircle, Edit } from '@mui/icons-material';
import { Box, Container, Grid } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomIconButton } from '#shared/components/CustomIconButton';
import { LabelValue } from '#shared/components/info/LabelValue';
import { SubTitleBar } from '#shared/components/info/SubTitleBar';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import { useGet } from '#shared/services/useAxios';
import { parseDateApi } from '#shared/utils/parseDateApi';

import { CreateAreaModal } from '#modules/admin/areas/components/CreateArea';
import { DeleteAreaModal } from '#modules/admin/areas/components/DeleteArea';
import { UpdateAreaModal } from '#modules/admin/areas/components/UpdateArea';
import { CreateVinculoModal } from '#modules/admin/vinculos/components/CreateVinculo';
import { DeleteVinculoModal } from '#modules/admin/vinculos/components/DeleteVinculo';
import { UpdateVinculoModal } from '#modules/admin/vinculos/components/UpdateVinculo';

import { UpdateDocenteModal } from '../../components/UpdateDocente';
import { IDocente } from '../../types/IDocente';
import { AreaCard } from './styles';

type IDeleteModal = { id: string; nome: string } | null;
type IUpdateModal = { id: string } | null;

export function InfoDocentes() {
  const [addArea, setAddArea] = useState(false);
  const [updateArea, setUpdateArea] = useState<IUpdateModal>(null);
  const [deleteArea, setDeleteArea] = useState<IDeleteModal>(null);

  const [addVinculo, setAddVinculo] = useState(false);
  const [updateVinculo, setUpdateVinculo] = useState<IUpdateModal>(null);
  const [deleteVinculo, setDeleteVinculo] = useState<IDeleteModal>(null);

  const [updateDocente, setUpdateDocente] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateTitle } = useTitle();

  const {
    data: docenteData,
    error: docenteError,
    send: getDocente,
  } = useGet<IDocente>({
    url: `/docentes/${params.id}`,
  });

  useEffect(() => {
    if (docenteError != null) {
      toast({ message: docenteError, severity: 'error' });
    }
  }, [toast, docenteError]);

  useEffect(() => {
    updateTitle(`Info Docente - ${docenteData?.nome}`);
  }, [docenteData?.nome, updateTitle]);

  const docenteInfo = useMemo(() => {
    if (docenteData == null) {
      return null;
    }

    return {
      ...docenteData,
      cpf: docenteData.cpf ?? '-',
      contatoAssesoria: docenteData.contatoAssesoria ?? '-',
      emailAssesoria: docenteData.emailAssesoria ?? '-',
      lattesId: docenteData.lattesId ?? '-',
      resumoLattes: docenteData.resumoLattes ?? '-',
      imprensa: docenteData.imprensa ? 'Sim' : 'Não',
      created_at: parseDateApi(docenteData.created_at, 'dd/MM/yyyy (HH:mm)', '-'),
      updated_at: parseDateApi(docenteData.updated_at, 'dd/MM/yyyy (HH:mm)', '-'),
    };
  }, [docenteData]);

  if (docenteInfo == null)
    return (
      <Container maxWidth="xl">
        <CustomButton marginType="no-margin" sx={{ width: '300px' }} onClick={() => navigate(-1)}>
          Retornar Para a Lista
        </CustomButton>
      </Container>
    );

  return (
    <>
      {updateDocente && (
        <UpdateDocenteModal
          openModal={updateDocente}
          closeModal={() => setUpdateDocente(false)}
          docente_id={params.id ?? ''}
          reloadList={async () => await getDocente()}
        />
      )}

      {updateArea != null && (
        <UpdateAreaModal
          openModal={updateArea != null}
          closeModal={() => setUpdateArea(null)}
          area_id={updateArea.id}
          reloadList={async () => await getDocente()}
        />
      )}

      {deleteArea != null && (
        <DeleteAreaModal
          openModal={deleteArea != null}
          closeModal={() => setDeleteArea(null)}
          area={deleteArea}
          reloadList={async () => await getDocente()}
        />
      )}

      {addArea && (
        <CreateAreaModal
          openModal={addArea}
          closeModal={() => setAddArea(false)}
          docente_id={params.id ?? ''}
          reloadList={async () => await getDocente()}
        />
      )}

      {updateVinculo != null && (
        <UpdateVinculoModal
          openModal={updateVinculo != null}
          closeModal={() => setUpdateVinculo(null)}
          vinculo_id={updateVinculo.id}
          reloadList={async () => await getDocente()}
        />
      )}

      {deleteVinculo != null && (
        <DeleteVinculoModal
          openModal={deleteVinculo != null}
          closeModal={() => setDeleteVinculo(null)}
          vinculo={deleteVinculo}
          reloadList={async () => await getDocente()}
        />
      )}

      {addVinculo && (
        <CreateVinculoModal
          openModal={addVinculo}
          closeModal={() => setAddVinculo(false)}
          docente_id={params.id ?? ''}
          reloadList={async () => await getDocente()}
        />
      )}

      <Container maxWidth="xl">
        <CustomButton marginType="no-margin" sx={{ width: '300px' }} onClick={() => navigate(-1)}>
          Retornar Para a Lista
        </CustomButton>

        <SubTitleBar
          title="Informações do Docente"
          actions={
            <>
              <CustomIconButton
                iconType="custom"
                CustomIcon={<Edit sx={{ color: '#fff' }} />}
                title="Editar Informações"
                action={() => setUpdateDocente(true)}
              />
            </>
          }
        />

        <Box sx={{ padding: '0.5em' }}>
          <LabelValue label="Nome:" value={docenteInfo.nome} />

          <LabelValue label="CPF:" value={docenteInfo.cpf} />

          <LabelValue label="Contato Assesoria:" value={docenteInfo.contatoAssesoria} />

          <LabelValue label="Email Assesoria:" value={docenteInfo.emailAssesoria} />

          <LabelValue label="Lattes ID:" value={docenteInfo.lattesId} />

          <LabelValue label="Resumo:" value={docenteInfo.resumoLattes} />

          <LabelValue label="Pode falar com imprensa:" value={docenteInfo.imprensa} />

          <LabelValue label="Criado Em:" value={docenteInfo.created_at} />

          <LabelValue label="Atualizado Em:" value={docenteInfo.updated_at} />
        </Box>

        <SubTitleBar
          title="Areas de Atuacação"
          actions={
            <>
              <CustomIconButton
                iconType="custom"
                CustomIcon={<AddCircle sx={{ color: '#fff' }} />}
                title="Adicionar Area"
                action={() => setAddArea(true)}
              />
            </>
          }
        />

        <Grid container spacing={2}>
          {docenteInfo.areasAtuacao.map((area) => (
            <Grid key={area.id} item xs={12} sm={6} md={4}>
              <AreaCard>
                <LabelValue label="Grande Area:" value={area.grandeArea} />

                <LabelValue label="Area de Conhecimento:" value={area.areaConhecimento} />

                <LabelValue label="Sub Area:" value={area.subArea ?? ''} />

                <LabelValue label="Especialidade:" value={area.especialidade ?? ''} />

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomButton
                    marginType="no-margin"
                    onClick={() => setUpdateArea({ id: area.id })}
                  >
                    Editar
                  </CustomButton>

                  <CustomButton
                    marginType="left-margin"
                    customColor="#aa0000"
                    onClick={() =>
                      setDeleteArea({
                        id: area.id,
                        nome: `${area.grandeArea}/${area.areaConhecimento}/${area.subArea}/${area.especialidade}`,
                      })
                    }
                  >
                    Deletar
                  </CustomButton>
                </Box>
              </AreaCard>
            </Grid>
          ))}
        </Grid>

        <SubTitleBar
          title="Vinculos"
          actions={
            <>
              <CustomIconButton
                iconType="custom"
                CustomIcon={<AddCircle sx={{ color: '#fff' }} />}
                title="Adicionar Vinculo"
                action={() => setAddVinculo(true)}
              />
            </>
          }
        />

        <Grid container spacing={2}>
          {docenteInfo.vinculos.map((vinculo) => (
            <Grid key={vinculo.id} item xs={12} sm={6} md={4}>
              <AreaCard>
                <LabelValue label="Periodo:" value={vinculo.periodo.nome} />

                <LabelValue label="Unidade:" value={vinculo.unidadeUnasp.nome} />

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomButton
                    marginType="no-margin"
                    onClick={() => setUpdateVinculo({ id: vinculo.id })}
                  >
                    Editar
                  </CustomButton>

                  <CustomButton
                    marginType="left-margin"
                    customColor="#aa0000"
                    onClick={() =>
                      setDeleteVinculo({
                        id: vinculo.id,
                        nome: `${vinculo.periodo.nome}/${vinculo.unidadeUnasp.nome}`,
                      })
                    }
                  >
                    Deletar
                  </CustomButton>
                </Box>
              </AreaCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
