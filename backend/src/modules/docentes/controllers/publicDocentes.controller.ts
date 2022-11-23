import { Controller, Get, Param, Query } from '@nestjs/common';

import { Public } from '@shared/providers/auth/decorators/public.decorator';
import { IParamId } from '@shared/types/params';

import { FindPublicDocentesQuery } from '../query/findPublic.docentes.query';
import { FindAllDocenteService } from '../services/findAllDocente.service';
import { FindOneDocenteService } from '../services/findOneDocente.service';

@Public()
@Controller('public/docentes')
export class PublicDocentesController {
  constructor(
    private readonly findAllDocenteService: FindAllDocenteService,
    private readonly findOneDocenteService: FindOneDocenteService,
  ) {}

  @Get()
  async findSearch(@Query() query: FindPublicDocentesQuery) {
    return await this.findAllDocenteService.findPublicSearch(query);
  }

  @Get(':id')
  async get(@Param() { id }: IParamId) {
    return await this.findOneDocenteService.getPublic(id);
  }
}
