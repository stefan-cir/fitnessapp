import { api } from "../services/api";
import { goalSettingsMarkup } from "./goalSettings";

export const mountGoalSettings = async (onGoalChanged) => {
  const host = document.getElementById("goal-settings");
  host.innerHTML = goalSettingsMarkup();

  const activeNode = document.getElementById("goal-active");
  const form = document.getElementById("goal-form");

  const refreshActive = async () => {
    const active = await api.getActiveGoal();
    activeNode.textContent = active.goal ? `Active goal: ${active.goal.goal_type}` : "No goal selected yet";
  };

  await refreshActive();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const goalType = document.getElementById("goal-type").value;
    const targetRate = document.getElementById("target-rate").value;
    await api.setActiveGoal(goalType, targetRate ? Number(targetRate) : null);
    await refreshActive();
    if (onGoalChanged) {
      onGoalChanged();
    }
  });
};
