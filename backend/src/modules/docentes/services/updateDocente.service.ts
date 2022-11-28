import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { XMLParser } from 'fast-xml-parser';
import { DataSource } from 'typeorm';
import { TextDecoder } from 'util';

import { AppError } from '@shared/errors/AppError';

import {
  CreateAreaAtuacaoService,
  ICreateAreaAtuacaoXml,
} from '@modules/areasAtuacao/services/createAreaAtuacao.service';
import { DeleteAreaAtuacaoService } from '@modules/areasAtuacao/services/deleteAreaAtuacao.service';

import { UpdateDocenteDto } from '../dtos/updateDocente.dto';
import { docenteErrors } from '../errors/docente.errors';
import { DocentesRepository } from '../repositories/docentes.repository';
import { IDocenteXml } from '../types/xml';
import { CommonDocenteService } from './commonDocente.service';

interface IUpdateXmlDocente {
  id: string;
  xml: Express.Multer.File;
}

type IUpdateDocente = UpdateDocenteDto & { id: string };

@Injectable()
export class UpdateDocenteService {
  constructor(
    private readonly docentesRepository: DocentesRepository,
    private readonly commonDocenteService: CommonDocenteService,

    private readonly createAreaAtuacaoService: CreateAreaAtuacaoService,
    private readonly deleteAreaAtuacaoService: DeleteAreaAtuacaoService,

    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async updateDocente({ id, ...input }: IUpdateDocente) {
    const docente = await this.commonDocenteService.getDocente({ id });

    docente.contatoAssesoria = input.contatoAssesoria ?? null;
    docente.emailAssesoria = input.emailAssesoria ?? null;
    docente.cpf = input.cpf ?? null;
    docente.imprensa = input.imprensa;
    docente.lattesId = input.lattesId;
    docente.resumoLattes = input.resumoLattes;
    docente.nome = input.nome;

    const docenteUpdated = await this.docentesRepository.save(docente);

    return docenteUpdated;
  }

  async updateXml({ id, xml }: IUpdateXmlDocente) {
    // Coletando As informações do Lattes
    const xmlParser = new XMLParser({
      attributeNamePrefix: 'atr_',
      ignoreAttributes: false,
      allowBooleanAttributes: true,
    });

    if (xml == null) {
      throw new AppError(docenteErrors.noXml);
    }

    if (xml.mimetype !== 'application/xml' && xml.mimetype !== 'text/xml') {
      throw new AppError(docenteErrors.fileTypeIncorrect);
    }

    const xmlPreParsed: IDocenteXml = xmlParser.parse(xml.buffer);

    const encoding = xmlPreParsed['?xml']?.atr_encoding?.toLowerCase() ?? 'iso-8859-1';

    const xmlStringDecoded = new TextDecoder(encoding).decode(xml.buffer);

    const xmlParsed: IDocenteXml = xmlParser.parse(xmlStringDecoded);

    const lattesId = xmlParsed['CURRICULO-VITAE']['atr_NUMERO-IDENTIFICADOR'];

    const resumoLattes =
      xmlParsed['CURRICULO-VITAE']['DADOS-GERAIS']['RESUMO-CV']?.['atr_TEXTO-RESUMO-CV-RH'];

    const areasXml =
      xmlParsed['CURRICULO-VITAE']['DADOS-GERAIS']['AREAS-DE-ATUACAO']?.['AREA-DE-ATUACAO'];

    const docente = await this.commonDocenteService.getDocente({ id });

    docente.lattesId = lattesId;
    docente.resumoLattes = resumoLattes;

    return await this.dataSource.transaction(async (manager) => {
      await this.docentesRepository.save(docente, manager);

      await this.deleteAreaAtuacaoService.deleteAllFromDocente(docente.id);

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

      return docente;
    });
  }
}
