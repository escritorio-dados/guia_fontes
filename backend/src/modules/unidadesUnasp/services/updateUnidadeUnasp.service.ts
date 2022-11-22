import { Injectable } from '@nestjs/common';

import { UnidadeUnaspDto } from '../dtos/unidadeUnasp.dto';
import { UnidadesUnaspRepository } from '../repositories/unidadesUnasp.repository';
import { CommonUnidadeUnaspService } from './commonUnidadeUnasp.service';

type IUpdateUnidadeUnasp = UnidadeUnaspDto & { id: string };

@Injectable()
export class UpdateUnidadeUnaspService {
  constructor(
    private readonly unidadesUnaspRepository: UnidadesUnaspRepository,
    private readonly commonUnidadeUnaspService: CommonUnidadeUnaspService,
  ) {}

  async execute({ id, nome }: IUpdateUnidadeUnasp) {
    const unidadeUnasp = await this.commonUnidadeUnaspService.getUnidadeUnasp({
      id,
    });

    if (unidadeUnasp.nome !== nome) {
      await this.commonUnidadeUnaspService.validateNome(nome);
    }

    unidadeUnasp.nome = nome;

    await this.unidadesUnaspRepository.save(unidadeUnasp);

    return unidadeUnasp;
  }
}
