export const goalSettingsMarkup = () => `
  <h2>Goal Settings</h2>
  <form id="goal-form" class="goal-form">
    <label for="goal-type">Goal</label>
    <select id="goal-type" name="goal-type">
      <option value="fat_loss">Fat Loss</option>
      <option value="maingain">Maingain</option>
      <option value="bulk">Bulk</option>
    </select>
    <label for="target-rate">Target Rate</label>
    <input id="target-rate" type="number" step="0.1" placeholder="optional" />
    <button class="btn btn-primary" type="submit">Save Goal</button>
  </form>
  <p id="goal-active" class="muted"></p>
`;
