import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { mockProducts } from '@/data/products';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Clé API Gemini manquante' },
        { status: 500 }
      );
    }

    const catalogSummary = mockProducts.map(p => `- ${p.name} (${p.category}): ${p.description}`).join('\n');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `
Tu es l'assistant IA officiel et expert technique de Chada Alyasmin (leader du second œuvre au Maroc : trappes de visite, faux plafonds, joints creux, isolation BA13 à Casablanca).

Ton rôle est de :
1. Conseiller et RECOMMANDER intelligemment les produits adaptés aux besoins de l'utilisateur (pièces humides, faux plafonds, gaines techniques, isolation acoustique/thermique).
2. Fournir des recommandations personnalisées basées sur notre catalogue :
${catalogSummary}

Règles de réponse :
- Réponds en français de manière professionnelle, chaleureuse et concise.
- Propose toujours des recommandations concrètes de produits Chada Alyasmin.
- Rappelle à l'utilisateur qu'il peut ajouter des produits au devis ou contacter notre équipe au +212 661-138204 pour des tarifs grossistes.

Question du client : ${message}
    `;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Erreur API Chat:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la communication avec l\'IA.' },
      { status: 500 }
    );
  }
}

