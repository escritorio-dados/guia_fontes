import { Injectable } from '@nestjs/common';

import { CommonDocenteService } from './commonDocente.service';

@Injectable()
export class FindOneDocenteService {
  constructor(private readonly commonDocenteService: CommonDocenteService) {}

  async getDocente(id: string) {
    const docente = await this.commonDocenteService.getDocente({
      id,
    });

    return docente;
  }

  async getInfo(id: string) {
    const docente = await this.commonDocenteService.getDocente({
      id,
      relations: ['areasAtuacao', 'vinculos.unidadeUnasp', 'vinculos.periodo'],
    });

    return docente;
  }
}
