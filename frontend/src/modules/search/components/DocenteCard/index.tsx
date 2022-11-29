import { Typography } from '@mui/material';
import { useMemo, useState } from 'react';

import { removeEmptyFields } from '#shared/utils/removeEmptyFields';

import { IDocentePublic } from '#modules/search/types/IDocente';

import { DocenteInfoModal } from '../DocenteInfoModal';
import { DocenteContainer, LabelValueBlock } from './styles';

interface IDocenteCard {
  docente: IDocentePublic;
}

export function DocenteCard({ docente }: IDocenteCard) {
  const [docenteModal, setDocenteModal] = useState(false);

  const docenteInfo = useMemo(() => {
    const areas: string[] = [];

    docente.areasAtuacao.forEach((area) => {
      const fixedArea = removeEmptyFields(area);

      const valor =
        fixedArea.especialidade ??
        fixedArea.subArea ??
        fixedArea.areaConhecimento ??
        fixedArea.grandeArea;

      areas.push(valor);
    });

    const textAreas = areas.join('; ');

    return {
      ...docente,
      unidade: docente.vinculos.map(({ unidadeUnasp }) => unidadeUnasp.nome).join('; '),
      resumo:
        docente.resumoLattes != null ? `${docente.resumoLattes.slice(0, 120)}...` : 'Sem Resumo',
      areas: textAreas.length >= 83 ? `${textAreas.slice(0, 80)}...` : textAreas,
      contatoAssesoria: docente.contatoAssesoria ?? '71 9667-1238',
      emailAssesoria: docente.emailAssesoria ?? 'ana.silveira@adventistas.org',
    };
  }, [docente]);

  return (
    <>
      {docenteModal && (
        <DocenteInfoModal
          closeModal={() => setDocenteModal(false)}
          docente_id={docente.id}
          openModal={docenteModal}
        />
      )}

      <DocenteContainer elevation={3} onClick={() => setDocenteModal(true)}>
        <LabelValueBlock>
          <Typography component="strong">Currículo Lattes: </Typography>

          {docenteInfo.lattesId != null ? (
            <Typography
              component="a"
              href={`http://lattes.cnpq.br/${docenteInfo.lattesId}`}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              {docenteInfo.lattesId}
            </Typography>
          ) : (
            <Typography>Sem lattes</Typography>
          )}
        </LabelValueBlock>

        <LabelValueBlock>
          <Typography component="strong">Nome: </Typography>

          <Typography component="span">{docenteInfo.nome}</Typography>
        </LabelValueBlock>

        <LabelValueBlock>
          <Typography component="strong">Unidade do UNASP: </Typography>

          <Typography component="span">{docenteInfo.unidade}</Typography>
        </LabelValueBlock>

        <LabelValueBlock>
          <Typography component="strong">Resumo do currículo: </Typography>

          <Typography component="span">{docenteInfo.resumo}</Typography>
        </LabelValueBlock>

        <LabelValueBlock>
          <Typography component="strong">Áreas de atuação: </Typography>

          <Typography component="span">{docenteInfo.areas}</Typography>
        </LabelValueBlock>

        <LabelValueBlock>
          <Typography component="strong">Contato da asssesoria: </Typography>

          <Typography component="span">
            {docenteInfo.contatoAssesoria}, {docenteInfo.emailAssesoria}
          </Typography>
        </LabelValueBlock>
      </DocenteContainer>
    </>
  );
}
