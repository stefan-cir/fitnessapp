import { db } from "../lib/db.js";

const insertStmt = db.prepare("INSERT INTO dashboard_snapshots (payload) VALUES (?)");
const lastStmt = db.prepare("SELECT payload, created_at FROM dashboard_snapshots ORDER BY id DESC LIMIT 1");

export const saveDashboardSnapshot = (payload) => {
  insertStmt.run(JSON.stringify(payload));
};

export const getLastDashboardSnapshot = () => {
  const row = lastStmt.get();
  if (!row) {
    return null;
  }

  return {
    payload: JSON.parse(row.payload),
    created_at: row.created_at
  };
};
