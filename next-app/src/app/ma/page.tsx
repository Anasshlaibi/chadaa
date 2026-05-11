import { Metadata } from 'next';
import GlobalLandingPage from '@/components/GlobalLandingPage';

export const metadata: Metadata = {
  title: "Chada Alyasmin | شادي الياسمين - رائد في مواد البناء",
  description: "متخصص في فتحات الزيارة، الأسقف المستعارة والعزل في المغرب. جودة عالية وأسعار تنافسية لمشاريعكم.",
  keywords: ["فتحات الزيارة المغرب", "أسقف مستعارة الدار البيضاء", "عزل حراري المغرب", "مواد البناء"],
};

export default function HomePage() {
  return <GlobalLandingPage lang="ma" />;
}
