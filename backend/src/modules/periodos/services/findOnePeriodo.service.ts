import { Injectable } from '@nestjs/common';

import { CommonPeriodoService } from './commonPeriodo.service';

@Injectable()
export class FindOnePeriodoService {
  constructor(private readonly commonPeriodoService: CommonPeriodoService) {}

  async execute(id: string) {
    const periodo = await this.commonPeriodoService.getPeriodo({ id });

    return periodo;
  }
}
