# Single-stage, runtime only (CCOE-RULES.md §3.1) — `npm run build` runs
# explicitly in .gitlab-ci.yml, this Dockerfile only COPYs the result.
#
# No frontend/ subdirectory (§3 normally wants one per module): this app has
# a single service today, splitting would move the whole Next.js tree for no
# benefit (§0 KISS). See README "CCoE waivers".
FROM docker.io/library/node:22-alpine
WORKDIR /app

# `output: "standalone"` (next.config.ts) traces the minimal server.js +
# node_modules needed at runtime — no COPY of package.json/full node_modules.
COPY .next/standalone/ ./
COPY .next/static/ ./.next/static/
COPY public/ ./public/

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
EXPOSE 8080

USER node
CMD ["node", "server.js"]
