import { Metadata } from 'next';
import GlobalLandingPage from '@/components/GlobalLandingPage';

export const metadata: Metadata = {
  title: "Chada Alyasmin | Leader du Second Œuvre au Maroc",
  description: "Spécialiste en Trappes de visite, Faux plafonds et Isolation au Maroc. Qualité premium et prix compétitifs pour vos chantiers.",
  keywords: ["trappe de visite Maroc", "faux plafond Casablanca", "isolation thermique Maroc", "grossiste second oeuvre"],
};

export default function HomePage() {
  return <GlobalLandingPage lang="fr" />;
}
