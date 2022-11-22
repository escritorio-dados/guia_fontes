import { Injectable } from '@nestjs/common';

import { AreasAtuacaoRepository } from '../repositories/areasAtuacao.repository';

@Injectable()
export class DeleteAreaAtuacaoService {
  constructor(private readonly areasAtuacaoRepository: AreasAtuacaoRepository) {}

  async deleteAllFromDocente(docente_id: string) {
    const areasAtuacao = await this.areasAtuacaoRepository.findAllByDocente(docente_id);

    await this.areasAtuacaoRepository.deleteMany(areasAtuacao);
  }
}
