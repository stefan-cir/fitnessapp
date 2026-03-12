# Tasks: Fitness Progress Hub

**Input**: Design documents from `/specs/001-fitness-progress-hub/`
**Prerequisites**: plan.md (required), spec.md (required), research.md (available)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Vite frontend, minimal Node backend, and local development baseline.

- [ ] T001 Create project folders for frontend/backend/db/assets in frontend/, backend/, db/, storage/images/
- [ ] T002 Initialize Vite vanilla app scaffolding in frontend/package.json
- [ ] T003 [P] Initialize backend Node project with minimal dependencies in backend/package.json
- [ ] T004 [P] Add root workspace scripts to run frontend and backend together in package.json
- [ ] T005 [P] Add baseline environment example files for API keys and local paths in .env.example

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build core infrastructure required before any user story implementation.

**CRITICAL**: No user story tasks should start until this phase is complete.

- [ ] T006 Create SQLite schema and migration script for profiles, entries, workouts, goals, snapshots, recommendations in db/schema.sql
- [ ] T007 Implement SQLite connection and repository bootstrap in backend/src/lib/db.js
- [ ] T008 [P] Implement OpenFoodFacts API client wrapper with response normalization helpers in backend/src/services/openfoodfactsService.js
- [ ] T009 [P] Implement Hevy API client wrapper with response normalization helpers in backend/src/services/hevyService.js
- [ ] T010 Create shared error handling and structured logging utilities in backend/src/lib/errors.js
- [ ] T011 Implement backend HTTP server entry and route registration in backend/src/server.js
- [ ] T012 Create frontend API service layer for backend calls in frontend/src/services/api.js
- [ ] T013 Add shared UI tokens and accessibility utility styles in frontend/src/styles/base.css

**Checkpoint**: Foundation complete; user stories can proceed.

---

## Phase 3: User Story 1 - Unified Daily Dashboard (Priority: P1) MVP

**Goal**: Show the latest nutrition and workout data in one dashboard with resilient partial-failure handling.

**Independent Test**: Connect both sources, refresh dashboard, and verify both sections render with freshness timestamps and graceful fallback if one source fails.

- [ ] T014 [US1] Create nutrition entries repository for recent reads/writes in backend/src/repositories/nutritionRepository.js
- [ ] T015 [P] [US1] Create workout sessions repository for recent reads/writes in backend/src/repositories/workoutRepository.js
- [ ] T016 [US1] Implement sync endpoint for nutrition source in backend/src/routes/nutritionRoutes.js
- [ ] T017 [US1] Implement sync endpoint for workout source in backend/src/routes/workoutRoutes.js
- [ ] T018 [US1] Implement aggregated dashboard endpoint combining both sources and freshness metadata in backend/src/routes/dashboardRoutes.js
- [ ] T019 [P] [US1] Build dashboard layout and section containers in frontend/src/index.html
- [ ] T020 [US1] Implement dashboard data loading and rendering logic in frontend/src/main.js
- [ ] T021 [P] [US1] Add dashboard styling for data cards, empty states, and error states in frontend/src/styles/dashboard.css
- [ ] T022 [US1] Implement manual refresh controls for each source in frontend/src/components/refreshControls.js
- [ ] T023 [US1] Persist last successful dashboard snapshot for fallback display in backend/src/repositories/dashboardSnapshotRepository.js

**Checkpoint**: User Story 1 is independently functional and demo-ready.

---

## Phase 4: User Story 2 - Goal Tracking Context (Priority: P2)

**Goal**: Allow users to set goal type and view progress summaries against that context.

**Independent Test**: Set each goal type and confirm progress summaries update after sync without manual recalculation.

- [ ] T024 [P] [US2] Create goal profile repository with active-goal queries in backend/src/repositories/goalRepository.js
- [ ] T025 [US2] Implement goal settings create/update endpoint in backend/src/routes/goalRoutes.js
- [ ] T026 [US2] Implement progress snapshot calculator service tied to active goal in backend/src/services/progressService.js
- [ ] T027 [US2] Add progress snapshot persistence and retrieval in backend/src/repositories/progressSnapshotRepository.js
- [ ] T028 [P] [US2] Create goal settings panel markup in frontend/src/components/goalSettings.js
- [ ] T029 [US2] Implement goal settings interactions and save flow in frontend/src/components/goalSettingsController.js
- [ ] T030 [US2] Render goal-aware progress summary widgets on dashboard in frontend/src/components/progressSummary.js
- [ ] T031 [P] [US2] Add goal-focused visual styles and state messaging in frontend/src/styles/goals.css

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Actionable Coaching Suggestions (Priority: P3)

