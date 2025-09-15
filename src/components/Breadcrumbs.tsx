import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import StructuredData from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Accueil', url: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({
        name: name === 'About' ? 'À propos' : 
              name === 'Services' ? 'Services' :
              name === 'Blog' ? 'Blog' :
              name === 'Contact' ? 'Contact' : name,
        url: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  
  // Ne pas afficher les breadcrumbs sur la page d'accueil
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <>
      <StructuredData type="breadcrumb" data={breadcrumbs} />
      <nav 
        className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8" 
        aria-label="Fil d'Ariane"
      >
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.url} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-2" aria-hidden="true" />
                )}
                {index === 0 && (
                  <Home className="w-4 h-4 text-gray-500 mr-1" aria-hidden="true" />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span 
                    className="text-gray-900 font-medium"
                    aria-current="page"
                  >
                    {breadcrumb.name}
                  </span>
                ) : (
                  <Link
                    to={breadcrumb.url}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {breadcrumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
