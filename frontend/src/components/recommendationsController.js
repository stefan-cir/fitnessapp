import { api } from "../services/api";
import { renderRecommendationPanel } from "./recommendationsPanel";

export const mountRecommendations = async () => {
  const refresh = async () => {
    try {
      const historyRes = await api.getRecommendationHistory();
      let latest = historyRes.items[0] || null;
      if (!latest) {
        try {
          const generated = await api.generateRecommendations();
          latest = generated.latest;
        } catch (error) {
          renderRecommendationPanel({ latest: null, history: historyRes.items, error: error.message });
          return;
        }
      }
      renderRecommendationPanel({ latest, history: historyRes.items, error: null });
      const btn = document.getElementById("recommendation-refresh");
      if (btn) {
        btn.addEventListener("click", refresh, { once: true });
      }
    } catch (error) {
      renderRecommendationPanel({ latest: null, history: [], error: error.message });
    }
  };

  await refresh();
};
