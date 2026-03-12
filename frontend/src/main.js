import { api } from "./services/api";
import { mountRefreshControl } from "./components/refreshControls";
import { mountGoalSettings } from "./components/goalSettingsController";
import { renderProgressSummary } from "./components/progressSummary";
import { mountRecommendations } from "./components/recommendationsController";

const renderDataList = (hostId, items, emptyMessage, formatter) => {
  const host = document.getElementById(hostId);
  if (!items.length) {
    host.innerHTML = `<div class="state-empty">${emptyMessage}</div>`;
    return;
  }

  host.innerHTML = items.map((item) => formatter(item)).join("");
};

const renderDashboard = async () => {
  try {
    const data = await api.getDashboard();

    const nutritionFresh = document.getElementById("nutrition-freshness");
    const workoutFresh = document.getElementById("workout-freshness");
    nutritionFresh.textContent = `Last synced: ${data.freshness.nutrition || "never"}`;
    workoutFresh.textContent = `Last synced: ${data.freshness.workouts || "never"}`;

    renderDataList("nutrition-list", data.nutrition, "No nutrition entries yet", (entry) => `
      <div class="data-card">
        <strong>${entry.product_name}</strong>
        <p class="muted">${entry.calories_kcal || 0} kcal</p>
      </div>
    `);

    renderDataList("workout-list", data.workouts, "No workouts yet", (session) => `
      <div class="data-card">
        <strong>${session.title}</strong>
        <p class="muted">${session.duration_minutes || "-"} min</p>
      </div>
    `);
  } catch (error) {
    document.getElementById("nutrition-list").innerHTML = `<div class="state-error">${error.message}</div>`;
    document.getElementById("workout-list").innerHTML = `<div class="state-error">${error.message}</div>`;
  }
};

const bootstrap = async () => {
  mountRefreshControl("nutrition-refresh", "Sync Nutrition", renderDashboard);
  mountRefreshControl("workout-refresh", "Sync Workouts", renderDashboard);
  await mountGoalSettings(async () => {
    await renderProgressSummary();
    await mountRecommendations();
  });
  await renderDashboard();
  await renderProgressSummary();
  await mountRecommendations();
};

bootstrap();
