import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HashModule } from '@shared/providers/hash/hash.module';

import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/User';
import { JwtStrategy } from './providers/jwt.strategy';
import { UsersRepository } from './repositories/users.repository';
import { AuthService } from './services/auth.service';
import { CommonUserService } from './services/commonUser.service';
import { CreateUserService } from './services/createUser.service';
import { DeleteUserService } from './services/deleteUser.service';
import { FindAllUserService } from './services/findAllUser.service';
import { FindOneUserService } from './services/findOneUser.service';
import { UpdateUserService } from './services/updateUser.service';

const services = [
  UsersRepository,
  CommonUserService,
  FindAllUserService,
  FindOneUserService,
  CreateUserService,
  UpdateUserService,
  DeleteUserService,
  AuthService,
  JwtStrategy,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HashModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: services,
  exports: services,
})
export class UsersModule {}
