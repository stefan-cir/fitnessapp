import express from "express";
import { asyncHandler } from "../lib/errors.js";
import { fetchRecentWorkouts } from "../services/hevyService.js";
import { getRecentWorkoutSessions, saveWorkoutSessions } from "../repositories/workoutRepository.js";

export const workoutRouter = express.Router();

workoutRouter.post("/sync", asyncHandler(async (_req, res) => {
  const items = await fetchRecentWorkouts();
  if (items.length) {
    saveWorkoutSessions(items);
  }
  res.json({ synced: items.length, items: getRecentWorkoutSessions(10) });
}));

workoutRouter.get("/recent", (_req, res) => {
  res.json({ items: getRecentWorkoutSessions(10) });
});
