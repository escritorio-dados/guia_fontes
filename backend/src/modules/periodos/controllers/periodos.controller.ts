import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';

import { IParamId } from '@shared/types/params';

import { PeriodoDto } from '../dtos/periodo.dto';
import { FindAllLimitedPeriodosQuery } from '../query/findAllLimited.periodos.query';
import { FindPaginationPeriodosQuery } from '../query/findPagination.periodos.query';
import { CreatePeriodoService } from '../services/createPeriodo.service';
import { DeletePeriodoService } from '../services/deletePeriodo.service';
import { FindAllPeriodoService } from '../services/findAllPeriodo.service';
import { FindOnePeriodoService } from '../services/findOnePeriodo.service';
import { UpdatePeriodoService } from '../services/updatePeriodo.service';

@Controller('periodos')
export class PeriodosController {
  constructor(
    private readonly findAllPeriodoService: FindAllPeriodoService,
    private readonly findOnePeriodoService: FindOnePeriodoService,
    private readonly createPeriodoService: CreatePeriodoService,
    private readonly updatePeriodoService: UpdatePeriodoService,
    private readonly deletePeriodoService: DeletePeriodoService,
  ) {}

  @Get()
  async listPaginationPeriodos(@Query() query: FindPaginationPeriodosQuery) {
    return await this.findAllPeriodoService.findAllPagination(query);
  }

  @Get('/limited')
  async listLimitedPeriodos(@Query() query: FindAllLimitedPeriodosQuery) {
    return await this.findAllPeriodoService.findAllLimited(query);
  }

  @Get(':id')
  async getPeriodo(@Param() { id }: IParamId) {
    return await this.findOnePeriodoService.execute(id);
  }

  @Post()
  async createPeriodo(@Body() input: PeriodoDto) {
    return await this.createPeriodoService.execute(input);
  }

  @Put(':id')
  async updatePeriodo(@Param() { id }: IParamId, @Body() input: PeriodoDto) {
    return await this.updatePeriodoService.execute({ id, ...input });
  }

  @HttpCode(204)
  @Delete(':id')
  async deletePeriodo(@Param() { id }: IParamId) {
    await this.deletePeriodoService.execute(id);
  }
}
