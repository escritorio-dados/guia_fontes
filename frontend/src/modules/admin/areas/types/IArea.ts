import { ICommonApi } from '#shared/types/ICommonApi';

export type IArea = ICommonApi & {
  areaConhecimento: string;
  grandeArea: string;
  subArea?: string;
  especialidade?: string;
};

export interface ICreateAreaInput {
  docente_id: string;
  areaConhecimento: string;
  grandeArea: string;
  subArea?: string;
  especialidade?: string;
}

export interface IUpdateAreaInput {
  areaConhecimento: string;
  grandeArea: string;
  subArea?: string;
  especialidade?: string;
}
