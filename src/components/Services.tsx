import React from 'react';
import { BarChart3, Database, Users, Target } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: BarChart3,
      title: "Market Research",
      description: "In-depth analysis to understand your market, competitors, and identify growth opportunities.",
      features: ["Competitive analysis", "Customer segmentation", "Market trends"]
    },
    {
      icon: Database,
      title: "Data Science & Analytics",
      description: "Leverage the power of your data to make informed decisions and optimize performance.",
      features: ["Machine learning", "Forecasting", "Dashboards"]
    },
    {
      icon: Users,
      title: "Strategic Consulting",
      description: "Tailored guidance to define and implement your digital transformation strategy.",
      features: ["Digital roadmap", "Change management", "Team training"]
    },
    {
      icon: Target,
      title: "ROI Optimization",
      description: "Maximize your return on investment with our proven optimization methods.",
      features: ["KPI tracking", "A/B testing", "Performance audit"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Expertise, Driving Your Growth
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how our services can transform your business and accelerate success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-700"
            >
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <service.icon className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Let's talk about your project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
