const API_BASE = "http://localhost:8787/api";

const call = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");

  if (!response.ok) {
    const message = isJson
      ? ((await response.json().catch(() => ({}))).error || "Request failed")
      : ((await response.text().catch(() => "")) || "Request failed");
    throw new Error(message);
  }

  if (!isJson) {
    return await response.text();
  }

  return response.json();
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
