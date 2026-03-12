export const renderRecommendationPanel = ({ latest, history, error }) => {
  const host = document.getElementById("recommendations");

  if (error) {
    const heading = document.createElement("h2");
    heading.textContent = "Recommendations";
    const errorDiv = document.createElement("div");
    errorDiv.className = "state-empty";
    errorDiv.textContent = error;
    host.replaceChildren(heading, errorDiv);
    return;
  }

  const latestHtml = latest
    ? `<div class="recommendation-item">
        <div class="meta">Latest (${latest.rec_type})</div>
        <p>${latest.recommendation_text}</p>
        <p class="muted">${latest.rationale}</p>
      </div>`
    : "<div class=\"state-empty\">No recommendation yet.</div>";

  const historyHtml = history.length
    ? history.map((item) => `
      <div class="recommendation-item">
        <span class="badge ${item.confidence >= 0.7 ? "high" : "low"}">confidence ${item.confidence}</span>
        <p>${item.recommendation_text}</p>
        <p class="meta">${item.created_at}</p>
      </div>
    `).join("")
    : "<div class=\"state-empty\">No history available.</div>";

  host.innerHTML = `
    <div class="panel-header">
      <h2>Recommendations</h2>
      <button id="recommendation-refresh" class="btn">Generate</button>
    </div>
    ${latestHtml}
    <h3>History</h3>
    ${historyHtml}
  `;
};
