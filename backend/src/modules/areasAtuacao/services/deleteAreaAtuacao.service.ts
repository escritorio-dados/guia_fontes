import { Injectable } from '@nestjs/common';

import { AreasAtuacaoRepository } from '../repositories/areasAtuacao.repository';
import { CommonAreaAtuacaoService } from './commonAreaAtuacao.service';

@Injectable()
export class DeleteAreaAtuacaoService {
  constructor(
    private readonly areasAtuacaoRepository: AreasAtuacaoRepository,
    private readonly commonAreaAtuacaoService: CommonAreaAtuacaoService,
  ) {}

  async execute(id: string) {
    const areaAtuacao = await this.commonAreaAtuacaoService.getAreaAtuacao({
      id,
    });

    await this.areasAtuacaoRepository.delete(areaAtuacao);
  }

  async deleteAllFromDocente(docente_id: string) {
    const areasAtuacao = await this.areasAtuacaoRepository.findAllByDocente(docente_id);

    await this.areasAtuacaoRepository.deleteMany(areasAtuacao);
  }
}
