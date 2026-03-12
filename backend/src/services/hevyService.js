import { AppError } from "../lib/errors.js";

const BASE_URL = "https://api.hevyapp.com/v1";

export const fetchRecentWorkouts = async () => {
  const apiKey = process.env.HEVY_API_KEY;

  if (!apiKey) {
    return [];
  }

  const response = await fetch(`${BASE_URL}/workouts?page=1&pageSize=10`, {
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new AppError("Failed to fetch workouts from Hevy", response.status);
  }

  const payload = await response.json();
  const workouts = payload.workouts || payload.data || [];

  return workouts.slice(0, 10).map((workout) => ({
    source: "hevy",
    source_id: workout.id || null,
    performed_at: workout.start_time || workout.created_at || new Date().toISOString(),
    title: workout.title || "Workout",
    duration_minutes: workout.duration_seconds ? Math.round(workout.duration_seconds / 60) : null,
    total_volume: workout.total_volume || null,
    raw_payload: JSON.stringify(workout)
  }));
};
