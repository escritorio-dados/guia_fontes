import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CustomButton } from '#shared/components/CustomButton';
import { CustomDialog } from '#shared/components/CustomDialog';
import { CustomIconButton } from '#shared/components/CustomIconButton';
import { FormCheckbox } from '#shared/components/form/FormCheck';
import { FormTextField } from '#shared/components/form/FormTextField';
import { SubTitleBar } from '#shared/components/info/SubTitleBar';
import { CustomSelectAsync } from '#shared/components/inputs/CustomSelectAsync';
import { useToast } from '#shared/hooks/toast';
import { useGet, usePost } from '#shared/services/useAxios';
import { limitedSize } from '#shared/types/ICommonApi';
import { IReloadModal } from '#shared/types/IModal';
import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { IPeriodo } from '#modules/admin/periodos/types/IPeriodo';
import { IUnidadeUnasp } from '#modules/admin/unidadesUnasp/types/IUnidadeUnasp';

import { IDocenteSchema, docenteSchema } from '../../schemas/docente.schema';
import { IDocente } from '../../types/IDocente';

interface IVinculo {
  id: string;
  periodo: IPeriodo;
  unidadeUnasp: IUnidadeUnasp;
}

interface IVinculosMap {
  [key: string]: IVinculo;
}

export function CreateDocenteModal({ closeModal, openModal, reloadList }: IReloadModal) {
  const [periodo, setPeriodo] = useState<IPeriodo | null>(null);
  const [unidade, setUnidade] = useState<IUnidadeUnasp | null>(null);
  const [vinculos, setVinculos] = useState<IVinculosMap>({});
  const [xml, setXml] = useState<FileList | null>(null);

  const { toast } = useToast();

  const { send: createDocente } = usePost<IDocente, any>('docentes/xml');

  const {
    data: periodosData,
    error: periodosError,
    send: getPeriodos,
  } = useGet<IPeriodo[]>({
    url: '/periodos/limited',
    lazy: true,
  });

  const {
    data: unidadesData,
    error: unidadesError,
    send: getUnidades,
  } = useGet<IUnidadeUnasp[]>({
    url: '/unidades_unasp/limited',
    lazy: true,
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IDocenteSchema>({
    resolver: yupResolver(docenteSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (periodosError != null) {
      toast({ message: periodosError, severity: 'error' });

      return;
    }

    if (unidadesError != null) {
      toast({ message: unidadesError, severity: 'error' });
    }
  }, [toast, periodosError, unidadesError]);

  const onSubmit = useCallback(
    async (input: IDocenteSchema) => {
      const fixedInput = removeEmptyFields(input);

      const formData = new FormData();

      formData.append('nome', fixedInput.nome);

      if (fixedInput.cpf != null) {
        formData.append('cpf', fixedInput.cpf);
      }

      if (fixedInput.contato_assesoria != null) {
        formData.append('contato_assesoria', fixedInput.contato_assesoria);
      }

      if (fixedInput.email_assesoria != null) {
        formData.append('email_assesoria', fixedInput.email_assesoria);
      }

      if (fixedInput.imprensa === true) {
        formData.append('imprensa', 'true');
      }

      Object.values(vinculos).forEach((vinculo, index) => {
        formData.append(`vinculos[${index}][unidade_id]`, vinculo.unidadeUnasp.id);
        formData.append(`vinculos[${index}][periodo_id]`, vinculo.periodo.id);
      });

      if (xml != null) {
        const file = xml[0];

        formData.append('xml', file);
      }

      const { error: createError } = await createDocente(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (createError != null) {
        toast({ message: createError, severity: 'error' });

        return;
      }

      toast({ message: 'docente criado', severity: 'success' });

      reloadList();

      closeModal();
    },
    [closeModal, createDocente, reloadList, toast, vinculos, xml],
  );

  const addVinculo = useCallback(() => {
    if (unidade == null || periodo == null) {
      return;
    }

    const key = `${unidade.id}_${periodo.id}`;

    setVinculos((old) => ({
      ...old,
      [key]: {
        periodo,
        unidadeUnasp: unidade,
        id: key,
      },
    }));
  }, [periodo, unidade]);

  const removeVinculo = useCallback((id: string) => {
    setVinculos((old) => {
      const newData = { ...old };

      delete newData[id];

      return newData;
    });
  }, []);

  return (
    <>
      <CustomDialog
        open={openModal}
        closeModal={closeModal}
        title="Cadastrar docente"
        maxWidth="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <SubTitleBar title="Informações do Docente" sx={{ mt: 0 }} />

          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <FormTextField
                name="nome"
                label="Nome"
                control={control}
                errors={errors.nome}
                marginType="no-margin"
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormTextField
                name="contato_assesoria"
                label="Contato Assesoria"
                control={control}
                errors={errors.contato_assesoria}
                marginType="no-margin"
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormTextField
                name="email_assesoria"
                label="Email Assesoria"
                control={control}
                errors={errors.email_assesoria}
                marginType="no-margin"
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormTextField
                name="cpf"
                label="CPF"
                control={control}
                errors={errors.cpf}
                marginType="no-margin"
              />
            </Grid>

            <Grid item sm={6} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomButton
                  customColor="#032860"
                  component="label"
                  marginType="no-margin"
                  sx={{ mr: '0.5rem', background: '#032860', width: '120px' }}
                >
                  Upload XML
                  <input
                    hidden
                    accept=".xml"
                    type="file"
                    onChange={(event) => setXml(event.target.files)}
                  />
                </CustomButton>

                {xml != null ? (
                  <Typography>Arquivo Selecionado: {xml[0].name}</Typography>
                ) : (
                  <Typography>Nenhum Arquivo Selecionado</Typography>
                )}
              </Box>
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormCheckbox name="imprensa" label="Falar Com Imprensa" control={control} />
            </Grid>
          </Grid>

          <SubTitleBar title="Vinculos com Unasp" />

          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <CustomSelectAsync
                label="Unidade"
                options={unidadesData ?? []}
                optionLabel="nome"
                optionValue="id"
                value={unidade}
                onChange={(newValue) => setUnidade(newValue)}
                marginType="no-margin"
                handleOpen={async () => await getUnidades()}
                handleFilter={async (params) => await getUnidades(params)}
                limitFilter={limitedSize}
                filterField="nome"
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <Grid container spacing={0}>
                <Grid item xs={10}>
                  <CustomSelectAsync
                    label="Periodo"
                    options={periodosData ?? []}
                    optionLabel="nome"
                    optionValue="id"
                    value={periodo}
                    onChange={(newValue) => setPeriodo(newValue)}
                    marginType="no-margin"
                    handleOpen={async () => await getPeriodos()}
                    handleFilter={async (params) => await getPeriodos(params)}
                    limitFilter={limitedSize}
                    filterField="nome"
                  />
                </Grid>

                <Grid
                  item
                  xs={2}
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <CustomIconButton title="Adicionar" action={addVinculo} iconType="add" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ maxHeight: '400px', overflow: 'auto', mt: '0.5rem' }}>
            {Object.values(vinculos).map((vinculo) => (
              <Grid item xs={12} sm={4} key={vinculo.id}>
                <Box
                  sx={{
                    padding: '0.5rem',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #333',
                  }}
                >
                  <Box>
                    <Typography>{vinculo.unidadeUnasp.nome}</Typography>

                    <Typography component="span">{vinculo.periodo.nome}</Typography>
                  </Box>

                  <CustomIconButton
                    sx={{ marginLeft: 'auto' }}
                    title="Remover"
                    action={() => removeVinculo(vinculo.id)}
                    iconType="delete"
                    size="small"
                    iconSize="small"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          <CustomButton type="submit">Cadastrar</CustomButton>
        </form>
      </CustomDialog>
    </>
  );
}
