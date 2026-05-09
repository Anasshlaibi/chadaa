import GlobalLandingPage from '@/components/GlobalLandingPage';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Panels & Drywall Solutions | Chada Alyasmin Global",
  description: "International supplier of premium maintenance hatches, aluminum profiles, and acoustic insulation. Worldwide shipping.",
  keywords: "Access panels, Drywall solutions, Maintenance hatches, Acoustic insulation, Worldwide shipping",
};

export default function InternationalPage() {
  return <GlobalLandingPage lang="en" />;
}
