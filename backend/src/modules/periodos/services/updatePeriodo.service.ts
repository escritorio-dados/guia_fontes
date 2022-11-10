import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { PeriodoDto } from '../dtos/periodo.dto';
import { PeriodosRepository } from '../repositories/periodos.repository';
import { CommonPeriodoService } from './commonPeriodo.service';

type IUpdatePeriodo = PeriodoDto & { id: string };

@Injectable()
export class UpdatePeriodoService {
  constructor(
    private readonly periodosRepository: PeriodosRepository,
    private readonly commonPeriodoService: CommonPeriodoService,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute({ id, nome, atual }: IUpdatePeriodo) {
    const periodo = await this.commonPeriodoService.getPeriodo({
      id,
    });

    if (periodo.nome !== nome) {
      await this.commonPeriodoService.validateNome(nome);
    }

    periodo.nome = nome;

    return await this.dataSource.transaction(async (manager) => {
      // Validando Mudanças do periodo atual
      if (atual !== periodo.atual) {
        const periodoAtual = await this.periodosRepository.findAtual();

        if (atual === true && periodoAtual != null) {
          periodoAtual.atual = false;

          await this.periodosRepository.save(periodoAtual, manager);
        }

        periodo.atual = atual === true;
      }

      return await this.periodosRepository.save(periodo, manager);
    });
  }
}
