import { Injectable } from '@nestjs/common';

import { UpdateAreaAtuacaoDto } from '../dtos/updateAreaAtuacao.dto';
import { AreasAtuacaoRepository } from '../repositories/areasAtuacao.repository';
import { CommonAreaAtuacaoService } from './commonAreaAtuacao.service';

type IUpdateAreaAtuacao = UpdateAreaAtuacaoDto & { id: string };

@Injectable()
export class UpdateAreaAtuacaoService {
  constructor(
    private readonly areasAtuacaoRepository: AreasAtuacaoRepository,
    private readonly commonAreaAtuacaoService: CommonAreaAtuacaoService,
  ) {}

  async execute({ id, areaConhecimento, especialidade, grandeArea, subArea }: IUpdateAreaAtuacao) {
    const areaAtuacao = await this.commonAreaAtuacaoService.getAreaAtuacao({
      id,
    });

    areaAtuacao.areaConhecimento = areaConhecimento;
    areaAtuacao.especialidade = especialidade ?? null;
    areaAtuacao.grandeArea = grandeArea;
    areaAtuacao.subArea = subArea ?? null;

    return await this.areasAtuacaoRepository.save(areaAtuacao);
  }
}
