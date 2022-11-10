import { ICommonApi } from '#shared/types/ICommonApi';

export type IPeriodo = ICommonApi & { nome: string; atual: boolean };

export interface IPeriodoFilters {
  nome: string;
  atual: boolean;
  min_updated: Date | null;
  max_updated: Date | null;
}

export interface IPeriodoInput {
  nome: string;
  atual?: boolean;
}
