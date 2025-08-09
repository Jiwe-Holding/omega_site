import React from 'react';
import ServicesComponent from '../components/Services';
import Testimonials from '../components/Testimonials';

const Services = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[68vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/img/about_2.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Animated accents */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center mt-20 text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Our Expertise
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Comprehensive Research & Consulting Solutions
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From market research to strategic consulting, we provide tailored solutions 
            that drive growth and innovation across Central Africa.
          </p>
        </div>
      </section>

      <ServicesComponent />
      <Testimonials />
    </div>
  );
};

export default Services;
