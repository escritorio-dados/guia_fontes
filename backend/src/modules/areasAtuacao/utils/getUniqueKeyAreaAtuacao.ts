import { AreaAtuacao } from '../entities/AreaAtuacao';

export function getAreaAtuacaoUniqueKey(area: Partial<AreaAtuacao>, includeDocente?: boolean) {
  const key = `${area.areaConhecimento}_${area.grandeArea}_${area.especialidade}_${area.subArea}`;

  if (includeDocente === true) {
    const docente_id = area.docente != null ? area.docente.id : area.docente_id;

    return `${key}_${docente_id}`;
  }

  return key;
}
