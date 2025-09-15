// Configuration SEO centralisée
export const SEO_CONFIG = {
  // Informations de base
  siteName: 'Omega Research & Consulting',
  siteUrl: 'https://omega.cd',
  defaultLanguage: 'fr',
  defaultLocale: 'fr_FR',
  
  // Meta tags par défaut
  defaultTitle: 'Omega Research & Consulting - Leader de la Recherche en Afrique',
  defaultDescription: 'Omega Research & Consulting est la plus grande entreprise de recherche en Afrique avec 786 interviewers, 288+ projets réalisés et 18+ clients permanents. Expertise en recherche de marché, consulting stratégique et solutions personnalisées.',
  defaultKeywords: 'recherche de marché, consulting, Afrique, études de marché, analyse de données, insights business, recherche quantitative, recherche qualitative, Omega Research',
  
  // Images par défaut
  defaultImage: '/assets/img/logo.png',
  defaultImageWidth: 1200,
  defaultImageHeight: 630,
  
  // Réseaux sociaux
  social: {
    twitter: '@omegaresearch',
    facebook: 'omegaresearch',
    linkedin: 'omega-research',
  },
  
  // Informations de contact
  contact: {
    email: 'contact@omega.cd',
    phone: '+243996998277',
    address: {
      country: 'République Démocratique du Congo',
      region: 'Kinshasa',
      city: 'Kinshasa',
      street: '8177, Quantum Building, Blvd 30 juin, Gombe',
      coordinates: {
        lat: -4.3317,
        lng: 15.3139
      }
    }
  },
  
  // Configuration des pages
  pages: {
    home: {
      title: 'Omega Research & Consulting - Leader de la Recherche en Afrique',
      description: 'Omega Research & Consulting est la plus grande entreprise de recherche en Afrique avec 786 interviewers, 288+ projets réalisés et 18+ clients permanents.',
      keywords: 'recherche de marché, consulting, Afrique, études de marché, analyse de données, insights business',
      priority: 1.0,
      changefreq: 'weekly'
    },
    about: {
      title: 'À propos d\'Omega Research & Consulting - Notre Histoire et Mission',
      description: 'Découvrez Omega Research & Consulting, la plus grande entreprise de recherche en Afrique. Notre histoire, mission, valeurs et engagement pour l\'excellence depuis 2009.',
      keywords: 'à propos, histoire, mission, valeurs, équipe, Omega Research, recherche Afrique, consulting, expertise',
      priority: 0.8,
      changefreq: 'monthly'
    },
    services: {
      title: 'Services de Recherche et Consulting - Omega Research',
      description: 'Découvrez nos services de recherche de marché, consulting stratégique et solutions personnalisées. Expertise en analyse de données et insights business.',
      keywords: 'services, recherche de marché, consulting, analyse de données, études quantitatives, études qualitatives',
      priority: 0.9,
      changefreq: 'monthly'
    },
    blog: {
      title: 'Blog Omega Research - Insights et Tendances du Marché',
      description: 'Découvrez les dernières tendances du marché, insights et analyses d\'Omega Research. Articles sur la recherche, le consulting et l\'innovation en Afrique.',
      keywords: 'blog, articles, insights, tendances, marché, recherche, consulting, innovation, Afrique',
      priority: 0.7,
      changefreq: 'weekly'
    },
    contact: {
      title: 'Contact Omega Research - Demandez un Devis',
      description: 'Contactez Omega Research & Consulting pour vos projets de recherche et consulting. Devis gratuit et conseils d\'experts.',
      keywords: 'contact, devis, conseil, projet, recherche, consulting, Omega Research',
      priority: 0.6,
      changefreq: 'monthly'
    }
  },
  
  // Données structurées par défaut
  structuredData: {
    organization: {
      '@type': 'Organization',
      name: 'Omega Research & Consulting',
      alternateName: 'Omega Research',
      url: 'https://omega-research.com',
      logo: 'https://omega-research.com/assets/img/logo.png',
      description: 'La plus grande entreprise de recherche en Afrique avec 786 interviewers, 288+ projets réalisés et 18+ clients permanents.',
      foundingDate: '2009',
      numberOfEmployees: '786',
      areaServed: 'Africa',
      knowsAbout: [
        'Market Research',
        'Strategic Consulting',
        'Data Analytics',
        'Consumer Insights',
        'Business Intelligence'
      ]
    }
  }
};

// Fonction utilitaire pour générer des URLs canoniques
export const getCanonicalUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SEO_CONFIG.siteUrl}${cleanPath}`;
};

// Fonction utilitaire pour générer des meta descriptions optimisées
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  if (content.length <= maxLength) return content;
  
  const truncated = content.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? `${truncated.substring(0, lastSpace)}...` : `${truncated}...`;
};

// Fonction utilitaire pour générer des titres SEO
export const generateSEOTitle = (title: string, includeSiteName: boolean = true): string => {
  if (!includeSiteName || title.includes(SEO_CONFIG.siteName)) {
    return title;
  }
  
  return `${title} | ${SEO_CONFIG.siteName}`;
};
