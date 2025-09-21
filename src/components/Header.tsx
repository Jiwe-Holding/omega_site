import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isHomePage = location.pathname === '/';
  const shouldBeTransparentMobile = !scrolled && isHomePage;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 
        shouldBeTransparentMobile ? 'bg-transparent md:bg-transparent' : 
        'bg-white/95 backdrop-blur-md shadow-lg md:bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" aria-label="Omega Research & Consulting - Accueil">
            <img
              src={scrolled ? '/assets/img/logo.png' : (shouldBeTransparentMobile ? '/assets/img/logo_blanc.png' : '/assets/img/logo.png')}
              alt="Omega Research & Consulting - Logo"
              className="h-10 w-auto transition-all duration-300"
              width="120"
              height="40"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === item.href
                    ? 'text-blue-600'
                    : scrolled ? 'text-gray-700' : 'text-white/90'
                }`}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-colors ${
              shouldBeTransparentMobile ? 'text-white' : 'text-gray-900'
            }`}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden bg-white rounded-lg shadow-xl mt-2 py-4 border text-center space-y-2"
            role="navigation"
            aria-label="Navigation mobile"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block hover:bg-gray-50 hover:text-blue-600 transition-colors px-4 py-2 ${
                  location.pathname === item.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
