# Implementation Plan: Fitness Progress Hub

**Branch**: `[001-fitness-progress-hub]` | **Date**: 2026-03-13 | **Spec**: `specs/001-fitness-progress-hub/spec.md`
**Input**: Feature specification from `/specs/001-fitness-progress-hub/spec.md`

## Summary

Build a local-first web application that unifies nutrition and workout data in one dashboard, supports explicit goal tracking (fat loss, maingain, bulk), and provides initial rule-based coaching recommendations. Frontend uses Vite with vanilla HTML/CSS/JS; backend is a minimal Node/Express API with SQLite persistence.

## Technical Context

**Language/Version**: JavaScript (ES2022), Node.js 20+, modern browsers  
**Primary Dependencies**: Vite, Express, better-sqlite3, dotenv  
**Storage**: Local SQLite database + local file path metadata for images  
**Testing**: ESLint, frontend production build, backend health smoke checks, quickstart acceptance checks  
**Target Platform**: Local desktop environment (macOS/Linux/Windows)  
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: Dashboard p95 <= 4s; recommendation generation p95 <= 6s  
**Constraints**: Minimal libraries, vanilla frontend, no cloud image uploads, local metadata persistence  
**Scale/Scope**: Single-user context with recent activity windows (10-20 records per view)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Code Quality: Linting passes for frontend and backend with modular route/service/repository boundaries.
- Testing: Build and lint checks pass; health route and quickstart flows verified.
- UX Consistency: Shared design tokens and consistent empty/error/loading treatment across all dashboard panels.
- Performance: Budget check utility and measurable thresholds for dashboard and recommendations are implemented.
- Maintainability/Observability: Centralized error handling and structured logging are present on backend.

## Project Structure

### Documentation (this feature)

```text
specs/001-fitness-progress-hub/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── api.yaml
└── tasks.md
```

### Source Code (repository root)

```text
backend/
└── src/
    ├── lib/
    ├── repositories/
    ├── routes/
    └── services/

frontend/
└── src/
    ├── components/
    ├── services/
    └── styles/

db/
storage/images/
```

**Structure Decision**: A split web architecture is used so API keys and SQLite access stay backend-only while the frontend remains lightweight and framework-free.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Backend + frontend split | Protect credentials and support SQLite persistence | Frontend-only approach cannot safely store secrets or access SQLite directly |
