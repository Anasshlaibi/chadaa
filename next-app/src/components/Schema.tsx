export default function Schema({ lang }: { lang: 'fr' | 'ma' | 'en' }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Chada Alyasmin",
    "image": "https://chadaalyasmin.ma/logo.png",
    "@id": "https://chadaalyasmin.ma",
    "url": "https://chadaalyasmin.ma",
    "telephone": "+212661138204",
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
