import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'database.sqlite'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
const schema = fs.readFileSync(join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

export default db;