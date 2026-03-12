import { db } from "../lib/db.js";

const insertStmt = db.prepare(`
  INSERT INTO progress_snapshots (
    goal_profile_id, period_start, period_end, nutrition_adherence_score,
    workout_consistency_score, summary
  ) VALUES (
    @goal_profile_id, @period_start, @period_end, @nutrition_adherence_score,
    @workout_consistency_score, @summary
  )
`);

const latestStmt = db.prepare(`
  SELECT * FROM progress_snapshots
  ORDER BY datetime(created_at) DESC
  LIMIT 1
`);

export const saveProgressSnapshot = (snapshot) => {
  insertStmt.run(snapshot);
};

export const getLatestProgressSnapshot = () => {
  return latestStmt.get() || null;
};
