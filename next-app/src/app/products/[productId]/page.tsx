import { Metadata } from 'next';
import ProductDetailPageComponent from '@/components/ProductDetailPage';
import { mockProducts } from '@/data/products';

type Props = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return {
      title: "Produit non trouvé | Chada Alyasmin",
    };
  }

  return {
    title: `${product.name} | Chada Alyasmin`,
    description: `${product.description} Retrouvez nos solutions de trappe de visite et faux plafonds au Maroc.`,
    openGraph: {
      title: `${product.name} | Chada Alyasmin`,
      description: product.description,
      images: [{ url: product.image }],
    },
    keywords: ["trappe de visite", product.category, "Chada Alyasmin", "Maroc", "aménagement"],
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { productId } = await params;
  // We pass mockProducts directly since it's available server-side
  // and ProductDetailPageComponent is a client component that will handle the display.
  return <ProductDetailPageComponent products={mockProducts} />;
}
