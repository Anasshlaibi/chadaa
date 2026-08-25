export interface GuideArticle {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  readTime: string;
  publishedAt: string;
  image: string;
  keyTakeaways: string[];
  content: {
    sectionTitle: string;
    paragraphs: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedProductIds: string[];
  relatedGuideSlugs: string[];
  relatedPricingSlug: string;
}

export const GUIDES: GuideArticle[] = [
  {
    slug: "trappe-de-visite",
    title: "Guide complet des trappes de visite pour faux plafonds et cloisons au Maroc",
    shortTitle: "Guide Trappe de Visite",
    category: "Trappe de Visite",
    description: "Comment choisir et installer une trappe de visite aluplaster, hydrofuge ou coupe-feu. Dimensions standards, systèmes d'ouverture et normes de mise en œuvre.",
    readTime: "6 min de lecture",
    publishedAt: "2026-02-15",
    image: "/assets/assetstrappe/img/work-4.jpg",
    keyTakeaways: [
      "Les trappes Aluplaster s'intègrent de manière invisible dans les plafonds en plaques de plâtre BA13.",
      "En pièces humides (salles de bain, cuisines), l'usage d'une trappe hydrofuge avec plaque verte et joint périphérique étanche est obligatoire.",
      "Dimensions courantes : 20x20, 30x30, 40x40, 50x50 et 60x60 cm. Fabrication sur mesure possible pour gaines techniques volumineuses.",
      "Système clic-clac (pousser-lâcher) sans poignée apparente pour une esthétique moderne et épurée."
    ],
    content: [
      {
        sectionTitle: "1. Qu'est-ce qu'une trappe de visite Aluplaster ?",
        paragraphs: [
          "Une trappe de visite est un élément d'accès technique intégré dans un faux plafond suspendu ou une cloison sèche. Elle permet d'accéder aux gaines techniques, conduites d'eau, réseaux électriques, gaines de climatisation (VMC/CTA) et vannes d'arrêt sans détériorer l'ouvrage en plâtre.",
          "Le système Aluplaster se compose d'un cadre dormant et d'un ouvrant en aluminium extrudé brut intégrant une plaque de plâtre de 12.5 mm d'épaisseur. Lors de la mise en peinture du plafond, la trappe reçoit la même finition que le reste de la pièce, garantissant une discrétion absolue."
        ]
      },
      {
        sectionTitle: "2. Les différents types de trappes de visite",
        paragraphs: [
          "Trappe Standard Aluplaster : Pour pièces sèches (salons, chambres, couloirs de bureaux). Équipée d'une plaque BA13 standard.",
          "Trappe Hydrofuge (verte) : Pour salles de bain, sanitaires et cuisines professionnelles. Elle est dotée d'une plaque traitée silicone anti-humidité et d'un joint d'étanchéité périphérique évitant les infiltrations de vapeur d'eau.",
          "Trappe en Acier Laqué : En tôle d'acier galvanisé laquée blanc époxy (RAL 9016), très robuste et résistante aux chocs, avec fermeture par clé carrée ou serrure batteuse pour les parties communes d'immeubles et hôpitaux."
        ]
      },
      {
        sectionTitle: "3. Règles de pose et d'installation",
        paragraphs: [
          "La pose d'une trappe de visite nécessite la création d'un chevrêtre métallique avec des profilés (fourrures F60 ou montants M48) autour de la réservation.",
          "Le cadre dormant est vissé directement dans l'ossature périphérique à l'aide de vis autoperceuses TTPC 3.5 x 25 mm. Un jeu fonctionnel de 2 à 3 mm entre ouvrant et dormant garantit une ouverture fluide sans frottement.",
          "Les têtes de vis et le contour du cadre extérieur sont ensuite enduits au mortier à joint CE 78 pour une finition invisible."
        ]
      }
    ],
    faqs: [
      {
        question: "Quelle dimension de trappe choisir pour accéder à un climatiseur gainable ?",
        answer: "Pour la maintenance des unités intérieures gainables, un format minimum de 50x50 cm ou 60x60 cm est recommandé afin de permettre le démontage des filtres et l'accès au groupe motoventilateur."
      },
      {
        question: "Où trouver des trappes de visite sur mesure à Casablanca ?",
        answer: "Chada Alyasmin fabrique et distribue des trappes de visite standards et sur mesure dans ses ateliers à Casablanca, avec livraison sur l'ensemble du Maroc sous 24 à 48h."
      }
    ],
    relatedProductIds: ["tr-alu-standard", "tr-alu-hydro", "tr-acier", "fp-std-ba13"],
    relatedGuideSlugs: ["ba13", "faux-plafond", "joint-creux"],
    relatedPricingSlug: "trappes-de-visite"
  },
  {
    slug: "ba13",
    title: "Guide des plaques de plâtre BA13 au Maroc : Normes, types et pose",
    shortTitle: "Guide Plaques BA13",
    category: "Plaques de Plâtre",
    description: "Tout savoir sur les plaques de plâtre BA13 standard, hydrofuge, coupe-feu et acoustique. Comparatif des marques (Sinca, Knauf) et méthodes de mise en œuvre.",
    readTime: "7 min de lecture",
    publishedAt: "2026-02-15",
    image: "/assets/img/portfolio/portfolio-1.jpg",
    keyTakeaways: [
      "Le sigle BA13 signifie 'Bords Amincis' et '13 mm' d'épaisseur nominale (12.5 mm réel).",
      "Types principaux : Standard (ivoire), Hydrofuge H1 (verte), Coupe-feu (rose) et Haute Dureté BA15.",
      "Dimensions standard au Maroc : 1.20 m de largeur par 2.50 m, 2.80 m ou 3.00 m de longueur.",
      "Montage sur ossatures métalliques galvanisées (montants 48 et fourrures 60) avec entraxe de 60 cm (ou 40 cm en pièce humide)."
    ],
    content: [
      {
        sectionTitle: "1. Composition et caractéristiques techniques du BA13",
        paragraphs: [
          "La plaque de plâtre BA13 est composée d'un cœur en gypse naturel moulé entre deux parements de carton recyclé haute résistance. Ses bords longitudinaux amincis facilitent le traitement des joints avec bande papier et enduit pour obtenir une surface plane continue avant peinture.",
          "Les plaques offrent une excellente planéité, un temps de mise en œuvre rapide par filière sèche et d'excellentes propriétés de régulation hygrométrique naturelle."
        ]
      },
      {
        sectionTitle: "2. Les variantes de plaques de plâtre selon l'usage",
        paragraphs: [
          "BA13 Standard (Carton ivoire) : La plaque la plus utilisée pour les plafonds, cloisons distributives et doublages intérieurs de pièces sèches.",
          "BA13 Hydrofuge (Carton vert) : Traitée avec des agents siliconés dans le cœur de plâtre pour limiter la reprise d'humidité à moins de 5%. Obligatoire dans les salles de bain et cuisines.",
          "BA13 Coupe-feu (Carton rose) : Formulée avec de la fibre de verre et de la vermiculite pour retarder la propagation des flammes dans les gaines techniques et cloisons ERP.",
          "BA06 Flex : Plaque mince de 6 mm cintrable à sec pour plafonds voûtés, coupoles et arches décoratives."
        ]
      },
      {
        sectionTitle: "3. Méthodologie de fixation et jointoiement",
        paragraphs: [
          "Les plaques sont vissées sur les montants métalliques M48 ou fourrures F60 tous les 25 à 30 cm avec des vis TTPC 25 mm.",
          "Le jointoiement s'effectue en 3 passes : 1ère passe d'enduit CE 78 pour coller la bande papier micro-perforée, 2ème passe de charge pour noyer la bande, et 3ème passe de finition extra-fine avant ponçage léger."
        ]
      }
    ],
    faqs: [
      {
        question: "Quel est le prix au m² du BA13 standard au Maroc ?",
        answer: "Le prix indicatif de la plaque BA13 standard débute à partir de 34 MAD HT le m² (soit environ 85 à 95 MAD HT la plaque de 2.50x1.20m), selon les volumes commandés."
      },
      {
        question: "Quel entraxe respecter entre les montants métalliques ?",
        answer: "L'entraxe standard est de 60 cm entre axes pour les cloisons standards. En milieu humide ou pour les cloisons carrelées, l'entraxe doit être réduit à 40 cm pour renforcer la rigidité de l'ouvrage."
      }
    ],
    relatedProductIds: ["fp-std-ba13", "fp-hydro-ba13", "fp-coupe-feu-ba13", "cl-montant-48", "af-vis-25", "en-ce78"],
    relatedGuideSlugs: ["ossature-metallique", "trappe-de-visite", "faux-plafond"],
    relatedPricingSlug: "plaques-de-platre"
  },
  {
    slug: "faux-plafond",
    title: "Guide des faux plafonds suspendus et modulaires au Maroc",
    shortTitle: "Guide Faux Plafonds",
    category: "Systèmes de Plafonds",
    description: "Comparatif entre faux plafond continu en BA13 et plafond modulaire démontable 600x600 (dalles laine minérale, plâtre, métal). Performances acoustiques et esthétiques.",
    readTime: "8 min de lecture",
    publishedAt: "2026-02-15",
    image: "/assets/img/portfolio/portfolio-9.jpg",
    keyTakeaways: [
      "Le faux plafond continu BA13 offre une finition lisse et monolithique avec intégration de joints creux et gorges lumineuses LED.",
      "Le faux plafond modulaire 600x600 sur ossature T24 ou T15 permet un accès direct à tout le plénum et offre une absorption acoustique supérieure.",
      "Les dalles Rockfon (Artic, Ekla) et Knauf AMF (Thermatex, Topiq) absorbent les bruits de réverbération dans les bureaux paysagers et commerces.",
      "Système de suspension : suspentes articulées, tiges filetées M6 et cavaliers pivots F60."
    ],
    content: [
      {
        sectionTitle: "1. Plafond continu BA13 vs Plafond démontable 600x600",
        paragraphs: [
          "Le choix d'un système de faux plafond dépend de la destination des locaux et des contraintes d'exploitation.",
          "Dans le secteur résidentiel, villas et appartements de standing, le plafond continu en plaques BA13 avec retombées lumineuses et joints creux est privilégié pour son esthétique fluide et épurée.",
          "Dans le secteur tertiaire (immeubles de bureaux, banques, hôpitaux, centres commerciaux), le plafond démontable 600x600 sur profilés T24/T15 est indispensable pour permettre l'intervention quotidienne sur les réseaux de câbles, gaines de climatisation et tuyauteries dissimulés dans le plénum."
        ]
      },
      {
        sectionTitle: "2. Les types de dalles de plafond modulaire",
        paragraphs: [
          "Dalles en laine de roche (Rockfon Artic / Ekla) : Très haute absorption acoustique (aw = 0.80 à 1.00), incombustibles A1 et 100% résistantes à l'humidité.",
          "Dalles en plâtre laminé vinyle (Iso-Tone) : Surface lisse étanche et lavable avec face arrière en aluminium pare-vapeur. Idéales pour cuisines, laboratoires et sanitaires.",
          "Dalles métalliques perforées : En acier laqué blanc avec voile acoustique noir au dos. Ultra-robustes et modernes pour les gares, aéroports et sièges sociaux.",
          "Dalles en plâtre décoratives (Fissurées, Méditerranée, Perforées acoustiques) : Économiques et faciles à poser."
        ]
      }
    ],
    faqs: [
      {
        question: "Quelle est la hauteur minimale requise pour un faux plafond suspendu ?",
        answer: "Une hauteur de plénum minimale de 10 à 15 cm est conseillée pour loger les gaines électriques, spots encastrés et conduits légers."
      },
      {
        question: "Comment améliorer l'acoustique d'un open space à Casablanca ?",
        answer: "L'installation de dalles Rockfon Ekla (alpha w = 1.00) ou AMF Topiq Prime couplée à un matelas de laine de verre ou laine de roche dans le plénum permet de réduire drastiquement le temps de réverbération."
      }
    ],
    relatedProductIds: ["om-plf-60", "om-t24", "lr-artic", "lr-ekla", "dp-vinyle-iso", "dp-metal"],
    relatedGuideSlugs: ["ba13", "ossature-metallique", "isolation"],
    relatedPricingSlug: "dalles-de-plafond"
  },
  {
    slug: "isolation",
    title: "Guide de l'isolation thermique et acoustique du bâtiment au Maroc",
    shortTitle: "Guide Isolation Maroc",
    category: "Isolation",
    description: "Normes d'efficacité énergétique (RTCM), choix entre laine de roche et laine de verre, isolation des cloisons, toitures et doublages à Casablanca et au Maroc.",
    readTime: "7 min de lecture",
    publishedAt: "2026-02-15",
    image: "/assets/img/portfolio/rockmur-kraft.jpg",
    keyTakeaways: [
      "L'isolation réduit jusqu'à 60% la facture de climatisation en été et de chauffage en hiver au Maroc.",
      "La Réglementation Thermique de Construction au Maroc (RTCM) impose des seuils minimaux de résistance thermique (R) selon les zones climatiques.",
      "La laine de roche excelle pour la protection incendie (incombustible A1) et l'isolation phonique des cloisons.",
      "La laine de verre est particulièrement économique et performante pour l'isolation des combles perdus et sous-toitures métalliques."
    ],
    content: [
      {
        sectionTitle: "1. Enjeux de l'isolation dans le bâtiment au Maroc",
        paragraphs: [
          "Avec la hausse des coûts énergétiques et l'application des règles de la RTCM, l'isolation des parois opaques (murs extérieurs, toitures terrasses et cloisons séparatives) est devenue incontournable dans tous les programmes de construction.",
          "Une isolation bien dimensionnée améliore considérablement le confort de vie et préserve le bâti des chocs thermiques et des condensations."
        ]
      },
      {
        sectionTitle: "2. Laine de roche vs Laine de verre : Comment choisir ?",
        paragraphs: [
          "Laine de roche : Fabriquée par fusion de roches basaltiques volcaniques. Elle présente une masse volumique supérieure (30 à 70 kg/m³), résiste à des températures supérieures à 1000°C et constitue le meilleur bouclier acoustique pour les cloisons séparatives.",
          "Laine de verre : Produite à partir de silice et verre recyclé. Elle est plus légère, compressible et très performante thermiquement (lambda 0.032 à 0.040 W/m.K) pour les plafonds suspendus et combles."
        ]
      }
    ],
    faqs: [
      {
        question: "Quelle épaisseur d'isolant prévoir pour les murs au Maroc ?",
        answer: "Une épaisseur de 40 à 50 mm de laine de roche semi-rigide (type Rockmur Kraft) dans le doublage intérieur assure d'excellentes performances thermo-acoustiques adaptées au climat marocain."
      }
    ],
    relatedProductIds: ["is-rockmur-kraft", "is-rockmur-nu", "is-ti212", "is-smart"],
    relatedGuideSlugs: ["laine-de-roche", "ba13", "faux-plafond"],
    relatedPricingSlug: "isolation"
  },
  {
    slug: "laine-de-roche",
    title: "Guide technique de la laine de roche : Performances feu, thermique et acoustique",
    shortTitle: "Guide Laine de Roche",
    category: "Laine de Roche",
    description: "Tout savoir sur les panneaux Rockwool Rockmur Kraft et Nu : conductivité thermique, classement au feu A1, atténuation acoustique et pose en cloison.",
    readTime: "5 min de lecture",
    publishedAt: "2026-02-15",
    image: "/assets/img/portfolio/rockmur-nu.jpg",
    keyTakeaways: [
      "Incombustibilité Euroclasse A1 : point de fusion supérieur à 1000°C.",
      "Conductivité thermique lambda λ = 0.035 W/m.K.",
      "Panneau semi-rigide à tenue mécanique parfaite dans les montants de 48 mm sans affaissement.",
      "Disponible en version revêtue pare-vapeur Kraft (murs extérieurs) ou Nu (cloisons intérieures acoustiques)."
    ],
    content: [
      {
        sectionTitle: "1. Propriétés uniques de la laine de roche",
        paragraphs: [
          "La laine de roche est un matériau isolant minéral naturel issu du basalte. Sa structure multidirectionnelle emprisonne l'air immobile pour freiner les transferts de chaleur.",
          "Elle est hydrophobe, imputrescible, n'attire pas les rongeurs et conserve ses performances tout au long de la vie du bâtiment."
        ]
      }
    ],
    faqs: [
      {
        question: "Pourquoi utiliser un panneau Kraft plutôt que Nu ?",
        answer: "Le pare-vapeur Kraft empêche la vapeur d'eau générée à l'intérieur du bâtiment de condenser dans l'isolant contre le mur froid. Il est donc indispensable pour les murs périphériques."
      }
    ],
    relatedProductIds: ["is-rockmur-kraft", "is-rockmur-nu", "cl-montant-48"],
    relatedGuideSlugs: ["isolation", "ba13", "ossature-metallique"],
    relatedPricingSlug: "laine-de-roche"
  },
  {
    slug: "ossature-metallique",
    title: "Guide des ossatures métalliques pour cloisons et faux plafonds (F60, M48, R48, T24)",
    shortTitle: "Guide Ossature Métallique",
    category: "Ossature Métallique",
    description: "Guide pratique pour choisir les profilés en acier galvanisé : fourrures de plafond F60/F47, montants et rails M48/R48 pour cloisons Placostil et ossatures modulaires T24/T15.",
    readTime: "6 min de lecture",
    publishedAt: "2026-02-15",
    image: "/assets/img/portfolio/ossature-t24.jpg",
    keyTakeaways: [
      "L'acier galvanisé Z140 à Z275 garantit une protection durable contre la corrosion.",
      "Fourrure F60 : le standard pour faux plafonds suspendus sous dalle ou charpente.",
      "Montant M48 et Rail R48 : le standard pour cloison distributive 72/48 (épaisseur finie 72 mm avec 2 plaques BA13).",
      "Système modulaire T24 : porteurs 3.60 m + entretoises 1.20 m et 0.60 m pour dalles démontables."
    ],
    content: [
      {
        sectionTitle: "1. Rôle fondamental de l'ossature métallique",
        paragraphs: [
          "L'ossature métallique constitue le squelette mécanique invisible sur lequel reposent la stabilité, la planéité et la résistance aux charges des faux plafonds et cloisons sèches.",
          "Chada Alyasmin fournit des profilés métalliques rigides certifiés conformes aux normes marocaines et européennes, avec profilage précis pour un emboîtement parfait."
        ]
      }
    ],
    faqs: [
      {
        question: "Quelle est la différence entre une fourrure F60 et un montant M48 ?",
        answer: "La fourrure F60 (largeur 60 mm) est conçue pour les faux plafonds et doublages sur suspentes. Le montant M48 (largeur 48 mm) est un profilé vertical conçu pour s'emboîter dans les rails R48 sol/plafond pour créer des cloisons."
      }
    ],
    relatedProductIds: ["om-plf-60", "cl-montant-48", "cl-rail-48", "om-t24", "af-vis-25"],
    relatedGuideSlugs: ["ba13", "faux-plafond", "trappe-de-visite"],
    relatedPricingSlug: "ossature-metallique"
  },
  {
    slug: "joint-creux",
    title: "Guide des profilés joints creux et gorges lumineuses en aluminium",
    shortTitle: "Guide Joints Creux",
    category: "Joint Creux",
    description: "Comment réaliser des joints creux d'architecte formes Z, U, L et Oméga pour sublimer les faux plafonds BA13 et intégrer des bandeaux LED.",
    readTime: "5 min de lecture",
    publishedAt: "2026-02-15",
    image: "/assets/img/portfolio/jointcreux1.jpg",
    keyTakeaways: [
      "Le joint creux crée une ligne d'ombre nette et moderne entre le plafond et les murs.",
      "Forme Z : Découplage périphérique standard pour plaques BA13.",
      "Forme U : Idéale pour créer des gorges lumineuses discrètes recevant des rubans LED.",
      "Forme L : Arrêt d'angle et finition de rive.",
      "Fabrication locale en aluminium extrudé de haute précision par Chada Alyasmin."
    ],
    content: [
      {
        sectionTitle: "1. L'élégance architecturale du joint creux",
        paragraphs: [
          "Le joint creux est devenu l'une des signatures incontournables de l'architecture d'intérieur contemporaine au Maroc. En remplaçant les moulures et corniches traditionnelles par une ligne d'ombre géométrique et épurée, il donne l'illusion d'un plafond flottant.",
          "Il permet également de désolidariser le faux plafond des mouvements de la maçonnerie pour prévenir l'apparition de microfissures sur le pourtour des pièces."
        ]
      }
    ],
    faqs: [
      {
        question: "Peut-on peindre les profilés joint creux ?",
        answer: "Oui, les profilés en aluminium brut peuvent être peints avec la même peinture acrylique ou mate que le plafond après application d'une sous-couche d'accrochage pour métaux non ferreux."
      }
    ],
    relatedProductIds: ["jc-std-z", "jc-std-u", "jc-std-l", "jc-hydro-z", "fp-std-ba13"],
    relatedGuideSlugs: ["ba13", "faux-plafond", "trappe-de-visite"],
    relatedPricingSlug: "joints-creux"
  }
];
