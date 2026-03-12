const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";


const call = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Request failed");
  }
  return payload;
};

export const api = {
  getDashboard: () => call("/dashboard"),
  syncNutrition: (query = "chicken") => call("/nutrition/sync", { method: "POST", body: JSON.stringify({ query }) }),
  syncWorkouts: () => call("/workouts/sync", { method: "POST" }),
  getActiveGoal: () => call("/goals/active"),
  setActiveGoal: (goal_type, target_rate) => call("/goals/active", { method: "POST", body: JSON.stringify({ goal_type, target_rate }) }),
  getProgressLatest: () => call("/progress/latest"),
  generateRecommendations: () => call("/recommendations/generate", { method: "POST" }),
  getRecommendationHistory: () => call("/recommendations/history")
};
