import { HeroSection } from "@/components/HeroSection";
import { ProductSection } from "@/components/ProductSection";
import { FeatureSection } from "@/components/FeatureSection";
import Schema from "@/components/Schema";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achat BA13 & Trappes de Visite Casablanca | Chada Alyasmin Maroc",
  description: "Meilleur prix BA13 au Maroc. Grossiste trappes de visite, joints creux aluminium et profilés placo à Casablanca.",
  keywords: "BA13 Maroc, Placo prix m2, Faux plafond Casablanca, Joint creux aluminium, Sinca, Lafarge Maroc",
};

export default function MoroccoPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Schema lang="ma" />
      <HeroSection lang="ma" />
      <FeatureSection lang="ma" />
      <ProductSection lang="ma" />
    </div>
  );
}
