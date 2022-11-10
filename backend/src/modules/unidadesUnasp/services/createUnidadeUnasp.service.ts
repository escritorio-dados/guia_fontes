import { Injectable } from '@nestjs/common';

import { UnidadeUnaspDto } from '../dtos/unidadeUnasp.dto';
import { UnidadesUnaspRepository } from '../repositories/unidadesUnasp.repository';
import { CommonUnidadeUnaspService } from './commonUnidadeUnasp.service';

@Injectable()
export class CreateUnidadeUnaspService {
  constructor(
    private readonly unidadesUnaspRepository: UnidadesUnaspRepository,
    private readonly commonUnidadeUnaspService: CommonUnidadeUnaspService,
  ) {}

  async execute({ nome, contatoAssesoria }: UnidadeUnaspDto) {
    await this.commonUnidadeUnaspService.validateNome(nome);

    const unidadeUnasp = await this.unidadesUnaspRepository.create({
      contatoAssesoria,
      nome,
    });

    return unidadeUnasp;
  }
}