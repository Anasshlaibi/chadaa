import { getAllProducts, formatPriceDisplay } from '@/lib/products';
import { CATEGORY_GROUPS } from '@/data/products';

export const revalidate = 3600;

export async function GET() {
  const products = await getAllProducts();

  let markdown = `# CHADA ALYASMIN — CATALOGUE TECHNIQUE ET COMMERCIAL COMPLET (MAROC)
Date d'exportation : 2026-02-25
Site Web : https://chadaalyasmin.ma
Téléphone / WhatsApp : +212 661-138204
Adresse : Boulevard Mohammed VI, Casablanca, Maroc

---

## 1. À PROPOS DE L'ENTREPRISE
Chada Alyasmin (شادي الياسمين) est une entreprise marocaine spécialisée dans la fabrication et la distribution de matériaux de second œuvre et de finition intérieure et extérieure pour le bâtiment. Fondée en 2017 à Casablanca, elle fournit les entreprises de construction, architectes, plaquistes et promoteurs immobiliers sur l'ensemble du territoire marocain.

---

## 2. CATALOGUE DES PRODUITS (${products.length} ARTICLES)

`;

  CATEGORY_GROUPS.forEach((group) => {
    const groupProducts = products.filter((p) => group.categories.includes(p.category));
    if (groupProducts.length === 0) return;

    markdown += `### Catégorie : ${group.name}\n`;
    markdown += `Description : ${group.description}\n`;
    markdown += `URL Catégorie : https://chadaalyasmin.ma/products/${group.slug}\n\n`;

    groupProducts.forEach((p) => {
      const price = formatPriceDisplay(p.pricing);
      markdown += `#### ${p.name}\n`;
      markdown += `- **Référence (SKU)** : ${p.ref || p.id}\n`;
      markdown += `- **Sous-Catégorie** : ${p.category}\n`;
      markdown += `- **Marque** : ${p.brand || 'Chada Alyasmin'}\n`;
      markdown += `- **Disponibilité** : ${p.stockStatus}\n`;
      markdown += `- **Prix indicatif** : ${price.display}\n`;
      if (p.pricing.priceUpdatedAt) {
        markdown += `- **Prix vérifié le** : ${p.pricing.priceUpdatedAt}\n`;
      }
      markdown += `- **Description** : ${p.description}\n`;

      if (p.specs && Object.keys(p.specs).length > 0) {
        markdown += `- **Spécifications techniques** :\n`;
        Object.entries(p.specs).forEach(([k, v]) => {
          markdown += `  - ${k} : ${v}\n`;
        });
      }

      if (p.applications && p.applications.length > 0) {
        markdown += `- **Applications** : ${p.applications.join(', ')}\n`;
      }

      markdown += `- **Lien Fiche Produit** : https://chadaalyasmin.ma/products/${p.slug}\n\n`;
    });

    markdown += `---\n\n`;
  });

  markdown += `## 3. MODALITÉS COMMERCIALES & LOGISTIQUE
- **Devis** : Gratuit et établi sous 24h ouvrées.
- **Prix** : Exprimés en Dirhams marocains Hors Taxes (MAD HT). TVA de 20% applicable en sus.
- **Remises** : Barème dégressif par palette et camion complet pour les professionnels.
- **Livraison** : Dépôt central à Casablanca. Livraisons quotidiennes à Casablanca, Rabat, Mohammedia, Tanger, Marrakech, Fès, Meknès, Agadir, et toutes provinces.
- **Contact Devis** : https://chadaalyasmin.ma/devis ou WhatsApp +212 661-138204.
`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
