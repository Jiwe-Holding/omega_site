import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "Omega Research & Consulting - Leader de la Recherche en Afrique",
  description = "Omega Research & Consulting est la plus grande entreprise de recherche en Afrique avec 786 interviewers, 288+ projets réalisés et 18+ clients permanents. Expertise en recherche de marché, consulting stratégique et solutions personnalisées.",
  keywords = "recherche de marché, consulting, Afrique, études de marché, analyse de données, insights business, recherche quantitative, recherche qualitative, Omega Research",
  image = "https://omega-research.com/assets/img/logo.png",
  url = "https://omega-research.com",
  type = "website",
  structuredData,
  noindex = false
}) => {
  const fullTitle = title.includes("Omega Research") ? title : `${title} | Omega Research & Consulting`;
  const fullUrl = url.startsWith("http") ? url : `https://omega-research.com${url}`;
  const fullImage = image.startsWith("http") ? image : `https://omega-research.com${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content="Omega Research & Consulting" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
      <meta property="twitter:image:alt" content={fullTitle} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
