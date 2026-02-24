import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chada Alyasmin | Leader du Second Œuvre au Maroc",
  description: "Expertise en aménagement et finition : Faux plafonds, Trappes de visite, Isolation. Qualité certifiée NF et RT2020.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
