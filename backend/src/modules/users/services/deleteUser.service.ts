import { Injectable } from '@nestjs/common';

import { AppError } from '@shared/errors/AppError';

import { userErrors } from '../errors/user.errors';
import { UsersRepository } from '../repositories/users.repository';
import { CommonUserService } from './commonUser.service';

interface IDeleteUser {
  id: string;
  currentUserId: string;
}

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly commonUserService: CommonUserService,
  ) {}

  async execute({ id, currentUserId }: IDeleteUser) {
    if (id === currentUserId) {
      throw new AppError(userErrors.deleteItself);
    }

    const user = await this.commonUserService.getUser({
      id,
    });

    await this.usersRepository.delete(user);
  }
}
