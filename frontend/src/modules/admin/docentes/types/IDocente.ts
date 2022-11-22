import { ICommonApi } from '#shared/types/ICommonApi';

import { IArea } from '#modules/admin/areas/types/IArea';
import { IVinculo } from '#modules/admin/vinculos/types/IVinculo';

export type IDocente = ICommonApi & {
  nome: string;
  imprensa: boolean;
  lattesId?: string;
  cpf?: string;
  contatoAssesoria?: string;
  resumoLattes?: string;
  areasAtuacao: IArea[];
  vinculos: IVinculo[];
};

export interface IDocenteFilters {
  nome: string;
  imprensa: boolean;
  area: string;
  lattes_id: string;
  cpf: string;
  contato_assesoria: string;
  periodo: { id: string; nome: string } | null;
  unidade: { id: string; nome: string } | null;
  min_updated: Date | null;
  max_updated: Date | null;
}

export interface IDocenteFiltersAPI {
  nome: string;
  imprensa: boolean;
  area: string;
  lattes_id: string;
  cpf: string;
  contato_assesoria: string;
  periodo_id: string;
  unidade_id: string;
  min_updated: Date | null;
  max_updated: Date | null;
}
