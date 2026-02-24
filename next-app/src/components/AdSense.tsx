"use client";

import Script from "next/script";

export default function AdSense() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!clientId) {
    console.warn("AdSense client ID is missing.");
    return null;
  }

  return (
    <Script
      data-ad-client={clientId}
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
