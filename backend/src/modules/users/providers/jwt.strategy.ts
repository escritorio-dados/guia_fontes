import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AppError } from '@shared/errors/AppError';

import { UsersRepository } from '../repositories/users.repository';

config();

export interface IJwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.usersRepository.findById(payload.sub);

    if (user == null) {
      throw new AppError('sem autorização', 401);
    }

    return user;
  }
}
