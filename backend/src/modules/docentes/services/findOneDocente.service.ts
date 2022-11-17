import { Injectable } from '@nestjs/common';

import { CommonDocenteService } from './commonDocente.service';

@Injectable()
export class FindOneDocenteService {
  constructor(private readonly commonDocenteService: CommonDocenteService) {}

  async getInfo(id: string) {
    const docente = await this.commonDocenteService.getDocente({
      id,
      relations: ['areasAtuacao', 'vinculos.unidadeUnasp', 'vinculos.periodo'],
    });

    return docente;
  }
}
