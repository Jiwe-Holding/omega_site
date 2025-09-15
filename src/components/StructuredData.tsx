import React from 'react';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'breadcrumb' | 'article' | 'service' | 'faq';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Omega Research & Consulting",
          "alternateName": "Omega Research",
          "url": "https://omega.cd",
          "logo": "https://omega.cd/assets/img/logo.png",
          "description": "La plus grande entreprise de recherche en Afrique avec 786 interviewers, 288+ projets réalisés et 18+ clients permanents.",
          "foundingDate": "2009",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CD",
            "addressRegion": "Kinshasa",
            "addressLocality": "Kinshasa",
            "streetAddress": "8177, Quantum Building, Blvd 30 juin, Gombe"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+243996998277",
            "email": "contact@omega.cd",
            "contactType": "customer service",
            "availableLanguage": ["French", "English"]
          },
          "sameAs": [
            "https://www.linkedin.com/company/omega-research",
            "https://twitter.com/omegaresearch"
          ],
          "numberOfEmployees": "786",
          "areaServed": "Africa",
          "knowsAbout": [
            "Market Research",
            "Strategic Consulting",
            "Data Analytics",
            "Consumer Insights",
            "Business Intelligence"
          ],
          ...data
        };

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Omega Research & Consulting",
          "url": "https://omega.cd",
          "description": "Site officiel d'Omega Research & Consulting, leader de la recherche en Afrique",
          "publisher": {
            "@type": "Organization",
            "name": "Omega Research & Consulting"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://omega-research.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          ...data
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `https://omega.cd${item.url}`
          }))
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image,
          "author": {
            "@type": "Organization",
            "name": "Omega Research & Consulting"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Omega Research & Consulting",
            "logo": {
              "@type": "ImageObject",
              "url": "https://omega.cd/assets/img/logo.png"
            }
          },
          "datePublished": data.datePublished,
          "dateModified": data.dateModified || data.datePublished,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url
          },
          ...data
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name,
          "description": data.description,
          "provider": {
            "@type": "Organization",
            "name": "Omega Research & Consulting"
          },
          "areaServed": "Africa",
          "serviceType": "Research and Consulting",
          "offers": {
            "@type": "Offer",
            "description": data.description
          },
          ...data
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        };

      default:
        return data;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2)
      }}
    />
  );
};

export default StructuredData;
