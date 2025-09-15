import { useEffect } from 'react';

const PerformanceMetrics: React.FC = () => {
  useEffect(() => {
    // Mesure des Core Web Vitals
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as any;
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const clsEntry = entry as any;
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        });
        console.log('CLS:', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });

      // First Contentful Paint (FCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FCP:', entry.startTime);
        });
      }).observe({ entryTypes: ['paint'] });
    };

    // Mesure du temps de chargement de la page
    const measurePageLoad = () => {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        
        console.log('Page Load Time:', loadTime);
        console.log('DOM Content Loaded:', domContentLoaded);
        console.log('Time to Interactive:', navigation.domInteractive - (navigation as any).navigationStart);
      });
    };

    // Mesure de la taille des ressources
    const measureResourceSizes = () => {
      const resources = performance.getEntriesByType('resource');
      let totalSize = 0;
      
      resources.forEach((resource) => {
        const transferSize = (resource as PerformanceResourceTiming).transferSize || 0;
        totalSize += transferSize;
      });
      
      console.log('Total Resource Size:', totalSize, 'bytes');
      console.log('Number of Resources:', resources.length);
    };

    // Exécution des métriques
    measureWebVitals();
    measurePageLoad();
    
    // Délai pour permettre le chargement des ressources
    setTimeout(measureResourceSizes, 2000);

  }, []);

  return null; // Ce composant ne rend rien visuellement
};

export default PerformanceMetrics;
