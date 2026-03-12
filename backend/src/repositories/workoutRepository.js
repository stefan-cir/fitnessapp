import { db } from "../lib/db.js";

const insertStmt = db.prepare(`
  INSERT INTO workout_sessions (
    source, source_id, performed_at, title, duration_minutes, total_volume, raw_payload
  ) VALUES (
    @source, @source_id, @performed_at, @title, @duration_minutes, @total_volume, @raw_payload
  )
`);

const recentStmt = db.prepare(`
  SELECT * FROM workout_sessions
  ORDER BY datetime(performed_at) DESC
  LIMIT ?
`);

export const saveWorkoutSessions = (entries) => {
  const tx = db.transaction((items) => {
    for (const item of items) {
      insertStmt.run(item);
    }
  });

  tx(entries);
};

export const getRecentWorkoutSessions = (limit = 10) => {
  return recentStmt.all(limit);
};
