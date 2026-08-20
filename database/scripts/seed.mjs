import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(new URL('../../backend/package.json', import.meta.url));
const { Pool } = require('pg');
const seedFile = path.resolve(__dirname, '../seed/development.sql');
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is required to run seed data.');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  max: Number(process.env.DATABASE_POOL_MAX ?? 5),
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const client = await pool.connect();

try {
  const sql = await readFile(seedFile, 'utf8');

  await client.query('BEGIN');
  await client.query(sql);
  await client.query('COMMIT');

  console.log('Development seed applied.');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
  await pool.end();
}
