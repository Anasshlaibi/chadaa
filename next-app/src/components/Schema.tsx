export default function Schema({ lang }: { lang: 'fr' | 'ma' | 'en' }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Chada Alyasmin",
    "alternateName": "شادي الياسمين",
    "description": "Leader du second œuvre au Maroc depuis 2017. Fabricant et distributeur de trappes de visite, faux plafonds, joints creux et solutions d'isolation à Casablanca.",
    "image": "https://chadaalyasmin.ma/logo.png",
    "@id": "https://chadaalyasmin.ma",
    "url": "https://chadaalyasmin.ma",
    "telephone": "+212661138204",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sidi Maarouf",
      "addressLocality": "Casablanca",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.5898,
      "longitude": -7.6031
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Morocco"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Catalogue Second Œuvre",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Trappes de Visite Sur Mesure"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Installation de Faux Plafonds"
          }
        }
      ]
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:30",
      "closes": "18:30"
    },
    "sameAs": [
      "https://www.facebook.com/chadaalyasmin",
      "https://www.instagram.com/chadaalyasmin"
    ]
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Trappe de Visite Chada Alyasmin",
    "description": lang === 'fr' 
      ? "Trappe de visite premium certifiée pour plaques de plâtre BA13."
      : "Meilleure trappe de visite au Maroc pour faux plafonds et murs.",
    "brand": {
      "@type": "Brand",
      "name": "Chada Alyasmin"
    },
    "offers": {
      "@type": "AggregateOffer",
      "url": `https://chadaalyasmin.ma/${lang}`,
      "priceCurrency": lang === 'ma' ? "MAD" : "EUR",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(schema).replace(/</g, '\\u003c') 
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') 
        }}
      />
    </>
  );
}
