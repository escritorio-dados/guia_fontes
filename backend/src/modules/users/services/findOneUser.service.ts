import { Injectable } from '@nestjs/common';

import { CommonUserService } from './commonUser.service';

@Injectable()
export class FindOneUserService {
  constructor(private readonly commonUserService: CommonUserService) {}

  async execute(id: string) {
    const user = await this.commonUserService.getUser({ id });

    return user;
  }
}
