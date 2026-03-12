import { api } from "./services/api";
import { mountRefreshControl } from "./components/refreshControls";
import { mountGoalSettings } from "./components/goalSettingsController";
import { renderProgressSummary } from "./components/progressSummary";
import { mountRecommendations } from "./components/recommendationsController";

const renderDataList = (hostId, items, emptyMessage, formatter) => {
  const host = document.getElementById(hostId);
  host.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "state-empty";
    empty.textContent = emptyMessage;
    host.appendChild(empty);
    return;
  }

  items.forEach((item) => host.appendChild(formatter(item)));
};

const renderDashboard = async () => {
  try {
    const data = await api.getDashboard();

    const nutritionFresh = document.getElementById("nutrition-freshness");
    const workoutFresh = document.getElementById("workout-freshness");
    nutritionFresh.textContent = `Last synced: ${data.freshness.nutrition || "never"}`;
    workoutFresh.textContent = `Last synced: ${data.freshness.workouts || "never"}`;

    renderDataList("nutrition-list", data.nutrition, "No nutrition entries yet", (entry) => {
      const card = document.createElement("div");
      card.className = "data-card";
      const name = document.createElement("strong");
      name.textContent = entry.product_name;
      const kcal = document.createElement("p");
      kcal.className = "muted";
      kcal.textContent = `${entry.calories_kcal || 0} kcal`;
      card.appendChild(name);
      card.appendChild(kcal);
      return card;
    });

    renderDataList("workout-list", data.workouts, "No workouts yet", (session) => {
      const card = document.createElement("div");
      card.className = "data-card";
      const title = document.createElement("strong");
      title.textContent = session.title;
      const duration = document.createElement("p");
      duration.className = "muted";
      duration.textContent = `${session.duration_minutes || "-"} min`;
      card.appendChild(title);
      card.appendChild(duration);
      return card;
    });
  } catch (error) {
    ["nutrition-list", "workout-list"].forEach((id) => {
      const host = document.getElementById(id);
      host.innerHTML = "";
      const errDiv = document.createElement("div");
      errDiv.className = "state-error";
      errDiv.textContent = error.message;
      host.appendChild(errDiv);
    });
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
