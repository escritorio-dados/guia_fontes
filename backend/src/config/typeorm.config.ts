import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

config();

export const postgresConnection: DataSourceOptions = {
  type: 'postgres',
  port: Number(process.env.POSTGRESS_PORT),
  host: process.env.POSTGRESS_HOST,
  username: process.env.POSTGRESS_USER,
  password: process.env.POSTGRESS_PASSWORD,
  database: process.env.POSTGRESS_DATABASE,
};
