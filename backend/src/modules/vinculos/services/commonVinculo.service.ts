import { Injectable } from '@nestjs/common';

import { AppError } from '@shared/errors/AppError';

import { vinculoErrors } from '../errors/vinculo.errors';
import { VinculosRepository } from '../repositories/vinculos.repository';

interface IGetVinculo {
  id: string;
  relations?: string[];
}

interface ICheckVinculo {
  docente_id: string;
  periodo_id: string;
  unidade_id: string;
}

@Injectable()
export class CommonVinculoService {
  constructor(private readonly vinculosRepository: VinculosRepository) {}

  async checkVinculo(where: ICheckVinculo, id?: string) {
    const vinculo = await this.vinculosRepository.findDuplicate(where);

    if (vinculo != null) {
      if (id != null && vinculo.id !== id) {
        throw new AppError(vinculoErrors.duplicate);
      } else if (id == null) {
        throw new AppError(vinculoErrors.duplicate);
      }
    }

    return vinculo;
  }

  async getVinculo({ id, relations }: IGetVinculo) {
    const vinculo = await this.vinculosRepository.findById(id, relations);

    if (vinculo == null) {
      throw new AppError(vinculoErrors.notFound);
    }

    return vinculo;
  }
}
