import express from "express";
import { getRecommendationHistory } from "../repositories/recommendationRepository.js";

export const recommendationHistoryRouter = express.Router();

recommendationHistoryRouter.get("/", (req, res) => {
  const limit = Number(req.query.limit || 20);
  res.json({ items: getRecommendationHistory(limit) });
});
