export default function Schema({ lang }: { lang: 'fr' | 'ma' | 'en' }) {
  const unifiedGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': 'https://chadaalyasmin.ma/#organization',
        'name': 'Chada Alyasmin',
        'alternateName': 'شادي الياسمين',
        'url': 'https://chadaalyasmin.ma',
        'logo': 'https://chadaalyasmin.ma/logo.png',
        'image': 'https://chadaalyasmin.ma/logo.png',
        'description': 'Fabricant et distributeur de matériaux de second œuvre au Maroc : trappes de visite, plaques de plâtre BA13, faux plafonds suspendus, ossatures métalliques, joints creux et isolation thermo-acoustique à Casablanca.',
        'telephone': '+212661138204',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Boulevard Mohammed VI',
          'addressLocality': 'Casablanca',
          'postalCode': '20000',
          'addressCountry': 'MA'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 33.5643,
          'longitude': -7.5899
        },
        'areaServed': [
          { '@type': 'City', 'name': 'Casablanca' },
          { '@type': 'City', 'name': 'Rabat' },
          { '@type': 'City', 'name': 'Tanger' },
          { '@type': 'City', 'name': 'Marrakech' },
          { '@type': 'City', 'name': 'Fès' },
          { '@type': 'City', 'name': 'Agadir' },
          { '@type': 'Country', 'name': 'Morocco' }
        ],
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '08:30',
            'closes': '18:30'
          }
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+212661138204',
          'contactType': 'sales',
          'areaServed': 'MA',
          'availableLanguage': ['French', 'Arabic', 'English']
        },
        'sameAs': [
          'https://www.facebook.com/chadaalyasmin',
          'https://www.instagram.com/chadaalyasmin'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://chadaalyasmin.ma/#website',
        'url': 'https://chadaalyasmin.ma',
        'name': 'Chada Alyasmin',
        'publisher': {
          '@id': 'https://chadaalyasmin.ma/#organization'
        },
        'inLanguage': ['fr-MA', 'ar-MA', 'en-MA']
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(unifiedGraph).replace(/</g, '\\u003c')
      }}
    />
  );
}
