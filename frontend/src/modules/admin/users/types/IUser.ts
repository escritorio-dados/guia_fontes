import { ICommonApi } from '#shared/types/ICommonApi';

export type IUser = ICommonApi & { nome: string; email: string };

export interface IUserFilters {
  nome: string;
  email: string;
  min_updated: Date | null;
  max_updated: Date | null;
}

export interface ICreateUser {
  nome: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  nome: string;
  email: string;
  password?: string;
}

export interface IChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}
