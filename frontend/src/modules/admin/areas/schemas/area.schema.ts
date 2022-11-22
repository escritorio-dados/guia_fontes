import * as yup from 'yup';

export interface IAreaSchema {
  areaConhecimento: string;
  grandeArea: string;
  subArea?: string;
  especialidade?: string;
}

export const areaSchema = yup.object().shape({
  areaConhecimento: yup.string().required('A area de conhecimento é obrigatória'),
  grandeArea: yup.string().required('A grande area é obrigatória'),
});
