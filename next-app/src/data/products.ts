// This file contains the extracted data from your old HTML files.
// We will use this to populate the new React Catalog.

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  stockStatus: string;
  // --- SEO & Schema Fields ---
  oldUrl?: string; // Original URL for 301 redirect mapping
//   price?: string;
//   currency?: string;
  availability?: "https://schema.org/InStock" | "https://schema.org/OutOfStock";
  rating?: {
    value: number;
    count: number;
  };
  specs?: Record<string, string>;
}

export interface CategoryGroup {
  name: string;
  categories: string[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    name: "Systèmes de Plafonds",
    categories: ["Dalles en Laine de Roche", "Dalles en Métal", "Dalles en Plâtre", "Dalles en Vinyle", "Joint Creux", "Ossature Métallique"]
  },
  {
    name: "Cloisons & Doublages",
    categories: ["Plaques de Plâtre", "Cloisons de Séparation"]
  },
  {
    name: "Isolation Thermique",
    categories: ["Laine de Verre", "Laine de Roche"]
  },
  {
    name: "Planchers Techniques",
    categories: ["Plancher Technique", "Structure Plancher"]
  },
  {
    name: "Accessoires & Finition",
    categories: ["Bandes à Joints", "Accessoires de Fixation", "Accessoires de Projeter", "Enduits", "Trappe de Visite"]
  }
];

