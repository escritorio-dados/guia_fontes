import { Injectable } from '@nestjs/common';

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
    });

    await this.periodosRepository.delete(periodo);
  }
}
