import { api } from "../services/api";

export const renderProgressSummary = async () => {
  const host = document.getElementById("progress-summary");
  const { snapshot } = await api.getProgressLatest();

  if (!snapshot) {
    host.innerHTML = "<h2>Progress</h2><p class=\"muted\">No snapshot yet. Set a goal first.</p>";
    return;
  }

  host.innerHTML = `
    <h2>Progress Summary</h2>
    <div class="progress-grid">
      <div class="progress-tile">
        <strong>Nutrition Score</strong>
        <p>${snapshot.nutrition_adherence_score}</p>
      </div>
      <div class="progress-tile">
        <strong>Workout Score</strong>
        <p>${snapshot.workout_consistency_score}</p>
      </div>
    </div>
    <p class="muted">${snapshot.summary}</p>
  `;
};
