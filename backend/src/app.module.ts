import { Module } from '@nestjs/common';

import { ConfigModule } from '@config/config.module';

import { UnidadesUnaspModule } from '@modules/unidadesUnasp/unidadesUnasp.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [ConfigModule, UsersModule, UnidadesUnaspModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
