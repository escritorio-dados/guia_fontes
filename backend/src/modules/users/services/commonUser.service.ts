import { Injectable } from '@nestjs/common';

import { AppError } from '@shared/errors/AppError';

import { userErrors } from '../errors/user.errors';
import { UsersRepository } from '../repositories/users.repository';

interface IGetUser {
  id: string;
  relations?: string[];
}

@Injectable()
export class CommonUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async validadeEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (user != null) {
      throw new AppError(userErrors.duplicateEmail);
    }
  }

  async getUser({ id, relations }: IGetUser) {
    const user = await this.usersRepository.findById(id, relations);

    if (user == null) {
      throw new AppError(userErrors.notFound);
    }

    return user;
  }
}
