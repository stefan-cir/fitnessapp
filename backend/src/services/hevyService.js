import { AppError } from "../lib/errors.js";

const BASE_URL = "https://api.hevyapp.com/v1";

export const fetchRecentWorkouts = async () => {
  const apiKey = String(process.env.HEVY_API_KEY || "").trim();

  if (!apiKey) {
    return [];
  }

  const response = await fetch(`${BASE_URL}/workouts?page=1&pageSize=5`, {
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    let details = null;
    try {
      details = await response.json();
    } catch {
      details = null;
    }
    throw new AppError("Failed to fetch workouts from Hevy", response.status, details);
  }

  const payload = await response.json();
  const workouts =
    payload.workouts ||
    payload.data?.workouts ||
    payload.data ||
    [];

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
