import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(new URL('../../backend/package.json', import.meta.url));
const { Pool } = require('pg');
const migrationsDir = path.resolve(__dirname, '../migrations');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is required to run migrations.');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  max: Number(process.env.DATABASE_POOL_MAX ?? 5),
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const client = await pool.connect();

try {
  await client.query('BEGIN');
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);

  const files = (await readdir(migrationsDir))
    .filter((file) => file.endsWith('.sql') && !file.endsWith('.down.sql'))
    .sort();

  for (const file of files) {
    const applied = await client.query('SELECT 1 FROM schema_migrations WHERE id = $1', [file]);

    if (applied.rowCount) {
      console.log(`Skipping already-applied migration ${file}`);
      continue;
    }

    const sql = await readFile(path.join(migrationsDir, file), 'utf8');
    console.log(`Applying migration ${file}`);
    await client.query(sql);
    await client.query('INSERT INTO schema_migrations (id) VALUES ($1)', [file]);
  }

  await client.query('COMMIT');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
  await pool.end();
}
