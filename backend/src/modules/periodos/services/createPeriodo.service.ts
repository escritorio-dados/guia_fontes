import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { PeriodoDto } from '../dtos/periodo.dto';
import { PeriodosRepository } from '../repositories/periodos.repository';
import { CommonPeriodoService } from './commonPeriodo.service';

@Injectable()
export class CreatePeriodoService {
  constructor(
    private readonly periodosRepository: PeriodosRepository,
    private readonly commonPeriodoService: CommonPeriodoService,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute({ nome, atual }: PeriodoDto) {
    await this.commonPeriodoService.validateNome(nome);

    const periodoAtual = await this.periodosRepository.findAtual();

    if (atual === true && periodoAtual != null) {
      periodoAtual.atual = false;
    }

    return await this.dataSource.transaction(async (manager) => {
      if (atual === true && periodoAtual != null) {
        periodoAtual.atual = false;

        await this.periodosRepository.save(periodoAtual, manager);
      }

      return await this.periodosRepository.create(
        {
          atual,
          nome,
        },
        manager,
      );
    });
  }
}
