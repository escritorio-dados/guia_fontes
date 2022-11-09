import { Injectable } from '@nestjs/common';

import { UnidadesUnaspRepository } from '../repositories/unidadesUnasp.repository';
import { CommonUnidadeUnaspService } from './commonUnidadeUnasp.service';

@Injectable()
export class DeleteUnidadeUnaspService {
  constructor(
    private readonly unidadesUnaspRepository: UnidadesUnaspRepository,
    private readonly commonUnidadeUnaspService: CommonUnidadeUnaspService,
  ) {}

  async execute(id: string) {
    const unidadeUnasp = await this.commonUnidadeUnaspService.getUnidadeUnasp({
      id,
    });

    await this.unidadesUnaspRepository.delete(unidadeUnasp);
  }
}
