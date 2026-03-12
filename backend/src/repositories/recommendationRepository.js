import { db } from "../lib/db.js";

const insertStmt = db.prepare(`
  INSERT INTO recommendations (rec_type, recommendation_text, rationale, confidence)
  VALUES (@rec_type, @recommendation_text, @rationale, @confidence)
`);

const latestStmt = db.prepare("SELECT * FROM recommendations ORDER BY datetime(created_at) DESC LIMIT 1");
const historyStmt = db.prepare("SELECT * FROM recommendations ORDER BY datetime(created_at) DESC LIMIT ?");

export const saveRecommendations = (items) => {
  const tx = db.transaction((recommendations) => {
    for (const recommendation of recommendations) {
      insertStmt.run(recommendation);
    }
  });

  tx(items);
};

export const getLatestRecommendation = () => {
  return latestStmt.get() || null;
};

export const getRecommendationHistory = (limit = 20) => {
  return historyStmt.all(limit);
};
