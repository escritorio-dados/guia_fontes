import { DataSource } from 'typeorm';

import { postgresConnection } from './typeorm.config';

export const dataSource = new DataSource({
  ...postgresConnection,
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  migrationsTableName: 'typeorm_migrations',
});
