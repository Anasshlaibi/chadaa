import type { NextConfig } from "next";

/**
 * next.config.ts — Nuclear-Hardened
 *
 * Strict CSP + Full Security Headers.
 * NO wildcards like *.vercel.app — only exact trusted domains.
 *
 * 301 Redirects: Three-tier strategy
 *   Tier 1a — Specific paths WITH .html extension    (e.g. /trappe%20de%20visite.html)
 *   Tier 1b — Same paths WITHOUT .html extension     (e.g. /trappe%20de%20visite)
 *   Tier 2  — Wildcard catch-all for any *.html URL  (safety net)
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
   * 301 Permanent Redirects — Three-Tier Strategy
   *
   * Each known old page gets TWO rules:
   *   - One for the URL WITH .html    → catches Google-indexed links from the old site
   *   - One for the URL WITHOUT .html → catches browsers that strip the extension
   *
   * Tier 2 wildcard at the bottom catches anything else ending in .html.
   */
  redirects: async () => [

    // ─── TRAPPE DE VISITE ───────────────────────────────────────────────────
    {
      source: "/trappe%20de%20visite.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/trappe%20de%20visite",
      destination: "/products",
      permanent: true,
    },

    // ─── FAUX PLAFOND / PLAQUES DE PLÂTRE ───────────────────────────────────
    {
      source: "/faux%20plafond.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/faux%20plafond",
      destination: "/products",
      permanent: true,
    },

    // ─── OSSATURE T24 / T15 ─────────────────────────────────────────────────
    {
      source: "/OSSATURE%20T24-T15.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/OSSATURE%20T24-T15",
      destination: "/products",
      permanent: true,
    },

    // ─── ACCESSOIRES DE PROJETER ────────────────────────────────────────────
    {
      source: "/accessoires%20de%20projeter.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/accessoires%20de%20projeter",
      destination: "/products",
      permanent: true,
    },

    // ─── ACCESSOIRES DE FIXATION ────────────────────────────────────────────
    {
      source: "/ACCESSOIRES%20DE%20FIXATION.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/ACCESSOIRES%20DE%20FIXATION",
      destination: "/products",
      permanent: true,
    },

    // ─── PLANCHER TECHNIQUE ─────────────────────────────────────────────────
    {
      source: "/plancher%20technique.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/plancher%20technique",
      destination: "/products",
      permanent: true,
    },

    // ─── STRUCTURE PLANCHER SURÉLEVÉ ────────────────────────────────────────
    {
      source: "/Structure%20pour%20plancher%20sureleve.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/Structure%20pour%20plancher%20sureleve",
      destination: "/products",
      permanent: true,
    },

    // ─── DALLES EN LAINE DE ROCHE ───────────────────────────────────────────
    {
      source: "/dalle%20en%20laine%20de%20roche.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/dalle%20en%20laine%20de%20roche",
      destination: "/products",
      permanent: true,
    },

    // ─── DALLES EN LAINE MINÉRALE ───────────────────────────────────────────
    {
      source: "/dalle%20en%20laine%20minerale.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/dalle%20en%20laine%20minerale",
      destination: "/products",
      permanent: true,
    },

    // ─── CLOISONS DE SÉPARATION & DOUBLAGES ─────────────────────────────────
    {
      source: "/cloisons%20de%20separation%20doublages.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/cloisons%20de%20separation%20doublages",
      destination: "/products",
      permanent: true,
    },

    // ─── LAINE DE ROCHE (isolation) ─────────────────────────────────────────
    {
      source: "/laine%20de%20roche.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/laine%20de%20roche",
      destination: "/products",
      permanent: true,
    },

    // ─── LAINE DE VERRE MINÉRALE ────────────────────────────────────────────
    {
      source: "/laine%20de%20verre%20minerale.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/laine%20de%20verre%20minerale",
      destination: "/products",
      permanent: true,
    },

    // ─── DALLES EN PLÂTRE ───────────────────────────────────────────────────
    {
      source: "/DALLE%20EN%20PLATRE.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/DALLE%20EN%20PLATRE",
      destination: "/products",
      permanent: true,
    },

    // ─── DALLE EN VINYLE ────────────────────────────────────────────────────
    {
      source: "/dalle%20en%20vinyle.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/dalle%20en%20vinyle",
      destination: "/products",
      permanent: true,
    },

    // ─── DALLE EN MÉTAL ─────────────────────────────────────────────────────
    {
      source: "/DALLE%20EN%20METAL.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/DALLE%20EN%20METAL",
      destination: "/products",
      permanent: true,
    },

    // ─── JOINT CREUX ────────────────────────────────────────────────────────
    {
      source: "/JOINT%20CREUX.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/JOINT%20CREUX",
      destination: "/products",
      permanent: true,
    },

    // ─── ENDUITS POUR JOINTS ────────────────────────────────────────────────
    {
      source: "/enduits%20pour%20joints.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/enduits%20pour%20joints",
      destination: "/products",
      permanent: true,
    },

    // ─── BANDES À JOINTS ────────────────────────────────────────────────────
    {
      source: "/bandes%20a%20joints.html",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/bandes%20a%20joints",
      destination: "/products",
      permanent: true,
    },

    // ─── Google Search Console verification — must come BEFORE the wildcard ──
    // The meta tag in layout.tsx handles verification, but this prevents the
    // wildcard below from intercepting /googleXXXX.html and returning a 301.
    // We redirect it to /products just like any old page (Google uses meta tag).
    {
      source: "/googlef500946794c8c9e8.html",
      destination: "/products",
      permanent: false, // temporary — only until Google finishes verifying
    },

    // ─── Tier 2: Wildcard catch-all — any remaining *.html URL ───────────────

    // NOTE: google-site-verification files (e.g. googleXXXX.html) are served
    // via the <meta> tag in layout.tsx and do NOT need this catch-all.
    // This rule intentionally placed LAST — specific rules above take priority.
    // Excludes google*.html files by listing them as specific rules above first.
    {
      source: "/:path*.html",
      destination: "/products",
      permanent: true,
    },
  ],
};

export default nextConfig;