**Goal**: Provide understandable workout and calorie recommendations based on recent trends.

**Independent Test**: With sufficient historical data, request recommendations and verify rationale, timestamp, and prior recommendation history are displayed.

- [ ] T032 [P] [US3] Create recommendations repository for current and historical reads/writes in backend/src/repositories/recommendationRepository.js
- [ ] T033 [US3] Implement rule-based coaching engine for load/reps and calories in backend/src/services/recommendationEngine.js
- [ ] T034 [US3] Implement recommendation generation endpoint with data sufficiency guardrails in backend/src/routes/recommendationRoutes.js
- [ ] T035 [US3] Implement recommendation history endpoint in backend/src/routes/recommendationHistoryRoutes.js
- [ ] T036 [P] [US3] Build recommendation panel UI and rationale display in frontend/src/components/recommendationsPanel.js
- [ ] T037 [US3] Wire recommendation fetch and render flow in frontend/src/components/recommendationsController.js
- [ ] T038 [P] [US3] Add recommendation-specific visual states for confidence and insufficiency in frontend/src/styles/recommendations.css

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, UX consistency, and performance hardening.

- [ ] T039 [P] Document setup, run commands, and local data behavior in README.md
- [ ] T040 Run linting/static analysis and resolve blocking findings in frontend/package.json
- [ ] T041 [P] Run linting/static analysis and resolve blocking findings in backend/package.json
- [ ] T042 Validate UX consistency across dashboard, goals, and recommendations flows in frontend/src/styles/base.css
- [ ] T043 Verify performance budgets for dashboard load and recommendation latency in backend/src/services/performanceCheck.js
- [ ] T044 [P] Add quickstart validation steps for manual acceptance checks in specs/001-fitness-progress-hub/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): Can start immediately.
- Foundational (Phase 2): Depends on Setup completion and blocks all user stories.
- User Story phases (Phases 3-5): Depend on Foundational completion.
- Polish (Phase 6): Depends on selected user stories being complete.

### User Story Dependencies

- US1 (P1): Starts after Phase 2; no dependency on US2/US3.
- US2 (P2): Starts after Phase 2; reuses US1 dashboard surfaces but remains independently testable.
- US3 (P3): Starts after Phase 2; consumes existing synced data and goal context.

### Story Completion Order

1. US1 (MVP baseline value)
2. US2 (goal-context value)
3. US3 (coaching value)

---

## Parallel Execution Opportunities

### Phase 1

- T003, T004, T005 can run in parallel after T001/T002.

### Phase 2

- T008 and T009 can run in parallel.
- T012 and T013 can run in parallel after T011.

### User Story 1

- T014 and T015 can run in parallel.
- T019 and T021 can run in parallel.

### User Story 2

- T024 and T028 can run in parallel.
- T031 can run in parallel with backend tasks after T026 starts.

### User Story 3

- T032 and T036 can run in parallel.
- T038 can run in parallel with T037.

### Polish

- T039, T041, and T044 can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Backend repositories in parallel
Task: "Create nutrition entries repository in backend/src/repositories/nutritionRepository.js"
Task: "Create workout sessions repository in backend/src/repositories/workoutRepository.js"

# Frontend UI shell in parallel
Task: "Build dashboard layout in frontend/src/index.html"
Task: "Add dashboard styling in frontend/src/styles/dashboard.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 setup.
2. Complete Phase 2 foundation.
3. Complete Phase 3 (US1).
4. Validate US1 independent test and ship MVP.

### Incremental Delivery

1. Add US2 for goal-aware progress.
2. Validate US2 independent test.
3. Add US3 for recommendation guidance.
4. Validate US3 independent test.
5. Execute Phase 6 polish and readiness checks.
