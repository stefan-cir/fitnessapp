import { db } from "../lib/db.js";

const insertStmt = db.prepare(`
  INSERT INTO nutrition_entries (
    source, source_id, consumed_at, meal_name, product_name,
    calories_kcal, protein_g, carbs_g, fat_g, image_path, raw_payload
  ) VALUES (
    @source, @source_id, @consumed_at, @meal_name, @product_name,
    @calories_kcal, @protein_g, @carbs_g, @fat_g, @image_path, @raw_payload
  )
`);

const recentStmt = db.prepare(`
  SELECT * FROM nutrition_entries
  ORDER BY datetime(consumed_at) DESC
  LIMIT ?
`);

export const saveNutritionEntries = (entries) => {
  const tx = db.transaction((items) => {
    for (const item of items) {
      insertStmt.run(item);
    }
  });

  tx(entries);
};

export const getRecentNutritionEntries = (limit = 10) => {
  return recentStmt.all(limit);
};
