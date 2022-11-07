import { hashSync } from 'bcrypt';
import { config } from 'dotenv';

import { User } from '../entities/User';

config();

export const usersSeeds: Array<Partial<User>> = [
  {
    id: 'efb22058-90cf-41cc-8cd0-f63e62ad496f',
    nome: process.env.APP_ROOT_USER_NOME,
    email: process.env.APP_ROOT_USER_EMAIL,
    password: hashSync(process.env.APP_ROOT_USER_PASSWORD ?? '', 10),
  },
];
