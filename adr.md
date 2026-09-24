# Architecture Decision Record (ADR)

This file is the **single log** of the project's architecture decisions (framework/library choices, structural patterns, trade-offs with lasting impact).

## Why this file

- **Memory of the "why"**: the code shows *what*, the Git history shows *when*, but neither explains why one option was chosen over another. This file fills that gap.
- **Avoid re-litigating the same debates**: before any proposal with architectural impact, this file must be consulted so as not to contradict or silently redo a decision that's already been made.
- **Onboarding**: anyone (human or AI agent) joining the project can quickly understand the structuring choices and their trade-offs without having to ask the original authors.
- **Traceability of trade-offs**: each entry documents the alternatives considered and the consequences accepted, making it possible to judge later whether a decision should be revisited with full knowledge of the facts.

## Usage rules

- **Append-only**: this file is a chronological log, not a document to rewrite. New entries are added; existing entries are not modified.
- **One entry per structuring decision**, with at minimum:
  - Date
  - Decision (what was chosen)
  - Context / problem being solved
  - Alternatives considered
  - Consequences / trade-offs accepted
- If a past decision needs to be revisited, the new entry must say so explicitly rather than ignoring it.

---

## Decision log

### 2026-09-21 — Testing stack: Vitest + React Testing Library, Playwright for e2e later

- **Decision**: Adopt Vitest + React Testing Library as the standard for unit/component/integration tests, and Playwright for end-to-end tests once critical user flows exist. Documented in [docs/testing-guidelines.md](docs/testing-guidelines.md).
- **Context**: `docs/testing-guidelines.md` was referenced by CLAUDE.md but did not exist, and no test tooling was installed in the project (fresh Next.js 16 scaffold, no `test` script, no test dependencies).
- **Alternatives considered**:
  - Jest — more established with React historically, but slower and needs more config for ESM/TypeScript with Next.js 16; Vitest has largely superseded it for new projects.
  - Cypress for e2e — viable, but Playwright has better multi-browser support and faster CI execution.
- **Consequences / trade-offs accepted**: Tooling (Vitest, RTL, config, `test` script) is not yet installed — this is deliberately left as a separate, explicit task rather than bundled with the guidelines doc, to keep changes minimal and scoped. Playwright is deferred until there is an actual critical user flow worth covering, to avoid testing infrastructure ahead of real product surface.

### 2026-09-21 — Vitest + React Testing Library tooling installed

- **Decision**: Install and wire up the tooling decided above: `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` as dev dependencies; `vitest.config.mts` (jsdom environment, native Vite tsconfig-paths resolution) and `vitest.setup.ts`; `npm test` and `npm run test:watch` scripts.
- **Context**: Follow-up to the same-day decision above — the guidelines existed but tooling did not. `@types/node` had to be bumped from `^20` to `^24` in `package.json` because Vitest 5 requires `@types/node` `^22 || >=24` as a peer, and the local Node runtime is v24.
- **Alternatives considered**: Used `vite-tsconfig-paths` plugin initially, then switched to Vite's native `resolve.tsconfigPaths: true` (Vite now supports this natively, removing an extra dependency and a deprecation warning).
- **Consequences / trade-offs accepted**: `@types/node` moving to `^24` narrows the supported Node range for type-checking to newer Node versions — acceptable since the local/dev runtime is already v24. Verified `npm run lint`, `npm run build`, and `npm test` all pass after the change.

### 2026-09-24 — Onboarding data (P1-1, P1-2) served from hardcoded TypeScript fixtures, not an API

- **Decision**: `PERSONAS`, `PARCOURS` (`src/lib/onboarding/personas.ts`) and `REFERENTS` (`src/lib/onboarding/referents.ts`) are hardcoded, typed `Record<PersonaId, ...>` objects imported directly by server components. There is no API route, no database, no fetch layer. A query param (`/?persona=theo|julien|sophie`, `/referent?persona=...`) switches the mocked persona for demo purposes, standing in for real auth/identity.
- **Context**: `docs/backlog.md` (source: `passation/cadrage/3-backlog.md`) defines P1-1/P1-2/P1-3 against three personas, but no backend, data source, or auth exists yet for this hackathon project — deciding on one was explicitly out of scope for delivering the first two user stories. Building against fixtures now lets the UI/UX and business logic (jalon status computation, referent lookup) be implemented and tested immediately.
- **Alternatives considered**:
  - Stand up a minimal API/DB now — rejected: premature, no decision yet on what persistence layer this hackathon project should use, and it would slow down delivering P1-1/P1-2 for no product benefit yet.
  - Local component state / context provider for the mocked data — rejected: the data is static per persona and read-only in these two US, so plain imported constants are simpler than wiring state management for nothing.
- **Consequences / trade-offs accepted**: Swapping to a real data source later means introducing a fetch/data-access layer and likely reshaping `PersonaId`-keyed lookups into async calls — accepted as a known, deferred cost. Referent data is only mocked for Théo; `REFERENTS.julien`/`REFERENTS.sophie` are explicitly `null` rather than invented data, and `ReferentScreen` renders an explicit empty state in that case (see `docs/backlog.md`, P1-2) — this must not be papered over with placeholder contacts when a real data source is wired in.
