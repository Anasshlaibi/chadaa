import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductSection } from "@/components/ProductSection";
import { FeatureSection } from "@/components/FeatureSection";
import { Footer } from "@/components/Footer";
import Schema from "@/components/Schema";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trappe de Visite & Placo | Chada Alyasmin France",
  description: "Solutions premium pour le second œuvre. Trappes de visite acoustiques, coupe-feu et plaques BA13 certifiées NF.",
  keywords: "Trappe de visite, Isolation phonique, Plaque de plâtre NF, Cloison sèche, Paris, Lyon, Marseille",
};

export default function FrancePage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Schema lang="fr" />
      <Navbar lang="fr" />
      <HeroSection lang="fr" />
      <FeatureSection lang="fr" />
      <ProductSection lang="fr" />
      <Footer lang="fr" />
    </main>
  );
}
