import { Injectable } from '@nestjs/common';

import { AppError } from '@shared/errors/AppError';

import { docenteErrors } from '../errors/docente.errors';
import { DocentesRepository } from '../repositories/docentes.repository';

interface IGetDocente {
  id: string;
  relations?: string[];
}

@Injectable()
export class CommonDocenteService {
  constructor(private readonly docentesRepository: DocentesRepository) {}

  async validateLattes(lattesId: string) {
    const docente = await this.docentesRepository.findByLattes(lattesId);

    if (docente != null) {
      throw new AppError(docenteErrors.duplicateLattes);
    }
  }

  async getDocente({ id, relations }: IGetDocente) {
    const docente = await this.docentesRepository.findById(id, relations);

    if (docente == null) {
      throw new AppError(docenteErrors.notFound);
    }

    return docente;
  }
}
