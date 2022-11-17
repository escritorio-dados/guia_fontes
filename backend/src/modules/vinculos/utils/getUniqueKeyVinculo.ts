import { Vinculo } from '../entities/Vinculo';

export function getVinculoUniqueKey(vinculo: Partial<Vinculo>) {
  const docente_id = vinculo.docente != null ? vinculo.docente.id : vinculo.docente_id;
  const periodo_id = vinculo.periodo != null ? vinculo.periodo.id : vinculo.periodo_id;
  const unidade_id = vinculo.unidadeUnasp != null ? vinculo.unidadeUnasp.id : vinculo.unidade_id;

  return `${docente_id}_${periodo_id}_${unidade_id}`;
}
