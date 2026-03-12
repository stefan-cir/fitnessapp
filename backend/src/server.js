import express from "express";
import dotenv from "dotenv";
import { initializeDatabase } from "./lib/db.js";
import { errorHandler, notFoundHandler, logInfo } from "./lib/errors.js";
import { nutritionRouter } from "./routes/nutritionRoutes.js";
import { workoutRouter } from "./routes/workoutRoutes.js";
import { dashboardRouter } from "./routes/dashboardRoutes.js";
import { goalRouter } from "./routes/goalRoutes.js";
import { recommendationRouter } from "./routes/recommendationRoutes.js";
import { recommendationHistoryRouter } from "./routes/recommendationHistoryRoutes.js";
import { getLatestProgressSnapshot } from "./repositories/progressSnapshotRepository.js";

dotenv.config();
initializeDatabase();

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.use("/api/nutrition", nutritionRouter);
app.use("/api/workouts", workoutRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/goals", goalRouter);
app.get("/api/progress/latest", (_req, res) => res.json({ snapshot: getLatestProgressSnapshot() }));
app.use("/api/recommendations", recommendationRouter);
app.use("/api/recommendations/history", recommendationHistoryRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT || 8787);
app.listen(port, () => {
  logInfo("Backend server started", { port });
});
