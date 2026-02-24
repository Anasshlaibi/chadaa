import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductSection } from "@/components/ProductSection";
import { FeatureSection } from "@/components/FeatureSection";
import { Footer } from "@/components/Footer";
import Schema from "@/components/Schema";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Panels & Drywall Solutions | Chada Alyasmin Global",
  description: "International supplier of premium maintenance hatches, aluminum profiles, and acoustic insulation. Worldwide shipping.",
  keywords: "Access panels, Drywall solutions, Maintenance hatches, Acoustic insulation, Worldwide shipping",
};

export default function InternationalPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Schema lang="en" />
      <Navbar lang="en" />
      <HeroSection lang="en" />
      <FeatureSection lang="en" />
      <ProductSection lang="en" />
      <Footer lang="en" />
    </main>
  );
}
