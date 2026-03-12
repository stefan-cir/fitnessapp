import { api } from "../services/api";

const setLoading = (button, loading) => {
  button.disabled = loading;
  button.textContent = loading ? "Syncing..." : button.dataset.defaultText;
};

export const mountRefreshControl = (containerId, label, onDone) => {
  const container = document.getElementById(containerId);
  const button = document.createElement("button");
  button.className = "btn";
  button.textContent = label;
  button.dataset.defaultText = label;
  container.appendChild(button);

  button.addEventListener("click", async () => {
    setLoading(button, true);
    try {
      if (label.includes("Nutrition")) {
        await api.syncNutrition();
      } else {
        await api.syncWorkouts();
      }
      onDone();
    } catch (error) {
      // Keep UX explicit and local even when source sync fails.
      alert(error.message);
    } finally {
      setLoading(button, false);
    }
  });
};
