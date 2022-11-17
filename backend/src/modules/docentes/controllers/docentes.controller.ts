import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { AppError } from '@shared/errors/AppError';
import { IParamId } from '@shared/types/params';

import { CreateDocentesXmlDto } from '../dtos/createDocentesXml.dto';
import { FindPaginationDocentesQuery } from '../query/findPagination.docentes.query';
import { CreateDocenteService } from '../services/createDocente.service';
import { FindAllDocenteService } from '../services/findAllDocente.service';
import { FindOneDocenteService } from '../services/findOneDocente.service';

@Controller('docentes')
export class DocentesController {
  constructor(
    private readonly createDocenteService: CreateDocenteService,
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
  @UseInterceptors(
    FileInterceptor('xml', {
      fileFilter: (_, file, callBack) => {
        if (file.mimetype !== 'application/xml') {
          callBack(new AppError('Somente arquivos xml são aceitos'), false);
        }

        callBack(null, true);
      },
    }),
  )
  async createDocente(
    @UploadedFile() xml: Express.Multer.File,
    @Body() body: CreateDocentesXmlDto,
  ) {
    return await this.createDocenteService.createXml({ xml, body });
  }
}
