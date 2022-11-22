import { Injectable } from '@nestjs/common';

import { CommonAreaAtuacaoService } from './commonAreaAtuacao.service';

@Injectable()
export class FindOneAreaAtuacaoService {
  constructor(private readonly commonAreaAtuacaoService: CommonAreaAtuacaoService) {}

  async execute(id: string) {
    const periodo = await this.commonAreaAtuacaoService.getAreaAtuacao({ id });

    return periodo;
  }
}
