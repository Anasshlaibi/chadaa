import { getAllProducts, formatPriceDisplay } from '@/lib/products';
import { CATEGORY_GROUPS } from '@/data/products';

export const revalidate = 3600;

export async function GET() {
  const products = await getAllProducts();

  const content = `# Chada Alyasmin — Matériaux de Second Œuvre au Maroc
> Fabricant et distributeur de référence en matériaux de second œuvre, faux plafonds, trappes de visite et isolation à Casablanca, Maroc.

## Informations Générales
- **Nom de l'entreprise** : Chada Alyasmin (شادي الياسمين)
- **Localisation** : Boulevard Mohammed VI, Casablanca, Maroc
- **Activité** : Fabricant & Distributeur de matériaux de construction et finition de second œuvre
- **Année de création** : 2017
- **Téléphone / WhatsApp** : +212 661-138204
- **Site web officiel** : https://chadaalyasmin.ma
- **Zones desservies** : Casablanca, Rabat, Tanger, Marrakech, Fès, Agadir, Oujda et tout le Maroc

## Catégories Principales
${CATEGORY_GROUPS.map((g) => `- [${g.name}](https://chadaalyasmin.ma/products/${g.slug}) : ${g.description}`).join('\n')}

## Hub des Prix
- [Grille Tarifaire Complète](https://chadaalyasmin.ma/prix) : Prix indicatifs en Dirhams Marocains Hors Taxes (MAD HT)
- [Guides Techniques](https://chadaalyasmin.ma/guide) : Fiches pratiques de mise en œuvre et comparatifs

## Aperçu des Produits & Prix Vérifiés
${products
  .slice(0, 15)
  .map((p) => {
    const price = formatPriceDisplay(p.pricing);
    return `- **${p.name}** (${p.category}) : ${price.display} | [Fiche Produit](https://chadaalyasmin.ma/products/${p.slug})`;
  })
  .join('\n')}

## Documentation Machine-Readable & API AI
- Catalogue complet Markdown : https://chadaalyasmin.ma/llms-full.txt
- Catalogue JSON structuré : https://chadaalyasmin.ma/ai/catalog.json
- Données Entreprise JSON : https://chadaalyasmin.ma/ai/company.json
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
