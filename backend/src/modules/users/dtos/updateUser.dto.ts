import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  password?: string;
}
