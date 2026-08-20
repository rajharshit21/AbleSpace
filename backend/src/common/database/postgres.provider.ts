import { Provider } from '@nestjs/common';
import { POSTGRES_POOL } from './database.constants';
import { getDatabaseConfig } from './database.config';

type PostgresPool = unknown;

type PoolConstructor = new (config: {
  connectionString: string;
  max: number;
  ssl: false | { rejectUnauthorized: false };
}) => PostgresPool;

const { Pool } = require('pg') as { Pool: PoolConstructor };

export const postgresPoolProvider: Provider = {
  provide: POSTGRES_POOL,
  useFactory: () => {
    const config = getDatabaseConfig();

    return new Pool({
      connectionString: config.connectionString,
      max: Number(process.env.DATABASE_POOL_MAX ?? 5),
      ssl: config.ssl ? { rejectUnauthorized: false } : false,
    });
  },
};
