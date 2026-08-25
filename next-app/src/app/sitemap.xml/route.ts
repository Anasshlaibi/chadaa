import { getAllProducts } from '@/lib/products';
import { CATEGORY_GROUPS } from '@/data/products';
import { GUIDES } from '@/data/guides';

export const revalidate = 3600;

export async function GET() {
  const baseUrl = 'https://chadaalyasmin.ma';
  const products = await getAllProducts();
  const today = new Date().toISOString().split('T')[0];

  interface SitemapUrl {
    loc: string;
    lastmod?: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    priority: string;
    image?: string | null;
    title?: string;
    caption?: string;
  }

  const urls: SitemapUrl[] = [
    // 1. Core pages
    {
      loc: `${baseUrl}`,
      lastmod: today,
      changefreq: 'daily',
      priority: '1.0',
    },
    {
      loc: `${baseUrl}/products`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.9',
    },
    {
      loc: `${baseUrl}/prix`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      loc: `${baseUrl}/guide`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/devis`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.9',
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/faq`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/ma`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/en`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    },

    // 2. Category Landing Pages
    ...CATEGORY_GROUPS.map((group) => ({
      loc: `${baseUrl}/products/${group.slug}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: '0.8',
    })),

    // 3. Category Pricing Pages
    ...CATEGORY_GROUPS.map((group) => ({
      loc: `${baseUrl}/prix/${group.slug}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: '0.8',
    })),

    // 4. Technical Guides
    ...GUIDES.map((guide) => ({
      loc: `${baseUrl}/guide/${guide.slug}`,
      lastmod: guide.publishedAt || today,
      changefreq: 'monthly' as const,
      priority: '0.7',
      image: guide.image.startsWith('http') ? guide.image : `${baseUrl}${guide.image}`,
      title: guide.title,
      caption: guide.description,
    })),

    // 5. Canonical Product Pages (Slugs ONLY)
    ...products.map((p) => ({
      loc: `${baseUrl}/products/${p.slug}`,
      lastmod: p.pricing.priceUpdatedAt || today,
      changefreq: 'weekly' as const,
      priority: '0.8',
      image: p.image.startsWith('http') ? p.image : `${baseUrl}${p.image}`,
      title: p.name,
      caption: p.description ? p.description.slice(0, 150) : '',
    })),
  ];

  const xmlItems = urls
    .map((item) => {
      let imageXml = '';
      if (item.image) {
        const captionXml = item.caption
          ? `\n      <image:caption>${escapeXml(item.caption)}</image:caption>`
          : '';
        const titleXml = item.title
          ? `\n      <image:title>${escapeXml(item.title)}</image:title>`
          : '';
        imageXml = `\n    <image:image>\n      <image:loc>${item.image}</image:loc>${titleXml}${captionXml}\n    </image:image>`;
      }

      const lastmodXml = item.lastmod ? `\n    <lastmod>${item.lastmod}</lastmod>` : '';

      return `  <url>
    <loc>${item.loc}</loc>${lastmodXml}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>${imageXml}
  </url>`;
    })
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlItems}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}
