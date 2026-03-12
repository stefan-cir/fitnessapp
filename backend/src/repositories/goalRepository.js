import { db } from "../lib/db.js";

const deactivateStmt = db.prepare("UPDATE goal_profiles SET active = 0 WHERE active = 1");
const insertStmt = db.prepare(`
  INSERT INTO goal_profiles (goal_type, target_rate, active)
  VALUES (@goal_type, @target_rate, 1)
`);
const activeStmt = db.prepare("SELECT * FROM goal_profiles WHERE active = 1 ORDER BY id DESC LIMIT 1");

export const setActiveGoal = ({ goal_type, target_rate }) => {
  const tx = db.transaction(() => {
    deactivateStmt.run();
    insertStmt.run({ goal_type, target_rate: target_rate ?? null });
  });
  tx();
  return activeStmt.get();
};

export const getActiveGoal = () => {
  return activeStmt.get() || null;
};
