import { DataSource } from 'typeorm';

import { postgresConnection } from './typeorm.config';

export const dataSourceSeed = new DataSource({
  ...postgresConnection,
  migrations: ['./src/shared/typeorm/seeds/*.ts'],
  migrationsTableName: 'typeorm_seeds',
  entities: ['./src/**/entities/*.ts'],
});
