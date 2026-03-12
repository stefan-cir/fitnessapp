export const checkPerformanceBudgets = ({ dashboardLatencyMs, recommendationLatencyMs }) => {
  return {
    dashboard: {
      budgetMs: 4000,
      measuredMs: dashboardLatencyMs,
      pass: dashboardLatencyMs <= 4000
    },
    recommendation: {
      budgetMs: 6000,
      measuredMs: recommendationLatencyMs,
      pass: recommendationLatencyMs <= 6000
    }
  };
};
