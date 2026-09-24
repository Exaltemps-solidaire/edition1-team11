# edition1-team11

Hackathon — application de l'équipe edition1-team11.

## Overview

Parcours d'onboarding pour les nouveaux professionnels de l'association
La Sauvegarde du Nord : suivi du parcours (P1-1), personne référente
(P1-2), kit de documents ciblé par métier (P1-3). Voir
[docs/backlog.md](docs/backlog.md) pour le détail des user stories.

## Ports

Conformément au `CLAUDE.md` de premier niveau (qui prime sur le ports
contract de `core-platform/app-builder-guidances/README.md` sur cette
machine) : seuls les ports **8080** (front) et **8081** (api) sont
redirigés par le proxy d'entrée du hackathon.

| Port | Service |
|---|---|
| 8080 | Frontend (Next.js, `next start`) |
| 8081 | Réservé pour une future API — non utilisé aujourd'hui |

## Getting started

```bash
npm ci
npm run build          # next build (output: "standalone")
gitlab-ci-local --force-shell-executor                              # build image + deploy + verify
gitlab-ci-local --force-shell-executor --variable ACTION=stop        # stop
gitlab-ci-local --force-shell-executor --variable ACTION=purge       # purge

# Sans CI :
APP=exaltemps-solidaire TAG=dev podman build -t "${APP}-frontend:${TAG}" .
APP=exaltemps-solidaire TAG=dev podman compose -p "$APP" up -d
```

L'app est ensuite servie sur http://localhost:8080.

## Design vocabulary

Design system propre (`src/app/globals.css`, tokens `--encre`/`--ardoise`/
`--papier`/`--appui`/`--alerte`), calqué sur `passation/prototype/index.html`
(le prototype cliquable validé par la squad) — pas le thème `core` du
CCoE (§7.1 : choix justifié, prototype déjà designé et validé avant
l'intégration à la plateforme).

## Code language

Français (identifiants métier : `persona`, `parcours`, `referent`, `kit`,
`jalon`...) — cohérent avec le domaine (association francophone) et la
documentation de cadrage dans `passation/`.

## Tested critical paths

- Calcul du statut d'un jalon de parcours (`src/lib/onboarding/status.test.ts`)
- Rendu de l'écran de parcours (`OnboardingScreen.test.tsx`)
- Écran personne référente, y compris l'état vide quand aucune référente
  n'est désignée (`ReferentScreen.test.tsx`)
- Filtrage du kit de documents par métier (`KitScreen.test.tsx`)

Voir [docs/testing-guidelines.md](docs/testing-guidelines.md).

## Performance

Aucun endpoint API — toutes les données sont des fixtures TypeScript
importées directement par les Server Components (voir `adr.md`,
2026-09-24). Rien à mesurer côté p99 pour l'instant.

## Personal data register

None. Les personas (Théo, Julien, Sophie) sont des données de démonstration
fictives, pas des données personnelles réelles.

## External data sources

None.

## Exposed interfaces

Aucune API REST exposée aujourd'hui — voir "CCoE waivers" ci-dessous.

## LLM FinOps

None.

## Durable workflows

None.

## Libraries outside the recommendations

Next.js (App Router) au lieu de Vite pour le frontend — voir "CCoE
waivers".

## Structuring decisions

Voir `adr.md` (log complet, append-only).

## CCoE waivers

Trois écarts par rapport à `core-platform/app-builder-guidances/CCOE-RULES.md`,
tous documentés en détail dans `adr.md` (entrée du 2026-09-24, "Déploiement") :

1. **Frontend en Next.js servi par un conteneur Node** (`next start`, image
   `node:22-alpine`), pas de `nginx:alpine` + `dist/` statique — le §2
   impose TS+React+Vite ; l'app utilise des Server Components asynchrones
   (switch de persona par `searchParams`) non exportables en statique sans
   réécriture. Pas d'expiration fixée : à revoir si le besoin de
   conformité stricte au stack imposé devient un critère de review.
2. **Un seul service `frontend`**, pas de `api`/`worker` (§3 structure) —
   zéro état persistant aujourd'hui (§0 KISS). À lever dès qu'un vrai
   besoin de persistance ou de traitement asynchrone apparaît.
3. **Pas de `core-network` / registre local** — l'app ne consomme aucun
   service du core platform (Postgres, Valkey, LLM gateway, object
   store) ; le réseau `core-network` n'existe même pas sur cette machine
   (le stack `core-platform/` n'est pas déployé). À lever dès qu'un
   service du core platform devient nécessaire (ex. `llm.internal` pour
   du RAG).

Accordés le 2026-09-24, discutés explicitement avec l'utilisateur avant
implémentation (voir la question posée en conversation).
