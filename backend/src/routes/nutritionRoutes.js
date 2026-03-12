import express from "express";
import { asyncHandler } from "../lib/errors.js";
import { fetchRecentFoodEntries } from "../services/openfoodfactsService.js";
import { getRecentNutritionEntries, saveNutritionEntries } from "../repositories/nutritionRepository.js";

export const nutritionRouter = express.Router();

nutritionRouter.post("/sync", asyncHandler(async (req, res) => {
  const query = req.body?.query || "chicken";
  const items = await fetchRecentFoodEntries(query);
  saveNutritionEntries(items);
  res.json({ synced: items.length, items: getRecentNutritionEntries(10) });
}));

nutritionRouter.get("/recent", (_req, res) => {
  res.json({ items: getRecentNutritionEntries(10) });
});
