import { Injectable } from '@nestjs/common';

import { AppError } from '@shared/errors/AppError';

import { periodoErrors } from '../errors/periodo.errors';
import { PeriodosRepository } from '../repositories/periodos.repository';

interface IGetPeriodo {
  id: string;
  relations?: string[];
}

@Injectable()
export class CommonPeriodoService {
  constructor(private readonly periodosRepository: PeriodosRepository) {}

  async validateNome(nome: string) {
    const periodo = await this.periodosRepository.findByNome(nome);

    if (periodo != null) {
      throw new AppError(periodoErrors.duplicateNome);
    }
  }

  async getPeriodo({ id, relations }: IGetPeriodo) {
    const periodo = await this.periodosRepository.findById(id, relations);

    if (periodo == null) {
      throw new AppError(periodoErrors.notFound);
    }

    return periodo;
  }
}
