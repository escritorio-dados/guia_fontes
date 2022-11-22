import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';

import { IParamId } from '@shared/types/params';

import { CreateAreaAtuacaoDto } from '../dtos/createAreaAtuacao.dto';
import { UpdateAreaAtuacaoDto } from '../dtos/updateAreaAtuacao.dto';
import { CreateAreaAtuacaoService } from '../services/createAreaAtuacao.service';
import { DeleteAreaAtuacaoService } from '../services/deleteAreaAtuacao.service';
import { FindOneAreaAtuacaoService } from '../services/findOneAreaAtuacao.service';
import { UpdateAreaAtuacaoService } from '../services/updateAreaAtuacao.service';

@Controller('areas_atuacao')
export class AreasAtuacaoController {
  constructor(
    private readonly findOneAreaAtuacaoService: FindOneAreaAtuacaoService,
    private readonly createAreaAtuacaoService: CreateAreaAtuacaoService,
    private readonly updateAreaAtuacaoService: UpdateAreaAtuacaoService,
    private readonly deleteAreaAtuacaoService: DeleteAreaAtuacaoService,
  ) {}

  @Get(':id')
  async getAreaAtuacao(@Param() { id }: IParamId) {
    return await this.findOneAreaAtuacaoService.execute(id);
  }

  @Post()
  async createAreaAtuacao(@Body() input: CreateAreaAtuacaoDto) {
    return await this.createAreaAtuacaoService.execute(input);
  }

  @Put(':id')
  async updateAreaAtuacao(@Param() { id }: IParamId, @Body() input: UpdateAreaAtuacaoDto) {
    return await this.updateAreaAtuacaoService.execute({ id, ...input });
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteAreaAtuacao(@Param() { id }: IParamId) {
    await this.deleteAreaAtuacaoService.execute(id);
  }
}
