import { Injectable } from '@nestjs/common';

import { UpdateUnidadeUnaspDto } from '../dtos/updateUnidadeUnasp.dto';
import { UnidadesUnaspRepository } from '../repositories/unidadesUnasp.repository';
import { CommonUnidadeUnaspService } from './commonUnidadeUnasp.service';

type IUpdateUnidadeUnasp = UpdateUnidadeUnaspDto & { id: string };

@Injectable()
export class UpdateUnidadeUnaspService {
  constructor(
    private readonly unidadesUnaspRepository: UnidadesUnaspRepository,
    private readonly commonUnidadeUnaspService: CommonUnidadeUnaspService,
  ) {}

  async execute({ id, nome, contatoAssesoria }: IUpdateUnidadeUnasp) {
    const unidadeUnasp = await this.commonUnidadeUnaspService.getUnidadeUnasp({
      id,
    });

    if (unidadeUnasp.nome !== nome) {
      await this.commonUnidadeUnaspService.validateNome(nome);
    }

    unidadeUnasp.nome = nome;
    unidadeUnasp.contatoAssesoria = contatoAssesoria;

    await this.unidadesUnaspRepository.save(unidadeUnasp);

    return unidadeUnasp;
  }
}
