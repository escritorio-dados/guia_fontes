import { Injectable } from '@nestjs/common';

import { CommonUnidadeUnaspService } from './commonUnidadeUnasp.service';

@Injectable()
export class FindOneUnidadeUnaspService {
  constructor(private readonly commonUnidadeUnaspService: CommonUnidadeUnaspService) {}

  async execute(id: string) {
    const user = await this.commonUnidadeUnaspService.getUnidadeUnasp({ id });

    return user;
  }
}
