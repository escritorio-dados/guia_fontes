import { Module } from '@nestjs/common';

import { ConfigModule } from '@config/config.module';

import { PeriodosModule } from '@modules/periodos/periodos.module';
import { UnidadesUnaspModule } from '@modules/unidadesUnasp/unidadesUnasp.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [ConfigModule, UsersModule, UnidadesUnaspModule, PeriodosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
