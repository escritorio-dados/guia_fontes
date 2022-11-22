import { Injectable } from '@nestjs/common';

import { AppError } from '@shared/errors/AppError';

import { areaAtuacaoErrors } from '../errors/areaAtuacao.errors';
import { AreasAtuacaoRepository } from '../repositories/areasAtuacao.repository';

interface IGetAreaAtuacao {
  id: string;
  relations?: string[];
}

@Injectable()
export class CommonAreaAtuacaoService {
  constructor(private readonly areasAtuacaoRepository: AreasAtuacaoRepository) {}

  async getAreaAtuacao({ id, relations }: IGetAreaAtuacao) {
    const areaAtuacao = await this.areasAtuacaoRepository.findById(id, relations);

    if (areaAtuacao == null) {
      throw new AppError(areaAtuacaoErrors.notFound);
    }

    return areaAtuacao;
  }
}
