import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { XMLParser } from 'fast-xml-parser';
import { DataSource } from 'typeorm';
import { TextDecoder } from 'util';

import {
  CreateAreaAtuacaoService,
  ICreateAreaAtuacaoXml,
} from '@modules/areasAtuacao/services/createAreaAtuacao.service';
import { CreateVinculoService } from '@modules/vinculos/services/createVinculo.service';

import { CreateDocentesXmlDto } from '../dtos/createDocentesXml.dto';
import { DocentesRepository } from '../repositories/docentes.repository';
import { CommonDocenteService } from './commonDocente.service';

interface ICreateXmlDocente {
  body: CreateDocentesXmlDto;
  xml: Express.Multer.File;
}

interface IAreaAtuacaoXml {
  'atr_NOME-GRANDE-AREA-DO-CONHECIMENTO': string;
  'atr_NOME-DA-AREA-DO-CONHECIMENTO': string;
  'atr_NOME-DA-SUB-AREA-DO-CONHECIMENTO'?: string;
  'atr_NOME-DA-ESPECIALIDADE'?: string;
}

interface IDocenteXml {
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

@Injectable()
export class CreateDocenteService {
  constructor(
    private readonly docentesRepository: DocentesRepository,
    private readonly commonDocenteService: CommonDocenteService,

    private readonly createAreaAtuacaoService: CreateAreaAtuacaoService,
    private readonly createVinculoService: CreateVinculoService,

    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async createXml({ body, xml }: ICreateXmlDocente) {
    // Coletando As informações do Lattes
    const xmlParser = new XMLParser({
      attributeNamePrefix: 'atr_',
      ignoreAttributes: false,
      allowBooleanAttributes: true,
    });

    const xmlPreParsed: IDocenteXml = xmlParser.parse(xml.buffer);

    const encoding = xmlPreParsed['?xml']?.atr_encoding?.toLowerCase() ?? 'iso-8859-1';

    const xmlStringDecoded = new TextDecoder(encoding).decode(xml.buffer);

    const xmlParsed: IDocenteXml = xmlParser.parse(xmlStringDecoded);

    const resumoLattes =
      xmlParsed['CURRICULO-VITAE']['DADOS-GERAIS']['RESUMO-CV']?.['atr_TEXTO-RESUMO-CV-RH'];

    const areasXml =
      xmlParsed['CURRICULO-VITAE']['DADOS-GERAIS']['AREAS-DE-ATUACAO']?.['AREA-DE-ATUACAO'];

    const { imprensa, lattes_id, nome, vinculos } = body;

    return await this.dataSource.transaction(async (manager) => {
      await this.commonDocenteService.validateLattes(lattes_id);

      const docente = await this.docentesRepository.create(
        {
          imprensa,
          lattesId: lattes_id,
          nome,
          resumoLattes,
        },
        manager,
      );

      if (areasXml != null) {
        const areasAtuacao: ICreateAreaAtuacaoXml[] = [];

        if (Array.isArray(areasXml)) {
          areasAtuacao.push(
            ...areasXml.map((areaXml) => ({
              docente,
              grandeArea: areaXml['atr_NOME-GRANDE-AREA-DO-CONHECIMENTO']
                .toLowerCase()
                .replaceAll('_', ' '),
              areaConhecimento: areaXml['atr_NOME-DA-AREA-DO-CONHECIMENTO'],
              especialidade: areaXml['atr_NOME-DA-ESPECIALIDADE'],
              subArea: areaXml['atr_NOME-DA-SUB-AREA-DO-CONHECIMENTO'],
            })),
          );
        } else {
          areasAtuacao.push({
            docente,
            grandeArea: areasXml['atr_NOME-GRANDE-AREA-DO-CONHECIMENTO']
              .toLowerCase()
              .replaceAll('_', ' '),
            areaConhecimento: areasXml['atr_NOME-DA-AREA-DO-CONHECIMENTO'],
            especialidade: areasXml['atr_NOME-DA-ESPECIALIDADE'],
            subArea: areasXml['atr_NOME-DA-SUB-AREA-DO-CONHECIMENTO'],
          });
        }

        docente.areasAtuacao = await this.createAreaAtuacaoService.createManyFromXml(
          areasAtuacao,
          manager,
        );
      }

      docente.vinculos = await this.createVinculoService.createManyFromXml(
        vinculos.map((vinculo) => ({ ...vinculo, docente })),
        manager,
      );

      return docente;
    });
  }
}
