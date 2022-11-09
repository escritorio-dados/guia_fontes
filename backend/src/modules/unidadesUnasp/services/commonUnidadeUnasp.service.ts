import { Injectable } from '@nestjs/common';

import { AppError } from '@shared/errors/AppError';

import { unidadeUnaspErrors } from '../errors/unidadeUnasp.errors';
import { UnidadesUnaspRepository } from '../repositories/unidadesUnasp.repository';

interface IGetUnidadeUnasp {
  id: string;
  relations?: string[];
}

@Injectable()
export class CommonUnidadeUnaspService {
  constructor(private readonly unidadesUnaspRepository: UnidadesUnaspRepository) {}

  async validateNome(nome: string) {
    const unidadeUnasp = await this.unidadesUnaspRepository.findByNome(nome);

    if (unidadeUnasp != null) {
      throw new AppError(unidadeUnaspErrors.duplicateNome);
    }
  }

  async getUnidadeUnasp({ id, relations }: IGetUnidadeUnasp) {
    const unidadeUnasp = await this.unidadesUnaspRepository.findById(id, relations);

    if (unidadeUnasp == null) {
      throw new AppError(unidadeUnaspErrors.notFound);
    }

    return unidadeUnasp;
  }
}
