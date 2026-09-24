import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// CCoE-RULES.md §3.2 requires CSP + anti-framing headers on the frontend.
// The canonical nginx.conf template can't apply here (Next.js runs its own
// Node server, see adr.md "Déploiement" + README "CCoE waivers"), so the
// same header set is reproduced through next.config.ts `headers()`.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`;

const nextConfig: NextConfig = {
  // Docker/podman deployment (§3.1): the Dockerfile only COPYs build
  // artifacts, no multistage. Standalone bundles a minimal server.js +
  // its own node_modules — nothing else to COPY.
  output: "standalone",

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
