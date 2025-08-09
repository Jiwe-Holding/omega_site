import React from 'react';
import ContactComponent from '../components/Contact';

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/img/about_2.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Animated accents */}
        <div className="absolute top-16 left-16 w-56 h-56 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Get In Touch
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Let's Start Your Research Journey
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your data into insights? Contact us today to discuss 
            how we can help you achieve your research and strategic objectives.
          </p>
        </div>
      </section>

      <ContactComponent />
    </div>
  );
};

export default Contact;
