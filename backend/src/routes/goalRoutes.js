import express from "express";
import { AppError } from "../lib/errors.js";
import { getActiveGoal, setActiveGoal } from "../repositories/goalRepository.js";
import { buildProgressSnapshot } from "../services/progressService.js";
import { saveProgressSnapshot, getLatestProgressSnapshot } from "../repositories/progressSnapshotRepository.js";

export const goalRouter = express.Router();

goalRouter.get("/active", (_req, res) => {
  res.json({ goal: getActiveGoal() });
});

goalRouter.post("/active", (req, res) => {
  const { goal_type, target_rate } = req.body || {};

  if (!["fat_loss", "maingain", "bulk"].includes(goal_type)) {
    throw new AppError("goal_type must be one of fat_loss, maingain, bulk", 400);
  }

  const goal = setActiveGoal({ goal_type, target_rate });
  const snapshot = buildProgressSnapshot(goal);
  saveProgressSnapshot(snapshot);

  res.status(201).json({ goal, snapshot: getLatestProgressSnapshot() });
});
