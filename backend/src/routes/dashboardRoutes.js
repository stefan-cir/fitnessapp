import express from "express";
import { getRecentNutritionEntries } from "../repositories/nutritionRepository.js";
import { getRecentWorkoutSessions } from "../repositories/workoutRepository.js";
import { getLastDashboardSnapshot, saveDashboardSnapshot } from "../repositories/dashboardSnapshotRepository.js";

export const dashboardRouter = express.Router();

dashboardRouter.get("/", (_req, res) => {
  const nutrition = getRecentNutritionEntries(10);
  const workouts = getRecentWorkoutSessions(10);

  if (!nutrition.length && !workouts.length) {
    const fallback = getLastDashboardSnapshot();
    return res.json({
      nutrition: [],
      workouts: [],
      freshness: {
        nutrition: null,
        workouts: null
      },
      fallback
    });
  }

  const payload = {
    nutrition,
    workouts,
    freshness: {
      nutrition: nutrition[0]?.consumed_at || null,
      workouts: workouts[0]?.performed_at || null
    },
    fallback: null
  };

  saveDashboardSnapshot(payload);
  return res.json(payload);
});
