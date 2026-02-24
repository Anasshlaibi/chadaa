export default function Schema({ lang }: { lang: 'fr' | 'ma' | 'en' }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Chada Alyasmin",
    "image": "https://chadaalyasmin.ma/logo.png",
    "@id": "https://chadaalyasmin.ma",
    "url": "https://chadaalyasmin.ma",
    "telephone": "+212661138204",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Lot. Al Amal n°2, Bouskoura",
      "addressLocality": "Casablanca",
      "postalCode": "27182",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.4542,
      "longitude": -7.6491
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