export const mockProducts: Product[] = [
  // --- TRAPPES DE VISITE (trappe de visite.html) ---
  {
    id: "tr-alu-standard",
    name: "TRAPPE DE VISITE ALUPLASTER",
    category: "Trappe de Visite",
    description: "Trappe de visite avec cadre en aluminium et plaque de plâtre standard. Idéale pour plafonds et cloisons.",
    image: "/assets/assetstrappe/img/work-4.jpg",
    stockStatus: "En Stock",
    oldUrl: "/trappe%20de%20visite.html",
    availability: "https://schema.org/InStock",
    specs: {
      "Matériau": "Aluminium & Plâtre",
      "Épaisseur": "12.5 mm",
      "Usage": "Accès technique"
    }
  },
  {
    id: "tr-alu-hydro",
    name: "TRAPPE ALUPLASTER HYDROFUGE",
    category: "Trappe de Visite",
    description: "Trappe de visite étanche avec plaque de plâtre hydrofuge (verte). Parfaite pour zones humides.",
    image: "/assets/assetstrappe/img/work-1.jpg",
    stockStatus: "En Stock",
    oldUrl: "/trappe%20de%20visite.html",
    availability: "https://schema.org/InStock",
    specs: {
      "Type": "Hydrofuge",
      "Matériau": "Aluminium & Plâtre vert"
    }
  },
  {
    id: "tr-acier",
    name: "TRAPPE EN ACIER LAQUÉ",
    category: "Trappe de Visite",
    description: "Trappe de visite en acier blanc haute résistance avec fermeture sécurisée.",
    image: "/assets/assetstrappe/img/work-33.jpg",
    stockStatus: "En Stock",
    oldUrl: "/trappe%20de%20visite.html",
    availability: "https://schema.org/InStock"
  },

  // --- FAUX PLAFONDS (faux plafond.html) ---
  {
    id: "fp-std-ba13",
    name: "PLAQUE DE PLATRE BA13 STANDARD",
    category: "Plaques de Plâtre",
    description: "Plaque de plâtre standard blanche pour aménagements intérieurs : cloisons, plafonds et doublages.",
    image: "/assets/img/portfolio/portfolio-1.jpg",
    stockStatus: "En Stock",
    oldUrl: "/faux%20plafond.html",
    availability: "https://schema.org/InStock",
    specs: {
      "Type": "BA13",
      "Usage": "Intérieur",
      "Finition": "Standard"
    }
  },
  {
    id: "fp-hydro-ba13",
    name: "PLAQUE DE PLATRE BA13 HYDROFUGE",
    category: "Plaques de Plâtre",
    description: "Plaque de plâtre hydrofuge pour pièces humides (salle de bain, cuisine).",
    image: "/assets/img/portfolio/portfolio-2.jpg",
    stockStatus: "En Stock",
    oldUrl: "/faux%20plafond.html",
    availability: "https://schema.org/InStock",
    specs: {
      "Type": "BA13 Hydro",
      "Usage": "Pièce humide"
    }
  },
  {
    id: "fp-coupe-feu-ba13",
    name: "PLAQUE DE PLATRE BA13 COUPE-FEU",
    category: "Plaques de Plâtre",
    description: "Plaque de plâtre avec résistance au feu renforcée pour gaines techniques et cloisons coupe-feu.",
    image: "/assets/img/portfolio/portfolio-3.jpg",
    stockStatus: "En Stock",
    oldUrl: "/faux%20plafond.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "fp-std-ba06",
    name: "PLAQUE DE PLATRE BA06",
    category: "Plaques de Plâtre",
    description: "Plaque de plâtre mince pour la réalisation d'ouvrages courbes et décoratifs.",
    image: "/assets/img/portfolio/portfolio-4.jpg",
    stockStatus: "En Stock",
    oldUrl: "/faux%20plafond.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "fp-std-ba15",
    name: "PLAQUE DE PLATRE BA15",
    category: "Plaques de Plâtre",
    description: "Plaque de plâtre haute résistance pour cloisons distributives exigeantes.",
    image: "/assets/img/portfolio/portfolio-5.jpg",
    stockStatus: "En Stock",
    oldUrl: "/faux%20plafond.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "fp-bordex",
    name: "PLAQUE DE PLATRE BORDEX",
    category: "Plaques de Plâtre",
    description: "Plaque de plâtre extérieure haute résistance aux intempéries.",
    image: "/assets/img/portfolio/portfolio-1.jpg", // MISSING bordex.jpg, using portfolio-1.jpg as placeholder
    stockStatus: "En Stock",
    oldUrl: "/faux%20plafond.html",
    availability: "https://schema.org/InStock"
  },

  // --- OSSATURES MÉTALLIQUES (faux plafond.html) ---
  {
    id: "om-plf-60",
    name: "FOURRURE PLAFOND 60",
    category: "Ossature Métallique",
    description: "Profilé métallique galvanisé pour structure de faux plafond suspendu.",
    image: "/assets/img/portfolio/portfolio-9.jpg",
    stockStatus: "En Stock",
    oldUrl: "/faux%20plafond.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "om-plf-47",
    name: "FOURRURE PLAFOND 47",
    category: "Ossature Métallique",
    description: "Profilé métallique léger pour plafonds et doublages.",
    image: "/assets/img/portfolio/portfolio-10.jpg",
    stockStatus: "En Stock",
    oldUrl: "/faux%20plafond.html",
    availability: "https://schema.org/InStock"
  },

  // --- FAUX PLAFONDS MODULAIRES (OSSATURE T24-T15.html) ---
  {
    id: "om-t24",
    name: "OSSATURE T24",
    category: "Ossature Métallique",
    description: "Système d'ossature apparente pour dalles de plafond modulaires 600x600.",
    image: "/assets/img/portfolio/ossature-t24.jpg",
    stockStatus: "En Stock",
    oldUrl: "/OSSATURE%20T24-T15.html",
    availability: "https://schema.org/InStock",
    specs: {
      "Norme": "TS EN13964",
      "Charge": "14.14 kg/m",
      "Système": "Apparent"
    }
  },
  {
    id: "om-t15",
    name: "OSSATURE T15",
    category: "Ossature Métallique",
    description: "Ossature fine pour un rendu esthétique plus discret.",
    image: "/assets/img/portfolio/ossature-t15.jpg",
    stockStatus: "En Stock",
    oldUrl: "/OSSATURE%20T24-T15.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "om-ultraline",
    name: "SYSTEM ULTRALINE",
    category: "Ossature Métallique",
    description: "Ossature design avec joint creux central pour plafonds haut de gamme.",
    image: "/assets/img/portfolio/system-ultraline.jpg",
    stockStatus: "En Stock",
    oldUrl: "/OSSATURE%20T24-T15.html",
    availability: "https://schema.org/InStock"
  },

  // --- ACCESSOIRES PROJETER (accessoires de projeter.html) ---
  {
    id: "ap-chemise",
    name: "CHEMISE PFT PROLOG",
    category: "Accessoires de Projeter",
    description: "Stator et Rotor pour machine à projeter PFT (D6-3). Pièces d'usure haute qualité.",
    image: "/assets/img/portfolio/camisa.jpg",
    stockStatus: "En Stock",
    oldUrl: "/accessoires%20de%20projeter.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "ap-regle",
    name: "RÈGLE EN H 2.5M",
    category: "Accessoires de Projeter",
    description: "Règle à dresser en aluminium pour un surfaçage parfait des enduits projetés.",
    image: "/assets/img/portfolio/regle-hc-2.5.jpg",
    stockStatus: "En Stock",
    oldUrl: "/accessoires%20de%20projeter.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "ap-vis",
    name: "VIS PFT",
    category: "Accessoires de Projeter",
    description: "Vis de transport pour machine à projeter PFT.",
    image: "/assets/img/portfolio/vis-pft.jpg",
    stockStatus: "En Stock",
    oldUrl: "/accessoires%20de%20projeter.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "af-manchon",
    name: "MANCHON TIGE FILETÉE",
    category: "Accessoires de Fixation",
    description: "Raccorde 2 tiges filetées de 6 mm pour suspensions de grande hauteur.",
    image: "/assets/img/portfolio/portfolio-13.jpg",
    stockStatus: "En Stock",
    oldUrl: "/ACCESSOIRES%20DE%20FIXATION.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "af-cavalier",
    name: "CAVALIER PIVOT",
    category: "Accessoires de Fixation",
    description: "Assure le lien entre la fourrure et la tige filetée.",
    image: "/assets/img/portfolio/portfolio-15.jpg",
    stockStatus: "En Stock",
    oldUrl: "/ACCESSOIRES%20DE%20FIXATION.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "af-vis-25",
    name: "VIS TTPC 3,5 X 25 MM",
    category: "Accessoires de Fixation",
    description: "Vis auto-perceuse pour fixation des plaques de plâtre sur ossature métallique.",
    image: "/assets/img/portfolio/portfolio-19.jpg",
    stockStatus: "En Stock",
    oldUrl: "/ACCESSOIRES%20DE%20FIXATION.html",
    availability: "https://schema.org/InStock",
    specs: {
      "Type": "TTPC",
      "Dimensions": "3.5 x 25 mm"
    }
  },
  {
    id: "af-suspente",
    name: "SUSPENTE ARTICULÉE",
    category: "Accessoires de Fixation",
    description: "Lien entre la charpente bois et l'ossature métallique.",
    image: "/assets/img/portfolio/portfolio-31.jpg",
    stockStatus: "En Stock",
    oldUrl: "/ACCESSOIRES%20DE%20FIXATION.html",
    availability: "https://schema.org/InStock"
  },

  // --- PLANCHERS TECHNIQUES (plancher technique.html) ---
  {
    id: "pt-sulfate",
    name: "DALLE EN SULFATE DE CALCIUM",
    category: "Plancher Technique",
    description: "Dalle de plancher surélevé haute performance, ininflammable et acoustique.",
    image: "/assets/img/portfolio/dalle-en-sulfate-de-ccalsuim.jpg",
    stockStatus: "En Stock",
    oldUrl: "/plancher%20technique.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "pt-alu",
    name: "PLANCHER EN ALUMINIUM MOULÉ",
    category: "Plancher Technique",
    description: "Dalle en aluminium moulé pour salles blanches et environnements techniques.",
    image: "/assets/img/portfolio/plancher-technique-en-aluminium-moule.jpg",
    stockStatus: "En Stock",
    oldUrl: "/plancher%20technique.html",
    availability: "https://schema.org/InStock"
  },

  // --- STRUCTURE PLANCHER (Structure pour plancher sureleve.html) ---
  {
    id: "sp-verin-std",
    name: "VÉRIN GAMMA STANDARD",
    category: "Structure Plancher",
    description: "Vérin réglable en acier zingué pour support de plancher technique.",
    image: "/assets/img/portfolio/verin-standard.jpg",
    stockStatus: "En Stock",
    oldUrl: "/Structure%20pour%20plancher%20sureleve.html",
    availability: "https://schema.org/InStock",
    specs: {
      "Matériau": "Acier zingué",
      "Type": "Réglable"
    }
  },

  // --- DALLE LAINE DE ROCHE (dalle en laine de roche.html) ---
  {
    id: "lr-artic",
    name: "ARTIC® ROCKFON",
    category: "Dalles en Laine de Roche",
    description: "Dalle de plafond Rockwool-Rockfon ARTIC. Performance acoustique et design sobre.",
    image: "/assets/img/portfolio/artic.jpg",
    stockStatus: "En Stock",
    oldUrl: "/dalle%20en%20laine%20de%20roche.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "lr-ekla",
    name: "EKLA® ROCKFON",
    category: "Dalles en Laine de Roche",
    description: "Dalle de plafond Rockfon EKLA blanc mat. Uniformité visuelle parfaite.",
    image: "/assets/img/portfolio/ekla.jpg",
    stockStatus: "En Stock",
    oldUrl: "/dalle%20en%20laine%20de%20roche.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "lr-pacific",
    name: "PACIFIC® ROCKFON",
    category: "Dalles en Laine de Roche",
    description: "Dalle de plafond Rockfon PACIFIC. Économique et performante.",
    image: "/assets/img/portfolio/pacific.jpg",
    stockStatus: "En Stock",
    oldUrl: "/dalle%20en%20laine%20de%20roche.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "lr-mediacare",
    name: "MEDIACARE® STANDARD",
    category: "Dalles en Laine de Roche",
    description: "Dalle de plafond pour milieux hospitaliers et salles propres.",
    image: "/assets/img/portfolio/mediacare.jpg",
    stockStatus: "En Stock",
    oldUrl: "/dalle%20en%20laine%20de%20roche.html",
    availability: "https://schema.org/InStock"
  },

  // --- AMF TOPIQ (dalle en laine de roche.html) ---
  {
    id: "amf-prime",
    name: "TOPIC® PRIME",
    category: "Dalles en Laine de Roche",
    description: "Dalle minérale AMF TOPIQ® PRIME avec voile premium.",
    image: "/assets/img/portfolio/topic-prime.jpg",
    stockStatus: "En Stock",
    oldUrl: "/dalle%20en%20laine%20de%20roche.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "amf-eff-pro",
    name: "TOPIC® EFFICIENT PRO",
    category: "Dalles en Laine de Roche",
    description: "Dalle haute performance acoustique TOPIQ® EFFICIENT PRO.",
    image: "/assets/img/portfolio/topic-efficient-pro.jpg",
    stockStatus: "En Stock",
    oldUrl: "/dalle%20en%20laine%20de%20roche.html",
    availability: "https://schema.org/InStock"
  },

  // --- DALLE LAINE MINÉRALE (dalle en laine minerale.html) ---
  {
    id: "lm-plain",
    name: "THERMATEX® PLAIN",
    category: "Dalles en Laine de Roche",
    description: "Dalle en laine minérale THERMATEX® PLAIN de AMF Knauf. Surface lisse premium.",
    image: "/assets/img/portfolio/dalle-sanfonia.jpg",
    stockStatus: "En Stock",
    oldUrl: "/dalle%20en%20laine%20minerale.html",
    availability: "https://schema.org/InStock",
    specs: {
      "Marque": "AMF Knauf",
      "Finition": "Lisse"
    }
  },
  {
    id: "lm-laguna",
    name: "THERMATEX® LAGUNA",
    category: "Dalles en Laine de Roche",
    description: "Dalle minérale THERMATEX® LAGUNA avec texture sablée.",
    image: "/assets/img/portfolio/dalle-brillanto-1.jpg",
    stockStatus: "En Stock",
    oldUrl: "/dalle%20en%20laine%20minerale.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "lm-stratos",
    name: "THERMATEX® FINE STRATOS MICRO",
    category: "Dalles en Laine de Roche",
    description: "Dalle minérale micro-perforée pour correction acoustique optimale.",
    image: "/assets/img/portfolio/dalle-brillanto-2.jpg",
    stockStatus: "En Stock",
    oldUrl: "/dalle%20en%20laine%20minerale.html",
    availability: "https://schema.org/InStock"
  },

  // --- CLOISONS (cloisons de separation doublages.html) ---
  {
    id: "cl-montant-48",
    name: "MONTANT 48",
    category: "Ossature Métallique",
    description: "Montant métallique 48mm pour cloisons et doublages.",
    image: "/assets/img/portfolio/montant-48.jpg",
    stockStatus: "En Stock",
    oldUrl: "/cloisons%20de%20separation%20doublages.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "cl-rail-48",
    name: "RAIL 48",
    category: "Ossature Métallique",
    description: "Rail métallique 48mm pour guidage des montants.",
    image: "/assets/img/portfolio/rail-48.jpg",
    stockStatus: "En Stock",
    oldUrl: "/cloisons%20de%20separation%20doublages.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "cl-corniere-angle",
    name: "CORNIÈRE D'ANGLE MÉTALLIQUE",
    category: "Ossature Métallique",
    description: "Cornière d'angle métallique pour renfort des angles sortants.",
    image: "/assets/img/portfolio/corniere-d'angle-metal.jpg",
    stockStatus: "En Stock",
    oldUrl: "/cloisons%20de%20separation%20doublages.html",
    availability: "https://schema.org/InStock"
  },

  // --- ISOLATION (laine de verre minerale.html & laine de roche.html) ---
  {
    id: "is-rockmur-kraft",
    name: "ROCKMUR KRAFT",
    category: "Laine de Roche",
    description: "Panneau isolant en laine de roche mono densité, semi-rigide, revêtu d'un kraft polyéthylène.",
    image: "/assets/img/portfolio/rockmur-kraft.jpg",
    stockStatus: "En Stock",
    oldUrl: "/laine%20de%20roche.html",
    availability: "https://schema.org/InStock",
    specs: {
      "Performance": "λ35",
      "Classe Air": "A+"
    }
  },
  {
    id: "is-rockmur-nu",
    name: "ROCKMUR NU",
    category: "Laine de Roche",
    description: "Panneau isolant en laine de roche semi-rigide non revêtu. Multi-application.",
    image: "/assets/img/portfolio/rockmur-nu.jpg",
    stockStatus: "En Stock",
    oldUrl: "/laine%20de%20roche.html",
    availability: "https://schema.org/InStock"
  },

  // --- ISOLATION (laine de verre minerale.html) ---
  {
    id: "is-ti212",
    name: "LAINE DE VERRE - TI 212",
    category: "Laine de Verre",
    description: "Rouleau de laine de verre pour isolation thermique et acoustique des combles.",
    image: "/assets/img/portfolio/laine-TI212.jpg",
    stockStatus: "En Stock",
    oldUrl: "/laine%20de%20verre%20minerale.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "is-smart",
    name: "LAINE - SMARTFACADE 32 R",
    category: "Laine de Verre",
    description: "Panneau de laine minérale rigide pour isolation par l'extérieur.",
    image: "/assets/img/portfolio/laine-smartfacade32r.jpg",
    stockStatus: "En Stock",
    oldUrl: "/laine%20de%20verre%20minerale.html",
    availability: "https://schema.org/InStock"
  },

  // --- DALLES PLAFOND (DALLE EN PLATRE.html, etc.) ---
  {
    id: "dp-platre-fissure",
    name: "DALLE DE PLATRE FISSURÉE",
    category: "Dalles en Plâtre",
    description: "Dalle 600x600 fissurée pour faux plafonds démontables.",
    image: "/assets/img/portfolio/dalle-fissure.jpg",
    stockStatus: "En Stock",
    oldUrl: "/DALLE%20EN%20PLATRE.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "dp-platre-med",
    name: "DALLE DE PLATRE MÉDITERANNÉE",
    category: "Dalles en Plâtre",
    description: "Dalle décorative type Méditerrannée en plâtre renforcé.",
    image: "/assets/img/portfolio/dalle-mediterane.jpg",
    stockStatus: "En Stock",
    oldUrl: "/DALLE%20EN%20PLATRE.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "dp-platre-perf",
    name: "DALLE PERFORÉE ACOUSTIQUE",
    category: "Dalles en Plâtre",
    description: "Dalle de plâtre perforée pour une correction acoustique optimale.",
    image: "/assets/img/portfolio/dalle-perforee-acoustique.jpg",
    stockStatus: "En Stock",
    oldUrl: "/DALLE%20EN%20PLATRE.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "dp-vinyle-iso",
    name: "ISO-TONE HYGIÈNE",
    category: "Dalles en Vinyle",
    description: "Dalle en vinyle traitée anti-bactérien pour milieux hospitaliers et alimentaires.",
    image: "/assets/img/portfolio/iso-tone.jpg",
    stockStatus: "En Stock",
    oldUrl: "/dalle%20en%20vinyle.html",
    availability: "https://schema.org/InStock",
    specs: {
      "Surface": "Laminé blanc traité",
      "Norme": "DIN 68861"
    }
  },
  {
    id: "dp-metal",
    name: "DALLE DE PLAFOND EN MÉTAL",
    category: "Dalles en Métal",
    description: "Dalle métallique perforée avec voile acoustique noir.",
    image: "/assets/img/portfolio/dalle-metal.jpg",
    stockStatus: "En Stock",
    oldUrl: "/DALLE%20EN%20METAL.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "dp-platre-soleil",
    name: "DALLE DE PLATRE SOLEIL",
    category: "Dalles en Plâtre",
    description: "Dalle décorative en plâtre avec motif soleil pour plafonds élégants.",
    image: "/assets/img/portfolio/dalle-soleil.jpg",
    stockStatus: "En Stock",
    oldUrl: "/DALLE%20EN%20PLATRE.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "dp-platre-tourbillon",
    name: "DALLE DE PLATRE TOURBILLON",
    category: "Dalles en Plâtre",
    description: "Dalle en plâtre avec motif tourbillon pour un rendu dynamique.",
    image: "/assets/img/portfolio/dalle-tourbillon.jpg",
    stockStatus: "En Stock",
    oldUrl: "/DALLE%20EN%20PLATRE.html",
    availability: "https://schema.org/InStock"
  },

  // --- JOINTS CREUX (JOINT CREUX.html) ---
  {
    id: "jc-std-z",
    name: "JOINT CREUX BA13 STANDARD FORME Z",
    category: "Joint Creux",
    description: "Profilé joint creux en forme de Z pour finitions de plafonds suspendus standard.",
    image: "/assets/img/portfolio/jointcreux1.jpg",
    stockStatus: "En Stock",
    oldUrl: "/JOINT%20CREUX.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "jc-std-u",
    name: "JOINT CREUX BA13 STANDARD FORME U",
    category: "Joint Creux",
    description: "Profilé joint creux en forme de U pour finitions de plafonds suspendus standard.",
    image: "/assets/img/portfolio/jointceux2.jpg",
    stockStatus: "En Stock",
    oldUrl: "/JOINT%20CREUX.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "jc-std-l",
    name: "JOINT CREUX BA13 STANDARD FORME L",
    category: "Joint Creux",
    description: "Profilé joint creux en forme de L pour finitions de plafonds suspendus standard.",
    image: "/assets/img/portfolio/jointcreux3.jpg",
    stockStatus: "En Stock",
    oldUrl: "/JOINT%20CREUX.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "jc-hydro-z",
    name: "JOINT CREUX BA13 HYDROFUGE FORME Z",
    category: "Joint Creux",
    description: "Profilé joint creux en forme de Z pour plafonds en milieu humide.",
    image: "/assets/img/portfolio/hydroz.jpg",
    stockStatus: "En Stock",
    oldUrl: "/JOINT%20CREUX.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "jc-hydro-u",
    name: "JOINT CREUX BA13 HYDROFUGE FORME U",
    category: "Joint Creux",
    description: "Profilé joint creux en forme de U pour plafonds en milieu humide.",
    image: "/assets/img/portfolio/hydrou.jpg",
    stockStatus: "En Stock",
    oldUrl: "/JOINT%20CREUX.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "jc-hydro-l",
    name: "JOINT CREUX BA13 HYDROFUGE FORME L",
    category: "Joint Creux",
    description: "Profilé joint creux en forme de L pour plafonds en milieu humide.",
    image: "/assets/img/portfolio/hydrol.jpg",
    stockStatus: "En Stock",
    oldUrl: "/JOINT%20CREUX.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "jc-omega",
    name: "JOINT CREUX OMEGA",
    category: "Joint Creux",
    description: "Joint creux spécifique pour hôpitaux, établissements scolaires et milieux exigeants.",
    image: "/assets/img/portfolio/jointcreuxomega.jpg",
    stockStatus: "En Stock",
    oldUrl: "/JOINT%20CREUX.html",
    availability: "https://schema.org/InStock"
  },

  // --- ENDUITS (enduits pour joints.html) ---
  {
    id: "en-ce78",
    name: "CE 78 UNIVERSELLE",
    category: "Enduits",
    description: "Enduit pour joints de plaques de plâtre. Temps de prise 8 heures.",
    image: "/assets/img/portfolio/enduit-8h.jpg",
    stockStatus: "En Stock",
    oldUrl: "/enduits%20pour%20joints.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "en-isocol",
    name: "ISOCOL M",
    category: "Enduits",
    description: "Mortier adhésif pour collage de plaques de plâtre.",
    image: "/assets/img/portfolio/isocol-m.jpg",
    stockStatus: "En Stock",
    oldUrl: "/enduits%20pour%20joints.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "en-accrofix",
    name: "ACCROFIX-15",
    category: "Enduits",
    description: "Résine d'accrochage pour supports peu absorbants (béton).",
    image: "/assets/img/portfolio/yes-innov.jpg",
    stockStatus: "En Stock",
    oldUrl: "/enduits%20pour%20joints.html",
    availability: "https://schema.org/InStock"
  },

  // --- BANDES A JOINTS (bandes a joints.html) ---
  {
    id: "ba-grillage",
    name: "BANDE GRILLAGÉE",
    category: "Bandes à Joints",
    description: "Bande auto-adhésive pour joints de plaques de plâtre.",
    image: "/assets/img/portfolio/bande-grillagee.jpg",
    stockStatus: "En Stock",
    oldUrl: "/bandes%20a%20joints.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "ba-papier",
    name: "BANDE A JOINT PAPIER",
    category: "Bandes à Joints",
    description: "Bande papier haute résistance pour pose rapide.",
    image: "/assets/img/portfolio/bande-a-joint.jpg",
    stockStatus: "En Stock",
    oldUrl: "/bandes%20a%20joints.html",
    availability: "https://schema.org/InStock"
  },
  {
    id: "ba-armee",
    name: "BANDE ARMÉE",
    category: "Bandes à Joints",
    description: "Bande armée avec armature acier pour le renfort des angles.",
    image: "/assets/img/portfolio/bande-armee.jpg",
    stockStatus: "En Stock",
    oldUrl: "/bandes%20a%20joints.html",
    availability: "https://schema.org/InStock"
  }
];

export const getCategories = () => {
  const categories = mockProducts.map(product => product.category);
  return ["Tous", ...new Set(categories)];
};

export const getCategoryGroups = () => CATEGORY_GROUPS;
