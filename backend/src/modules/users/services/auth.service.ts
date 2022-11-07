import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppError } from '@shared/errors/AppError';
import { HashProvider } from '@shared/providers/hash/hashProvider';

import { AuthDto } from '../dtos/auth.dto';
import { User } from '../entities/User';
import { authErrors } from '../errors/auth.errors';
import { IJwtPayload } from '../providers/jwt.strategy';
import { UsersRepository } from '../repositories/users.repository';

export interface IAuthType {
  user: User;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: HashProvider,
    private readonly jwtService: JwtService,
  ) {}

  private async getUserToken(user: User) {
    const payload: IJwtPayload = { email: user.email, sub: user.id };

    return await this.jwtService.signAsync(payload);
  }

  async validadeUser({ email, password }: AuthDto) {
    const user = await this.usersRepository.findByEmail(email);

    if (user == null) {
      throw new AppError(authErrors.emailInvalid, 401);
    }

    const validPassword = await this.hashProvider.compareHash(password, user.password);

    if (!validPassword) {
      throw new AppError(authErrors.passwordInvalid, 401);
    }

    const token = await this.getUserToken(user);

    return { token, user };
  }
}
