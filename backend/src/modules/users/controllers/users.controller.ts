import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';

import { IParamId } from '@shared/types/params';
import { ICurrentUser } from '@shared/types/request';

import { ChangePasswordUserDto } from '../dtos/changePassword.user.dto';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { FindAllLimitedUsersQuery } from '../query/findAllLimited.users.query';
import { FindPaginationUsersQuery } from '../query/findPagination.users.query';
import { CreateUserService } from '../services/createUser.service';
import { DeleteUserService } from '../services/deleteUser.service';
import { FindAllUserService } from '../services/findAllUser.service';
import { FindOneUserService } from '../services/findOneUser.service';
import { UpdateUserService } from '../services/updateUser.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private readonly findAllUserService: FindAllUserService,
    private readonly findOneUserService: FindOneUserService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Get()
  async listPaginationUsers(@Query() query: FindPaginationUsersQuery) {
    return await this.findAllUserService.findAllPagination(query);
  }

  @Get('/limited')
  async listLimitedUsers(@Query() query: FindAllLimitedUsersQuery) {
    return await this.findAllUserService.findAllLimited(query);
  }

  @Get('/me')
  async getMe(@Request() { user }: ICurrentUser) {
    return user;
  }

  @Get(':id')
  async getUser(@Param() { id }: IParamId) {
    return await this.findOneUserService.execute(id);
  }

  @Post()
  async createUser(@Body() input: CreateUserDto) {
    return await this.createUserService.execute(input);
  }

  @Patch('/me/password')
  async changeMyPassword(@Body() input: ChangePasswordUserDto, @Request() { user }: ICurrentUser) {
    return await this.updateUserService.changePassword({
      ...input,
      id: user.id,
    });
  }

  @Put(':id')
  async updateUser(@Param() { id }: IParamId, @Body() input: UpdateUserDto) {
    return await this.updateUserService.execute({ id, ...input });
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param() { id }: IParamId, @Request() { user }: ICurrentUser) {
    await this.deleteUserService.execute({ id, currentUserId: user.id });
  }
}
