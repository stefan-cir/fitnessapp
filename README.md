# Fitness Progress Hub

A local-first fitness organizer that combines nutrition and workout trends in one dashboard.

## Requirements

- OS: macOS, Linux, or Windows
- Node.js: 20.x or newer
- npm: 10.x or newer
- Network access: required for OpenFoodFacts and Hevy API sync
- Hevy API key: required for workout sync (`HEVY_API_KEY` in `.env`)
- OpenFoodFacts User-Agent: required for nutrition sync (`OPENFOODFACTS_USER_AGENT` in `.env`)
- Local write permissions for:
	- `db/` (SQLite database file)
	- `storage/images/` (image files and metadata references)
- Default ports:
	- Frontend (Vite): `5173`
	- Backend API: `8787` (configurable via `PORT`)

Optional helper commands:

```bash
node -v
npm -v
```

## Stack

- Frontend: Vite + vanilla HTML/CSS/JS
- Backend: Node.js + Express
- Storage: SQLite for metadata and trend data
- Images: Stored locally under `storage/images/` (not uploaded)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env
```

Required `.env` values before syncing external data:

- `HEVY_API_KEY`
- `OPENFOODFACTS_USER_AGENT`

3. Start app (frontend + backend):

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8787`

## Key Endpoints

- `POST /api/nutrition/sync`
- `POST /api/workouts/sync`
- `GET /api/dashboard`
- `GET /api/goals/active`
- `POST /api/goals/active`
- `GET /api/progress/latest`
- `POST /api/recommendations/generate`
- `GET /api/recommendations/history`

## Local Data

- SQLite DB path set by `SQLITE_DB_PATH` (default: `db/fitnessapp.sqlite`)
- Local images path set by `IMAGES_DIR` (default: `storage/images`)

## Lint

```bash
npm run lint
```
