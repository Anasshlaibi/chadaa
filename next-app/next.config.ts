import type { NextConfig } from "next";

/**
 * next.config.ts — Production Hardened for Chada Alyasmin
 *
 * Strict CSP + Full Security Headers.
 * 301 Redirects: Clean canonical URLs, legacy .html mapping, and multilingual deduplication.
 * AI & LLM Machine-readable endpoint rewrites.
 */

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://*.supabase.co https://*.googleusercontent.com https://images.unsplash.com https://www.facebook.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://*.supabase.co https://*.googleapis.com https://www.facebook.com",
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
  turbopack: {
    root: process.cwd(),
  },
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

  rewrites: async () => [
    {
      source: "/ai/catalog.json",
      destination: "/ai/catalog",
    },
    {
      source: "/ai/products.json",
      destination: "/ai/products",
    },
    {
      source: "/ai/categories.json",
      destination: "/ai/categories",
    },
    {
      source: "/ai/company.json",
      destination: "/ai/company",
    },
  ],

  /**
   * 301 Permanent Redirects — Three-Tier Strategy
   */
  redirects: async () => [
    // ─── Multilingual Canonical Deduplication ───
    {
      source: "/fr",
      destination: "/",
      permanent: true,
    },

    // ─── Legacy HTML URLs Redirects ───
    // TRAPPE DE VISITE
    {
      source: "/trappe%20de%20visite.html",
      destination: "/products/trappes-de-visite",
      permanent: true,
    },
    {
      source: "/trappe%20de%20visite",
      destination: "/products/trappes-de-visite",
      permanent: true,
    },

    // FAUX PLAFOND / PLAQUES DE PLÂTRE
    {
      source: "/faux%20plafond.html",
      destination: "/products/plaques-de-platre",
      permanent: true,
    },
    {
      source: "/faux%20plafond",
      destination: "/products/plaques-de-platre",
      permanent: true,
    },

    // OSSATURE T24 / T15
    {
      source: "/OSSATURE%20T24-T15.html",
      destination: "/products/ossature-metallique",
      permanent: true,
    },
    {
      source: "/OSSATURE%20T24-T15",
      destination: "/products/ossature-metallique",
      permanent: true,
    },

    // ACCESSOIRES DE PROJETER
    {
      source: "/accessoires%20de%20projeter.html",
      destination: "/products/accessoires",
      permanent: true,
    },
    {
      source: "/accessoires%20de%20projeter",
      destination: "/products/accessoires",
      permanent: true,
    },

    // ACCESSOIRES DE FIXATION
    {
      source: "/ACCESSOIRES%20DE%20FIXATION.html",
      destination: "/products/accessoires",
      permanent: true,
    },
    {
      source: "/ACCESSOIRES%20DE%20FIXATION",
      destination: "/products/accessoires",
      permanent: true,
    },

    // PLANCHER TECHNIQUE
    {
      source: "/plancher%20technique.html",
      destination: "/products/planchers-techniques",
      permanent: true,
    },
    {
      source: "/plancher%20technique",
      destination: "/products/planchers-techniques",
      permanent: true,
    },

    // STRUCTURE PLANCHER SURÉLEVÉ
    {
      source: "/Structure%20pour%20plancher%20sureleve.html",
      destination: "/products/planchers-techniques",
      permanent: true,
    },
    {
      source: "/Structure%20pour%20plancher%20sureleve",
      destination: "/products/planchers-techniques",
      permanent: true,
    },

    // DALLES EN LAINE DE ROCHE
    {
      source: "/dalle%20en%20laine%20de%20roche.html",
      destination: "/products/dalles-de-plafond",
      permanent: true,
    },
    {
      source: "/dalle%20en%20laine%20de%20roche",
      destination: "/products/dalles-de-plafond",
      permanent: true,
    },

    // DALLES EN LAINE MINÉRALE
    {
      source: "/dalle%20en%20laine%20minerale.html",
      destination: "/products/dalles-de-plafond",
      permanent: true,
    },
    {
      source: "/dalle%20en%20laine%20minerale",
      destination: "/products/dalles-de-plafond",
      permanent: true,
    },

    // CLOISONS DE SÉPARATION & DOUBLAGES
    {
      source: "/cloisons%20de%20separation%20doublages.html",
      destination: "/products/plaques-de-platre",
      permanent: true,
    },
    {
      source: "/cloisons%20de%20separation%20doublages",
      destination: "/products/plaques-de-platre",
      permanent: true,
    },

    // LAINE DE ROCHE (isolation)
    {
      source: "/laine%20de%20roche.html",
      destination: "/products/isolation",
      permanent: true,
    },
    {
      source: "/laine%20de%20roche",
      destination: "/products/isolation",
      permanent: true,
    },

    // LAINE DE VERRE MINÉRALE
    {
      source: "/laine%20de%20verre%20minerale.html",
      destination: "/products/isolation",
      permanent: true,
    },
    {
      source: "/laine%20de%20verre%20minerale",
      destination: "/products/isolation",
      permanent: true,
    },

    // DALLES EN PLÂTRE
    {
      source: "/DALLE%20EN%20PLATRE.html",
      destination: "/products/dalles-de-plafond",
      permanent: true,
    },
    {
      source: "/DALLE%20EN%20PLATRE",
      destination: "/products/dalles-de-plafond",
      permanent: true,
    },

    // DALLE EN VINYLE
    {
      source: "/dalle%20en%20vinyle.html",
      destination: "/products/dalles-de-plafond",
      permanent: true,
    },
    {
      source: "/dalle%20en%20vinyle",
      destination: "/products/dalles-de-plafond",
      permanent: true,
    },

    // DALLE EN MÉTAL
    {
      source: "/DALLE%20EN%20METAL.html",
      destination: "/products/dalles-de-plafond",
      permanent: true,
    },
    {
      source: "/DALLE%20EN%20METAL",
      destination: "/products/dalles-de-plafond",
      permanent: true,
    },

    // JOINT CREUX
    {
      source: "/JOINT%20CREUX.html",
      destination: "/products/joints-creux",
      permanent: true,
    },
    {
      source: "/JOINT%20CREUX",
      destination: "/products/joints-creux",
      permanent: true,
    },

    // ENDUITS POUR JOINTS
    {
      source: "/enduits%20pour%20joints.html",
      destination: "/products/accessoires",
      permanent: true,
    },
    {
      source: "/enduits%20pour%20joints",
      destination: "/products/accessoires",
      permanent: true,
    },

    // BANDES À JOINTS
    {
      source: "/bandes%20a%20joints.html",
      destination: "/products/accessoires",
      permanent: true,
    },
    {
      source: "/bandes%20a%20joints",
      destination: "/products/accessoires",
      permanent: true,
    },

    // Google Search Console verification
    {
      source: "/googlef500946794c8c9e8.html",
      destination: "/products",
      permanent: false,
    },

    // Tier 2: Wildcard catch-all
    {
      source: "/:path*.html",
      destination: "/products",
      permanent: true,
    },
  ],
};

export default nextConfig;
