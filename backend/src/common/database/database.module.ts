import { Global, Module } from '@nestjs/common';
import { postgresPoolProvider } from './postgres.provider';

@Global()
@Module({
  providers: [postgresPoolProvider],
  exports: [postgresPoolProvider],
})
export class DatabaseModule {}
