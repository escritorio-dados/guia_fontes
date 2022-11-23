export interface IDocentePublic {
  id: string;
  nome: string;
  imprensa: boolean;
  lattesId?: string;
  resumoLattes?: string;
  contatoAssesoria?: string;
  areasAtuacao: Array<{
    id: string;
    areaConhecimento: string;
    grandeArea: string;
    subArea: string;
    especialidade: string;
  }>;
  vinculos: Array<{
    id: string;
    unidadeUnasp: {
      nome: string;
    };
  }>;
}

export interface IDocenteFilters {
  query: string;
  imprensa: boolean;
}
