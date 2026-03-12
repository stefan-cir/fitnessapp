import { getRecentNutritionEntries } from "../repositories/nutritionRepository.js";
import { getRecentWorkoutSessions } from "../repositories/workoutRepository.js";

const hasSufficientData = (nutrition, workouts) => nutrition.length >= 5 && workouts.length >= 4;

export const generateRecommendations = (goal) => {
  const nutrition = getRecentNutritionEntries(14);
  const workouts = getRecentWorkoutSessions(14);

  if (!hasSufficientData(nutrition, workouts)) {
    return {
      sufficientData: false,
      recommendations: [],
      reason: "Need at least 5 nutrition logs and 4 workouts in recent history"
    };
  }

  const avgCalories = nutrition.reduce((sum, item) => sum + (item.calories_kcal || 0), 0) / nutrition.length;
  const workoutVolume = workouts.reduce((sum, item) => sum + (item.total_volume || 0), 0);

  let calorieText = "Maintain current calorie target";
  if (goal?.goal_type === "fat_loss" && avgCalories > 2200) {
    calorieText = "Reduce daily calories by 150-250 kcal";
  } else if (goal?.goal_type === "bulk" && avgCalories < 2600) {
    calorieText = "Increase daily calories by 150-250 kcal";
  }

  const trainingText = workoutVolume > 0
    ? "Increase top set load by 2.5% on key lifts if previous session RPE <= 8"
    : "Start with conservative loading and add one progression set next session";

  return {
    sufficientData: true,
    recommendations: [
      {
        rec_type: "calories",
        recommendation_text: calorieText,
        rationale: `Based on average logged intake of ${Math.round(avgCalories)} kcal with goal ${goal?.goal_type || "not-set"}`,
        confidence: 0.72
      },
      {
        rec_type: "training",
        recommendation_text: trainingText,
        rationale: `Based on recent workout volume trend of ${Math.round(workoutVolume)} total volume units`,
        confidence: 0.68
      }
    ]
  };
};
