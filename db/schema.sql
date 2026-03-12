PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS user_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS nutrition_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,
  source_id TEXT,
  consumed_at TEXT NOT NULL,
  meal_name TEXT,
  product_name TEXT NOT NULL,
  calories_kcal REAL,
  protein_g REAL,
  carbs_g REAL,
  fat_g REAL,
  image_path TEXT,
  raw_payload TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS workout_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,
  source_id TEXT,
  performed_at TEXT NOT NULL,
  title TEXT NOT NULL,
  duration_minutes INTEGER,
  total_volume REAL,
  raw_payload TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS goal_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  goal_type TEXT NOT NULL CHECK(goal_type IN ('fat_loss', 'maingain', 'bulk')),
  target_rate REAL,
  active INTEGER NOT NULL DEFAULT 1,
  effective_from TEXT NOT NULL DEFAULT (datetime('now')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS progress_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  goal_profile_id INTEGER,
  period_start TEXT NOT NULL,
  period_end TEXT NOT NULL,
  nutrition_adherence_score REAL,
  workout_consistency_score REAL,
  summary TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(goal_profile_id) REFERENCES goal_profiles(id)
);

CREATE TABLE IF NOT EXISTS recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rec_type TEXT NOT NULL CHECK(rec_type IN ('training', 'calories')),
  recommendation_text TEXT NOT NULL,
  rationale TEXT NOT NULL,
  confidence REAL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dashboard_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
