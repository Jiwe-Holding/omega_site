import React from 'react';
import { ArrowRight } from 'lucide-react';

const serviceItems = [
  {
    id: 1,
    title: 'Research product NPS+',
    description: 'Measuring and increasing customer loyalty in the B2B segment',
  },
  {
    id: 2,
    title: 'Mystery-shopping and Mystery-calling',
    description: 'Measuring the quality of customer experience',
  },
  {
    id: 3,
    title: 'B2B-panel',
    description: 'Learn from the business community and improve your product or service',
  },
  {
    id: 4,
    title: 'Online Survey',
    description: 'OMEGA Research Panel',
  },
  {
    id: 5,
    title: 'Census',
    description:
      'Procedure of systematically calculating, acquiring and recording information about the members of a given population. Full range service of population or retail census.',
  },
  {
    id: 6,
    title: 'Conjoint Analysis',
    description: 'The most popular and precise statistical method for studying the elasticity of demand',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Our Expertise
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tailored B2B Research Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We specialize in data-driven methods to measure, analyze, and improve customer and business experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-4xl font-bold text-blue-500 mb-4">{item.id}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <a
                  href="#contact"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center"
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Discover What We Can Do For You
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            From measurement to implementation, OMEGA delivers excellence in every phase of your research journey.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;