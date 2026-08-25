import type { Metadata } from "next";
import { Suspense } from 'react';
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import FloatingContact from "@/components/FloatingContact";
import CartNotification from "@/components/CartNotification";
import QuotePanel from "@/components/QuotePanel";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chadaalyasmin.ma'),
  title: {
    default: "Chada Alyasmin | Matériaux de Second Œuvre au Maroc",
    template: "%s | Chada Alyasmin"
  },
  description: "Fabricant et distributeur de matériaux de second œuvre et finition au Maroc : Trappes de visite, plaques de plâtre BA13, ossatures métalliques, joints creux et isolation thermo-acoustique à Casablanca.",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  alternates: {
    canonical: 'https://chadaalyasmin.ma',
    languages: {
      'fr-MA': 'https://chadaalyasmin.ma',
      'ar-MA': 'https://chadaalyasmin.ma/ma',
      'en-MA': 'https://chadaalyasmin.ma/en',
      'x-default': 'https://chadaalyasmin.ma',
    },
  },
  keywords: [
    "matériaux de second œuvre Maroc",
    "matériaux de construction Casablanca",
    "trappe de visite Maroc",
    "plaque de plâtre BA13 Casablanca",
    "faux plafond suspendu Maroc",
    "laine de roche isolation Maroc",
    "joint creux aluminium",
    "dalles de plafond 600x600",
    "fournisseur second oeuvre Casablanca",
    "prix matériaux second oeuvre Maroc"
  ],
  openGraph: {
    title: "Chada Alyasmin | Matériaux de Second Œuvre & Finition au Maroc",
    description: "Expertise en aménagement et finition : Faux plafonds, Trappes de visite, Isolation. Stock permanent à Casablanca et livraison partout au Maroc.",
    url: 'https://chadaalyasmin.ma',
    siteName: 'Chada Alyasmin',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Chada Alyasmin Logo - Second Oeuvre Maroc',
      },
    ],
    locale: 'fr_MA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chada Alyasmin | Matériaux de Second Œuvre au Maroc',
    description: 'Trappes de visite, plaques BA13, faux plafonds, joints creux et isolation thermo-acoustique au Maroc.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="pn5AwAPSTE2a5lER7SHva-kUJJkQnpzA0ZPSP0k5ITI" />
        <meta name="google-site-verification" content="f500946794c8c9e8" />

        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1161859512197703');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1161859512197703&ev=PageView&noscript=1"
            alt="facebook pixel"
          />
        </noscript>
      </head>
      <body className={`${outfit.variable} antialiased bg-gray-50`}>
        <CartProvider>
          <Suspense fallback={<div className="h-20" />}>
            <Navbar />
          </Suspense>
          <CartNotification />
          <QuotePanel />
          <FloatingContact />
          <main className="min-h-screen flex flex-col">
            <div className="grow pb-[70px] lg:pb-0">
              {children}
            </div>
          </main>
          <Footer />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
