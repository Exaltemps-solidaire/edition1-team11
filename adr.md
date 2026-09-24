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

### 2026-09-24 — Déploiement : Next.js en conteneur Node, pas de split frontend/api, pas de core-network

- **Décision**: Trois écarts documentés par rapport à `core-platform/app-builder-guidances/CCOE-RULES.md` (waivers, voir README "CCoE waivers") :
  1. Le frontend tourne dans un conteneur `node:22-alpine` (`next start` via `output: "standalone"`), pas `nginx:alpine` servant un `dist/` statique — le §2 impose TS+React+Vite, mais l'app est un Next.js App Router avec des Server Components asynchrones (`searchParams` pour le switch de persona), non exportable en statique sans réécriture du switch de persona en composant client.
  2. Un seul service `frontend` — pas de `api`/`worker` : l'app n'a aucun état persistant (données mockées en dur dans le bundle, voir la décision du 2026-09-24 juste au-dessus), donc pas de découpage à faire selon le §0 KISS des CCOE-RULES.
  3. `podman-compose.yml` ne rejoint pas `core-network` et l'image se build en local (pas de push vers `localhost:5000`) : rien dans l'app ne parle à Postgres/Valkey/le gateway LLM/l'object store, donc rejoindre le réseau partagé n'apporte rien pour l'instant. Vérifié : le réseau `core-network` n'existe même pas sur cette machine (le stack `core-platform/` n'est pas déployé), donc le rejoindre aurait bloqué tout déploiement pour zéro bénéfice actuel.
- **Contexte**: La machine du hackathon a son propre proxy d'entrée qui ne redirige que les ports 8080 (front) et 8081 (api) — voir le `CLAUDE.md` de premier niveau, point 1. Ce fichier prime sur les CCOE-RULES pour les ports ; les trois écarts ci-dessus, eux, ne sont pas couverts par ce fichier et restent de vraies dérogations aux CCOE-RULES, choisies après un ⚠️/❓ explicite avec l'utilisateur.
- **Alternatives considérées**:
  - Réécrire le switch de persona en client-side pour permettre `next export` + nginx statique — reste un waiver sur le framework (Next.js ≠ Vite), pour un gain de conformité partiel ; écarté pour cette itération faute de temps.
  - Réécriture complète en Vite + React — conformité stricte au §2, mais réécriture des 6 composants + tests existants ; disproportionné pour l'état actuel du produit (hackathon, données mockées).
  - Démarrer tout le stack `core-platform/` (11 services) juste pour disposer du réseau/registry — rejeté par le §0 KISS : aucun de ces services n'est consommé aujourd'hui.
- **Conséquences / trade-offs acceptés**: Ces trois écarts sont à révisiter dès qu'un vrai besoin apparaît — un service `api` réel (persistance, LLM) redevient nécessaire, ou l'app doit consommer un service du core platform (Postgres, `llm.internal`...). À ce moment-là : rejoindre `core-network`, pousser les images vers `registry.internal`, et reconsidérer le rendu statique. Le pipeline `.gitlab-ci.yml`/`podman-compose.yml` copiés depuis les templates ont été adaptés en conséquence (pas de job `provision`, pas de service `api`/`worker`, `verify` ne teste que le port 8080).
