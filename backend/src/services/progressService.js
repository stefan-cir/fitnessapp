import { getRecentNutritionEntries } from "../repositories/nutritionRepository.js";
import { getRecentWorkoutSessions } from "../repositories/workoutRepository.js";

const average = (values) => {
  if (!values.length) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

export const buildProgressSnapshot = (goal) => {
  const nutrition = getRecentNutritionEntries(14);
  const workouts = getRecentWorkoutSessions(10);

  const nutritionScore = Math.min(100, average(nutrition.map((entry) => Math.min(100, (entry.calories_kcal || 0) / 25))));
  const workoutScore = Math.min(100, workouts.length * 10);

  return {
    goal_profile_id: goal?.id || null,
    period_start: new Date(Date.now() - 14 * 86400000).toISOString(),
    period_end: new Date().toISOString(),
    nutrition_adherence_score: Number(nutritionScore.toFixed(1)),
    workout_consistency_score: Number(workoutScore.toFixed(1)),
    summary: `Goal ${goal?.goal_type || "not-set"}: nutrition ${nutritionScore.toFixed(0)} / workouts ${workoutScore.toFixed(0)}`
  };
};
