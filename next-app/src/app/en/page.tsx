import { HeroSection } from "@/components/HeroSection";
import { ProductSection } from "@/components/ProductSection";
import { FeatureSection } from "@/components/FeatureSection";
import Schema from "@/components/Schema";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Panels & Drywall Solutions | Chada Alyasmin Global",
  description: "International supplier of premium maintenance hatches, aluminum profiles, and acoustic insulation. Worldwide shipping.",
  keywords: "Access panels, Drywall solutions, Maintenance hatches, Acoustic insulation, Worldwide shipping",
};

export default function InternationalPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Schema lang="en" />
      <HeroSection lang="en" />
      <FeatureSection lang="en" />
      <ProductSection lang="en" />
    </div>
  );
}
