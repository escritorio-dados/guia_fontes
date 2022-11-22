import { Injectable } from '@nestjs/common';

import { FindOnePeriodoService } from '@modules/periodos/services/findOnePeriodo.service';
import { FindOneUnidadeUnaspService } from '@modules/unidadesUnasp/services/findOneUnidadeUnasp.service';

import { UpdateVinculoDto } from '../dtos/updateVinculo.dto';
import { VinculosRepository } from '../repositories/vinculos.repository';
import { CommonVinculoService } from './commonVinculo.service';

type IUpdateVinculo = UpdateVinculoDto & { id: string };

@Injectable()
export class UpdateVinculoService {
  constructor(
    private readonly vinculosRepository: VinculosRepository,
    private readonly findOnePeriodoService: FindOnePeriodoService,
    private readonly commonVinculoService: CommonVinculoService,
    private readonly findOneUnidadeUnaspService: FindOneUnidadeUnaspService,
  ) {}

  async execute({ id, periodo_id, unidade_id }: IUpdateVinculo) {
    const vinculo = await this.commonVinculoService.getVinculo({
      id,
    });

    await this.commonVinculoService.checkVinculo(
      { docente_id: vinculo.docente_id, periodo_id, unidade_id },
      vinculo.id,
    );

    vinculo.periodo = await this.findOnePeriodoService.execute(periodo_id);
    vinculo.unidadeUnasp = await this.findOneUnidadeUnaspService.execute(unidade_id);

    return await this.vinculosRepository.save(vinculo);
  }
}
