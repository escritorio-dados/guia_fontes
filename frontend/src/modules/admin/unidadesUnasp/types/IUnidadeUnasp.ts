import { ICommonApi } from '#shared/types/ICommonApi';

export type IUnidadeUnasp = ICommonApi & { nome: string; contatoAssesoria: string };

export interface IUnidadeUnaspFilters {
  nome: string;
  contatoAssesoria: string;
  min_updated: Date | null;
  max_updated: Date | null;
}

export interface IUnidadeUnaspInput {
  nome: string;
  contatoAssesoria?: string;
}
