import { Injectable } from '@nestjs/common';

import { DocentesRepository } from '../repositories/docentes.repository';
import { CommonDocenteService } from './commonDocente.service';

@Injectable()
export class DeleteDocenteService {
  constructor(
    private readonly docentesRepository: DocentesRepository,
    private readonly commonDocenteService: CommonDocenteService,
  ) {}

  async execute(id: string) {
    const docente = await this.commonDocenteService.getDocente({
      id,
    });

    await this.docentesRepository.delete(docente);
  }
}
