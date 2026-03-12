# Phase 0 Research: Fitness Progress Hub

## Decision 1: Architecture split between Vite frontend and minimal Node backend
- Decision: Use a Vite-powered frontend (vanilla HTML/CSS/JS) and a small Node.js backend service for external API integration and SQLite persistence.
- Rationale: Browser code cannot safely manage API credentials or direct SQLite access. A lightweight backend keeps libraries minimal while enabling secure integrations and local persistence.
- Alternatives considered:
  - Frontend-only app with direct third-party API calls (rejected: token exposure, CORS risk, no SQLite access in browser).
  - Full-stack framework (rejected: adds unnecessary abstraction and dependencies for current scope).

## Decision 2: Keep UI stack vanilla inside Vite
- Decision: Implement UI with plain HTML templates, CSS modules/files, and vanilla JavaScript modules; avoid component frameworks.
- Rationale: Matches requirement to use minimal libraries and keeps UX fast and understandable.
- Alternatives considered:
  - React/Vue/Svelte (rejected: unnecessary runtime/dependency cost for current functionality).

## Decision 3: External nutrition source via OpenFoodFacts
- Decision: Use OpenFoodFacts as nutrition source for food metadata/search and normalize responses into internal Nutrition Entry records.
- Rationale: OpenFoodFacts is free to use, aligns with user request, and provides broad product nutrition data.
- Alternatives considered:
  - Continue with MyFitnessPal integration (rejected: user requested OpenFoodFacts as free alternative).
  - Manual nutrition data entry only (rejected: lower utility and more user effort).

## Decision 4: External workout source via Hevy API abstraction
- Decision: Integrate Hevy via backend adapter that fetches recent workouts and maps them into internal Workout Session records.
- Rationale: Supports user requirement to display latest workouts while isolating provider-specific details from the rest of the app.
- Alternatives considered:
  - Directly model app around Hevy response schema (rejected: tighter coupling, harder to replace provider).
  - Manual workout logging only (rejected: does not satisfy source integration requirement).

## Decision 5: Image storage strategy (local files + SQLite metadata)
- Decision: Store image binaries on local disk under an app-managed folder and store only metadata/paths in SQLite.
- Rationale: Satisfies explicit requirement that images are not uploaded and metadata is stored locally.
- Alternatives considered:
  - Store image blobs directly in SQLite (rejected: larger DB size, reduced portability and backup ergonomics).
  - Cloud object storage (rejected: conflicts with requirement).

## Decision 6: SQLite access approach
- Decision: Use a synchronous local SQLite driver on backend and a simple repository layer for reads/writes.
- Rationale: Minimizes complexity while providing deterministic local persistence and straightforward schema management.
- Alternatives considered:
  - ORM-heavy solution (rejected: extra abstraction and dependencies).
  - In-memory persistence (rejected: does not meet persistence requirements).

## Decision 7: Coaching recommendation scope for first release
- Decision: Implement rule-based recommendation engine for initial release using recent trend windows and explicit thresholds.
- Rationale: Delivers practical guidance quickly without introducing ML infrastructure, and stays understandable to users.
- Alternatives considered:
  - LLM/agent-driven coaching as core in v1 (rejected: higher complexity, non-determinism, dependency overhead).
  - No recommendations in v1 (rejected: feature spec includes initial guidance capability).

## Decision 8: Performance and quality validation strategy
- Decision: Define measurable UI and API latency budgets and enforce via automated tests plus lightweight profiling checks.
- Rationale: Required by constitution and success criteria; prevents regressions while keeping toolchain simple.
- Alternatives considered:
  - Manual spot checks only (rejected: not repeatable, weak gate).
  - Extensive observability platform at v1 (rejected: overkill for local-first app).

## Clarifications Resolved
- Authentication mode: Use user-provided API credentials/tokens stored locally with encryption-at-rest where feasible; never expose secrets in frontend bundle.
- Target runtime: Desktop-class local development/deployment environment running modern browser + Node backend.
- Data retention: Keep user data until explicit user deletion.
