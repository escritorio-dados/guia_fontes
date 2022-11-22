import { Injectable } from '@nestjs/common';

import { VinculosRepository } from '../repositories/vinculos.repository';
import { CommonVinculoService } from './commonVinculo.service';

@Injectable()
export class DeleteVinculoService {
  constructor(
    private readonly vinculosRepository: VinculosRepository,
    private readonly commonVinculoService: CommonVinculoService,
  ) {}

  async execute(id: string) {
    const vinculo = await this.commonVinculoService.getVinculo({
      id,
    });

    await this.vinculosRepository.delete(vinculo);
  }
}
