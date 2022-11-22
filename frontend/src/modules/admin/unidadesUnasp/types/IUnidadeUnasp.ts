import { ICommonApi } from '#shared/types/ICommonApi';

export type IUnidadeUnasp = ICommonApi & { nome: string };

export interface IUnidadeUnaspFilters {
  nome: string;
  min_updated: Date | null;
  max_updated: Date | null;
}

export interface IUnidadeUnaspInput {
  nome: string;
}
