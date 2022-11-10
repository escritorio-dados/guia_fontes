import { Module } from '@nestjs/common';

import { ConfigModule } from '@config/config.module';

import { AreasAtuacaoModule } from '@modules/areasAtuacao/areasAtuacao.module';
import { DocentesModule } from '@modules/docentes/docentes.module';
import { PeriodosModule } from '@modules/periodos/periodos.module';
import { UnidadesUnaspModule } from '@modules/unidadesUnasp/unidadesUnasp.module';
import { UsersModule } from '@modules/users/users.module';
import { VinculosModule } from '@modules/vinculos/vinculos.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    UnidadesUnaspModule,
    PeriodosModule,
    DocentesModule,
    AreasAtuacaoModule,
    VinculosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
