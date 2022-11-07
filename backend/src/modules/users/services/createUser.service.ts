import { Injectable } from '@nestjs/common';

import { HashProvider } from '@shared/providers/hash/hashProvider';

import { CreateUserDto } from '../dtos/createUser.dto';
import { UsersRepository } from '../repositories/users.repository';
import { CommonUserService } from './commonUser.service';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly commonUserService: CommonUserService,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({ email, nome, password }: CreateUserDto) {
    // Validando se já existe um email cadastrado na organização
    await this.commonUserService.validadeEmail(email);

    // Gerando um Hash Da senha
    const hashedPassword = await this.hashProvider.generateHash(password);

    // Criando o usuario
    const user = await this.usersRepository.create({
      email,
      nome,
      password: hashedPassword,
    });

    return user;
  }
}
