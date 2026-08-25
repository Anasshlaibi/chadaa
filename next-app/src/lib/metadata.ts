import { Metadata } from 'next';

export interface MetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const DEFAULT_TITLE = 'Chada Alyasmin | Fournisseur de Matériaux de Second Œuvre au Maroc';
const DEFAULT_DESCRIPTION =
  'Fournisseur leader de matériaux de second œuvre au Maroc. Faux plafonds suspendus, plaques de plâtre BA13, trappes de visite aluplaster, isolation laine de roche et de verre, ossatures métalliques. Stock permanent à Casablanca, livraison nationale et devis sous 24h.';
const DEFAULT_OG_IMAGE = 'https://chadaalyasmin.ma/assets/img/hero-bg.png';
const BASE_URL = 'https://chadaalyasmin.ma';

export function buildMetadata({
  title,
  description,
  keywords,
  canonicalPath = '',
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: MetadataOptions): Metadata {
  const fullTitle = title.includes('Chada Alyasmin')
    ? title
    : `${title} | Chada Alyasmin Maroc`;

  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const canonicalUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;

  const defaultKeywords = [
    'matériaux de second œuvre Maroc',
    'matériaux de construction Casablanca',
    'fournisseur faux plafond Maroc',
    'plaque de plâtre BA13 Casablanca',
    'trappe de visite Maroc',
    'isolation laine de roche Maroc',
    'ossature métallique plafond',
    'dalles de plafond 600x600',
    'grossiste second oeuvre Maroc',
    'devis matériaux second oeuvre',
  ];

  return {
    title: fullTitle,
    description: description || DEFAULT_DESCRIPTION,
    keywords: keywords ? [...keywords, ...defaultKeywords] : defaultKeywords,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'fr-MA': canonicalUrl,
        'fr': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description: description || DEFAULT_DESCRIPTION,
      url: canonicalUrl,
      siteName: 'Chada Alyasmin',
      locale: 'fr_MA',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || DEFAULT_DESCRIPTION,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
}
