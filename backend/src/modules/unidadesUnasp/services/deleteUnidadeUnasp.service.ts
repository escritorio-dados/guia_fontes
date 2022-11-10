import { Injectable } from '@nestjs/common';

import { AppError } from '@shared/errors/AppError';

import { unidadeUnaspErrors } from '../errors/unidadeUnasp.errors';
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
      relations: ['vinculos'],
    });

    if (unidadeUnasp.vinculos?.length > 0) {
      throw new AppError(unidadeUnaspErrors.deleteWithVinculos);
    }

    await this.unidadesUnaspRepository.delete(unidadeUnasp);
  }
}
