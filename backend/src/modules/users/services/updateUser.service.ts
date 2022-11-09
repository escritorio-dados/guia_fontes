import { Injectable } from '@nestjs/common';

import { AppError } from '@shared/errors/AppError';
import { HashProvider } from '@shared/providers/hash/hashProvider';

import { ChangePasswordUserDto } from '../dtos/changePassword.user.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { userErrors } from '../errors/user.errors';
import { UsersRepository } from '../repositories/users.repository';
import { CommonUserService } from './commonUser.service';

type IUpdateUser = UpdateUserDto & { id: string };

type IChangePasswordUser = ChangePasswordUserDto & { id: string };

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly commonUserService: CommonUserService,
    private readonly hashProvider: HashProvider,
  ) {}

  async changePassword({ id, newPassword, oldPassword }: IChangePasswordUser) {
    const user = await this.commonUserService.getUser({
      id,
    });

    const correctPassword = await this.hashProvider.compareHash(oldPassword, user.password);

    if (!correctPassword) {
      throw new AppError(userErrors.oldPasswordInvalid);
    }

    const newHash = await this.hashProvider.generateHash(newPassword);

    user.password = newHash;

    await this.usersRepository.save(user);

    return user;
  }

  async execute({ id, nome, email, password }: IUpdateUser) {
    const user = await this.commonUserService.getUser({
      id,
    });

    // Validando se o e-mail já está em uso
    if (user.email !== email) {
      await this.commonUserService.validadeEmail(email);
    }

    // Colocando um Hash caso seja inserida uma nova senha
    if (password != null) {
      const hashedPassword = await this.hashProvider.generateHash(password);

      user.password = hashedPassword;
    }

    user.nome = nome;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}
