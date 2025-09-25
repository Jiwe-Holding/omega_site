import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import OmegaChatbotFixed from './components/OmegaChatbotFixed';
import Breadcrumbs from './components/Breadcrumbs';
import PerformanceMetrics from './components/PerformanceMetrics';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          <PerformanceMetrics />
          <Header />
          <Breadcrumbs />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <OmegaChatbotFixed />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;