import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';

import { IParamId } from '@shared/types/params';

import { UnidadeUnaspDto } from '../dtos/unidadeUnasp.dto';
import { FindAllLimitedUnidadesUnaspQuery } from '../query/findAllLimited.unidadesUnasp.query';
import { FindPaginationUnidadesUnaspQuery } from '../query/findPagination.unidadesUnasp.query';
import { CreateUnidadeUnaspService } from '../services/createUnidadeUnasp.service';
import { DeleteUnidadeUnaspService } from '../services/deleteUnidadeUnasp.service';
import { FindAllUnidadeUnaspService } from '../services/findAllUnidadeUnasp.service';
import { FindOneUnidadeUnaspService } from '../services/findOneUnidadeUnasp.service';
import { UpdateUnidadeUnaspService } from '../services/updateUnidadeUnasp.service';

@Controller('unidades_unasp')
export class UnidadesUnaspController {
  constructor(
    private readonly findAllUnidadeUnaspService: FindAllUnidadeUnaspService,
    private readonly findOneUnidadeUnaspService: FindOneUnidadeUnaspService,
    private readonly createUnidadeUnaspService: CreateUnidadeUnaspService,
    private readonly updateUnidadeUnaspService: UpdateUnidadeUnaspService,
    private readonly deleteUnidadeUnaspService: DeleteUnidadeUnaspService,
  ) {}

  @Get()
  async listPaginationUnidadesUnasp(@Query() query: FindPaginationUnidadesUnaspQuery) {
    return await this.findAllUnidadeUnaspService.findAllPagination(query);
  }

  @Get('/limited')
  async listLimitedUnidadesUnasp(@Query() query: FindAllLimitedUnidadesUnaspQuery) {
    return await this.findAllUnidadeUnaspService.findAllLimited(query);
  }

  @Get(':id')
  async getUnidadeUnasp(@Param() { id }: IParamId) {
    return await this.findOneUnidadeUnaspService.execute(id);
  }

  @Post()
  async createUnidadeUnasp(@Body() input: UnidadeUnaspDto) {
    return await this.createUnidadeUnaspService.execute(input);
  }

  @Put(':id')
  async updateUnidadeUnasp(@Param() { id }: IParamId, @Body() input: UnidadeUnaspDto) {
    return await this.updateUnidadeUnaspService.execute({ id, ...input });
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteUnidadeUnasp(@Param() { id }: IParamId) {
    await this.deleteUnidadeUnaspService.execute(id);
  }
}
