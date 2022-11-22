import { Injectable } from '@nestjs/common';

import { CommonVinculoService } from './commonVinculo.service';

@Injectable()
export class FindOneVinculoService {
  constructor(private readonly commonVinculoService: CommonVinculoService) {}

  async getInfo(id: string) {
    const vinculo = await this.commonVinculoService.getVinculo({
      id,
      relations: ['periodo', 'unidadeUnasp'],
    });

    return vinculo;
  }
}
