import { Injectable } from '@nestjs/common';

import { AppError } from '@shared/errors/AppError';

import { periodoErrors } from '../errors/periodo.errors';
import { PeriodosRepository } from '../repositories/periodos.repository';
import { CommonPeriodoService } from './commonPeriodo.service';

@Injectable()
export class DeletePeriodoService {
  constructor(
    private readonly periodosRepository: PeriodosRepository,
    private readonly commonPeriodoService: CommonPeriodoService,
  ) {}

  async execute(id: string) {
    const periodo = await this.commonPeriodoService.getPeriodo({
      id,
      relations: ['vinculos'],
    });

    if (periodo.vinculos.length > 0) {
      throw new AppError(periodoErrors.deleteWithVinculos);
    }

    await this.periodosRepository.delete(periodo);
  }
}
