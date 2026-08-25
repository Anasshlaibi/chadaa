export const revalidate = 86400;

export async function GET() {
  const companyData = {
    company: {
      name: "Chada Alyasmin",
      legalName: "Chada Alyasmin SARL",
      nameArabic: "شادي الياسمين",
      headquarters: {
        streetAddress: "Boulevard Mohammed VI",
        city: "Casablanca",
        postalCode: "20000",
        country: "Morocco",
        coordinates: {
          latitude: 33.5643,
          longitude: -7.5899,
        },
      },
      contacts: {
        phone: "+212661138204",
        whatsapp: "+212661138204",
        email: "contact@chadaalyasmin.ma",
        website: "https://chadaalyasmin.ma",
      },
      foundingYear: 2017,
      businessType: "B2B Manufacturer & Wholesale Distributor",
      targetAudience: [
        "Entreprises générales de bâtiment (BTP)",
        "Entreprises de plâtrerie & plaquistes",
        "Architectes & bureaux d'études",
        "Promoteurs immobiliers",
        "Installateurs de faux plafonds et climatisation",
      ],
      coreCategories: [
        "Trappes de visite (Aluplaster standard, hydrofuge, acier sur mesure)",
        "Plaques de plâtre (BA13 standard, hydrofuge, coupe-feu, BA15, BA06)",
        "Ossatures métalliques (Fourrures 60/47, montants 48, rails 48, ossatures T24/T15)",
        "Isolation thermo-acoustique (Laine de roche Rockwool, Laine de verre Knauf)",
        "Dalles de faux plafonds 600x600 (Laine minérale Rockfon/AMF, Plâtre, Vinyle, Métal)",
        "Joints creux en aluminium (Formes Z, U, L, Oméga pour cloisons et plafonds)",
        "Planchers techniques surélevés (Sulfate de calcium, Aluminium moulé)",
        "Accessoires, bandes à joints et enduits CE78",
      ],
      pricingPolicy: {
        currency: "MAD",
        taxBasis: "Hors Taxes (HT)",
        transparency: "Prix de référence publics et vérifiés disponibles sur https://chadaalyasmin.ma/prix",
        discounts: "Tarifs dégressifs au volume et par camion/palette pour les professionnels",
      },
      quoteProcess: {
        url: "https://chadaalyasmin.ma/devis",
        turnaroundTime: "Sous 24 heures ouvrées",
        directChannel: "WhatsApp au +212 661-138204 ou formulaire en ligne",
      },
      regionsServed: [
        "Casablanca (dépôt principal & retrait sur place)",
        "Rabat & Salé",
        "Tanger & Tétouan",
        "Marrakech",
        "Fès & Meknès",
        "Agadir & Souss",
        "Oujda & Oriental",
        "Toutes les provinces du Maroc via réseau logistique dédié",
      ],
      complianceAndNorms: [
        "Normes marocaines (NM)",
        "Normes européennes (EN 520 pour plâtre, EN 13964 pour ossatures, EN 13162 pour isolants)",
        "Règlementation Thermique de Construction au Maroc (RTCM)",
      ],
    },
  };

  return new Response(JSON.stringify(companyData, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
