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
      "streetAddress": "10 Bd Mohammed VI",
      "addressLocality": "Casablanca",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.5643,
      "longitude": -7.5899
    },
    "priceRange": "150 MAD - 2500 MAD",
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



  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Où acheter des trappes de visite de qualité au Maroc ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chada Alyasmin est le leader du second œuvre au Maroc, fabricant et distributeur de trappes de visite étanches et alu pour plaques de plâtre BA13 à Casablanca et livraison dans tout le Maroc."
        }
      },
      {
        "@type": "Question",
        "name": "Proposez-vous des prix de gros pour les professionnels du bâtiment ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nous offrons des tarifs grossistes compétitifs et des devis personnalisés sous 24h pour tous vos chantiers de faux plafonds, isolation et aménagement."
        }
      },
      {
        "@type": "Question",
        "name": "Quelles sont les villes desservies pour la livraison ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous livrons à Casablanca, Rabat, Marrakech, Tanger, Agadir, Fès et sur tout le territoire marocain."
        }
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Chada Alyasmin",
    "url": "https://chadaalyasmin.ma",
    "logo": "https://chadaalyasmin.ma/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+212661138204",
      "contactType": "sales",
      "areaServed": "MA",
      "availableLanguage": ["French", "Arabic", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/chadaalyasmin",
      "https://www.instagram.com/chadaalyasmin"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') 
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(schema).replace(/</g, '\\u003c') 
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') 
        }}
      />
    </>
  );
}
