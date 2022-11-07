import { Module } from '@nestjs/common';

import { ConfigModule } from '@config/config.module';

import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}