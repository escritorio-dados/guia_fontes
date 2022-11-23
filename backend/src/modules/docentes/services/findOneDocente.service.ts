import { Injectable } from '@nestjs/common';

import { AppError } from '@shared/errors/AppError';

import { docenteErrors } from '../errors/docente.errors';
import { DocentesRepository } from '../repositories/docentes.repository';
import { CommonDocenteService } from './commonDocente.service';

@Injectable()
export class FindOneDocenteService {
  constructor(
    private readonly commonDocenteService: CommonDocenteService,
    private readonly docentesRepository: DocentesRepository,
  ) {}

  async getDocente(id: string) {
    const docente = await this.commonDocenteService.getDocente({
      id,
    });

    return docente;
  }

  async getPublic(id: string) {
    const docente = await this.docentesRepository.findByIdPublic(id);

    if (docente == null) {
      throw new AppError(docenteErrors.notFound);
    }

    return docente;
  }

  async getInfo(id: string) {
    const docente = await this.commonDocenteService.getDocente({
      id,
      relations: ['areasAtuacao', 'vinculos.unidadeUnasp', 'vinculos.periodo'],
    });

    return docente;
  }
}
