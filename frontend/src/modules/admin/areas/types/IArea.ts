import { ICommonApi } from '#shared/types/ICommonApi';

export type IArea = ICommonApi & {
  areaConhecimento: string;
  grandeArea: string;
  subArea?: string;
  especialidade?: string;
};
