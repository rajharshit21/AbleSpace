export interface DatabaseConfig {
  connectionString: string;
  ssl: boolean;
}

export function getDatabaseConfig(): DatabaseConfig {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is required to connect to PostgreSQL.');
  }

  return {
    connectionString,
    ssl: process.env.DATABASE_SSL === 'true',
  };
}
