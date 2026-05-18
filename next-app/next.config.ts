import type { NextConfig } from "next";

/**
 * next.config.ts — Nuclear-Hardened
 *
 * Strict CSP + Full Security Headers.
 * NO wildcards like *.vercel.app — only exact trusted domains.
 *
 * 301 Redirects: Two-tier strategy
 *   1. Specific rules for every known old .html page (from products.ts oldUrl fields)
 *   2. Wildcard catch-all for any remaining .html URL
 */

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://*.supabase.co https://*.googleusercontent.com https://images.unsplash.com",
  "font-src 'self' https://fonts.gstatic.com",
  // NO *.vercel.app — a hacker can deploy hacker.vercel.app and your browser would trust it
  "connect-src 'self' https://*.supabase.co https://*.googleapis.com",
  "frame-src 'self' https://www.google.com https://www.google.fr https://www.google.ma https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
];

const cspHeader = cspDirectives.join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspHeader },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      'camera=(), microphone=(), geolocation=(self "https://www.google.com" "https://www.google.fr" "https://www.google.ma"), payment=()',
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "znhhzbpmqemappldctpw.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
  ],

  /**
   * 301 Permanent Redirects
   *
   * Tier 1 — Specific paths extracted from products.ts `oldUrl` fields.
   *   Each old standalone HTML page maps directly to /products.
   *   Listing these explicitly gives search engines the clearest possible
   *   signal about which exact URLs have moved permanently.
   *
   * Tier 2 — Wildcard catch-all for any remaining *.html URL not listed above.
   *   Acts as a safety net for URLs that may be indexed but not yet in products.ts.
   *
   * NOTE: Next.js evaluates redirects in order — specific rules must come FIRST,
   * before the wildcard, to avoid the catch-all swallowing them.
   */
  redirects: async () => [
    // ─── Tier 1: Specific old HTML pages (from products.ts oldUrl fields) ───

    // Trappe de Visite
    {
      source: "/trappe%20de%20visite.html",
      destination: "/products",
      permanent: true,
    },

    // Faux Plafond / Plaques de Plâtre / Ossature Métallique (faux plafond.html)
    {
      source: "/faux%20plafond.html",
      destination: "/products",
      permanent: true,
    },

    // Ossature T24 / T15 modulaires
    {
      source: "/OSSATURE%20T24-T15.html",
      destination: "/products",
      permanent: true,
    },

    // Accessoires de Projeter (machine à projeter PFT)
    {
      source: "/accessoires%20de%20projeter.html",
      destination: "/products",
      permanent: true,
    },

    // Accessoires de Fixation
    {
      source: "/ACCESSOIRES%20DE%20FIXATION.html",
      destination: "/products",
      permanent: true,
    },

    // Plancher Technique
    {
      source: "/plancher%20technique.html",
      destination: "/products",
      permanent: true,
    },

    // Structure pour Plancher Surélevé
    {
      source: "/Structure%20pour%20plancher%20sureleve.html",
      destination: "/products",
      permanent: true,
    },

    // Dalles en Laine de Roche (Rockfon / AMF)
    {
      source: "/dalle%20en%20laine%20de%20roche.html",
      destination: "/products",
      permanent: true,
    },

    // Dalles en Laine Minérale (Thermatex)
    {
      source: "/dalle%20en%20laine%20minerale.html",
      destination: "/products",
      permanent: true,
    },

    // Cloisons de Séparation & Doublages
    {
      source: "/cloisons%20de%20separation%20doublages.html",
      destination: "/products",
      permanent: true,
    },

    // Laine de Roche (isolation — Rockmur)
    {
      source: "/laine%20de%20roche.html",
      destination: "/products",
      permanent: true,
    },

    // Laine de Verre Minérale (isolation)
    {
      source: "/laine%20de%20verre%20minerale.html",
      destination: "/products",
      permanent: true,
    },

    // Dalles en Plâtre
    {
      source: "/DALLE%20EN%20PLATRE.html",
      destination: "/products",
      permanent: true,
    },

    // Dalle en Vinyle
    {
      source: "/dalle%20en%20vinyle.html",
      destination: "/products",
      permanent: true,
    },

    // Dalle en Métal
    {
      source: "/DALLE%20EN%20METAL.html",
      destination: "/products",
      permanent: true,
    },

    // Joint Creux
    {
      source: "/JOINT%20CREUX.html",
      destination: "/products",
      permanent: true,
    },

    // Enduits pour Joints
    {
      source: "/enduits%20pour%20joints.html",
      destination: "/products",
      permanent: true,
    },

    // Bandes à Joints
    {
      source: "/bandes%20a%20joints.html",
      destination: "/products",
      permanent: true,
    },

    // ─── Tier 2: Wildcard catch-all — any remaining *.html URL ───
    // Covers any old pages not yet listed above (e.g., contact.html, index.html, etc.)
    {
      source: "/:path*.html",
      destination: "/products",
      permanent: true,
    },
  ],
};

export default nextConfig;
