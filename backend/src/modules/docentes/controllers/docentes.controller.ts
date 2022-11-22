import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { IParamId } from '@shared/types/params';

import { CreateDocentesXmlDto } from '../dtos/createDocentesXml.dto';
import { UpdateDocenteDto } from '../dtos/updateDocente.dto';
import { FindPaginationDocentesQuery } from '../query/findPagination.docentes.query';
import { CreateDocenteService } from '../services/createDocente.service';
import { DeleteDocenteService } from '../services/deleteDocente.service';
import { FindAllDocenteService } from '../services/findAllDocente.service';
import { FindOneDocenteService } from '../services/findOneDocente.service';
import { UpdateDocenteService } from '../services/updateDocente.service';

@Controller('docentes')
export class DocentesController {
  constructor(
    private readonly createDocenteService: CreateDocenteService,
    private readonly updateDocenteService: UpdateDocenteService,
    private readonly deleteDocenteService: DeleteDocenteService,
    private readonly findAllDocenteService: FindAllDocenteService,
    private readonly findOneDocenteService: FindOneDocenteService,
  ) {}

  @Get()
  async listPaginationDocentes(@Query() query: FindPaginationDocentesQuery) {
    return await this.findAllDocenteService.findAllPagination(query);
  }

  @Get(':id')
  async getDocente(@Param() { id }: IParamId) {
    return await this.findOneDocenteService.getInfo(id);
  }

  @Post('/xml')
  @UseInterceptors(FileInterceptor('xml'))
  async createDocenteXml(
    @UploadedFile() xml: Express.Multer.File,
    @Body() body: CreateDocentesXmlDto,
  ) {
    return await this.createDocenteService.createXml({ xml, body });
  }

  @Patch('/xml/:id')
  @UseInterceptors(FileInterceptor('xml'))
  async updateDocenteXml(@UploadedFile() xml: Express.Multer.File, @Param() { id }: IParamId) {
    return await this.updateDocenteService.updateXml({ xml, id });
  }

  @Put('/:id')
  async updateDocente(@Param() { id }: IParamId, @Body() body: UpdateDocenteDto) {
    return await this.updateDocenteService.updateDocente({ ...body, id });
  }

  @HttpCode(204)
  @Delete(':id')
  async deletePeriodo(@Param() { id }: IParamId) {
    await this.deleteDocenteService.execute(id);
  }
}
