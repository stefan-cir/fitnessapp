# Quickstart Validation

## Preconditions

- `npm install` completed
- `.env` created from `.env.example`
- Backend and frontend running via `npm run dev`

## Manual Acceptance Steps

1. Open frontend at `http://localhost:5173`.
2. Click `Sync Nutrition` and verify nutrition cards appear.
3. Click `Sync Workouts`:
   - If Hevy API key is set, verify workout cards appear.
   - If key is missing, verify app remains usable and shows empty state.
4. Set a goal (`fat_loss`, `maingain`, or `bulk`) and confirm progress summary updates.
5. Open recommendations panel:
   - With enough data, verify recommendation text and history rendering.
   - Without enough data, verify informative insufficiency message.
6. Refresh page and verify dashboard still renders from persisted data.

## Performance Checks

- Dashboard request p95 should be <= 4000 ms in local dev.
- Recommendation generation request p95 should be <= 6000 ms in local dev.
