import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://chadaalyasmin.ma';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/products',
          '/products/*',
          '/prix',
          '/prix/*',
          '/guide',
          '/guide/*',
          '/devis',
          '/ai/*',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: ['/admin', '/login', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
