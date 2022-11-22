import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';

import { IParamId } from '@shared/types/params';

import { CreateVinculoDto } from '../dtos/createVinculo.dto';
import { UpdateVinculoDto } from '../dtos/updateVinculo.dto';
import { CreateVinculoService } from '../services/createVinculo.service';
import { DeleteVinculoService } from '../services/deleteVinculo.service';
import { FindOneVinculoService } from '../services/findOneVinculo.service';
import { UpdateVinculoService } from '../services/updateVinculo.service';

@Controller('vinculos')
export class VinculosController {
  constructor(
    private readonly findOneVinculoService: FindOneVinculoService,
    private readonly createVinculoService: CreateVinculoService,
    private readonly updateVinculoService: UpdateVinculoService,
    private readonly deleteVinculoService: DeleteVinculoService,
  ) {}

  @Get(':id')
  async getVinculo(@Param() { id }: IParamId) {
    return await this.findOneVinculoService.getInfo(id);
  }

  @Post()
  async createVinculo(@Body() input: CreateVinculoDto) {
    return await this.createVinculoService.execute(input);
  }

  @Put(':id')
  async updateVinculo(@Param() { id }: IParamId, @Body() input: UpdateVinculoDto) {
    return await this.updateVinculoService.execute({ id, ...input });
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteVinculo(@Param() { id }: IParamId) {
    await this.deleteVinculoService.execute(id);
  }
}
