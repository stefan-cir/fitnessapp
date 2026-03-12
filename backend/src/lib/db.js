import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../../");

dotenv.config({ path: path.resolve(repoRoot, ".env") });

const dbPath = process.env.SQLITE_DB_PATH || "db/fitnessapp.sqlite";
const absoluteDbPath = path.resolve(repoRoot, dbPath);
const dbDir = path.dirname(absoluteDbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(absoluteDbPath);

export const initializeDatabase = () => {
  const schemaPath = path.resolve(repoRoot, "db/schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");
  db.exec(schemaSql);
};

initializeDatabase();
