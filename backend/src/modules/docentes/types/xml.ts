export interface IAreaAtuacaoXml {
  'atr_NOME-GRANDE-AREA-DO-CONHECIMENTO': string;
  'atr_NOME-DA-AREA-DO-CONHECIMENTO': string;
  'atr_NOME-DA-SUB-AREA-DO-CONHECIMENTO'?: string;
  'atr_NOME-DA-ESPECIALIDADE'?: string;
}

export interface IDocenteXml {
  '?xml'?: { atr_encoding?: string };
  'CURRICULO-VITAE': {
    'atr_NUMERO-IDENTIFICADOR'?: string;
    'DADOS-GERAIS': {
      'RESUMO-CV'?: {
        'atr_TEXTO-RESUMO-CV-RH': string;
      };
      'AREAS-DE-ATUACAO'?: {
        'AREA-DE-ATUACAO': IAreaAtuacaoXml | IAreaAtuacaoXml[];
      };
    };
  };
}
