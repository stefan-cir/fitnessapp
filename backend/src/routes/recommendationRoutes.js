import express from "express";
import { getActiveGoal } from "../repositories/goalRepository.js";
import { generateRecommendations } from "../services/recommendationEngine.js";
import { saveRecommendations, getLatestRecommendation } from "../repositories/recommendationRepository.js";

export const recommendationRouter = express.Router();

recommendationRouter.post("/generate", (_req, res) => {
  const goal = getActiveGoal();
  const result = generateRecommendations(goal);

  if (!result.sufficientData) {
    return res.status(422).json({
      ...result,
      error: result.reason || "Insufficient data to generate recommendations"
    });
  }

  saveRecommendations(result.recommendations);
  return res.json({
    sufficientData: true,
    latest: getLatestRecommendation(),
    recommendations: result.recommendations
  });
});
