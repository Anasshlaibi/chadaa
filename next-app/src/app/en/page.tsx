import { Metadata } from 'next';
import GlobalLandingPage from '@/components/GlobalLandingPage';

export const metadata: Metadata = {
  title: "Chada Alyasmin | Expert Finishing Works in Morocco",
  description: "Specialist in Access Panels, Suspended Ceilings, and Insulation in Morocco. Premium quality and competitive prices for your construction projects.",
  keywords: ["access panel Morocco", "suspended ceiling Casablanca", "thermal insulation Morocco", "finishing works supplier"],
};

export default function HomePage() {
  return <GlobalLandingPage lang="en" />;
}
