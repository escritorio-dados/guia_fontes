import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindAllLimitedUsersQuery {
  @IsNotEmpty()
  @IsOptional()
  email?: string;
}
