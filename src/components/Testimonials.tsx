import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "E.N.",
      position: "",
      company: "GeoPoll",
      content: "Good and timely communication, thorough in the training and execution of projects.",
      rating: 5,
      results: ""
    },
    {
      name: "C.F.",
      position: "",
      company: "Kantar SA",
      content: "Love working with the team. Very efficient and always deliver on time.",
      rating: 5,
      results: ""
    },
    {
      name: "S.C.",
      position: "",
      company: "Nielsen Kenya",
      content: "Good structure on the various people handling projects e.g supervisor, QC & also the entire team has feasibility on projects.",
      rating: 5,
      results: ""
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What our clients say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Their testimonials reflect our commitment to delivering exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-700"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-400/30" />

              <div className="flex items-center mb-6">
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  {testimonial.position && <p className="text-sm text-gray-300">{testimonial.position}</p>}
                  <p className="text-sm text-blue-400 font-medium">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {testimonial.results && (
                <div className="bg-blue-600/20 rounded-lg p-3 border border-blue-600/30">
                  <p className="text-blue-300 font-semibold text-sm">
                    Résultat : {testimonial.results}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Join over 18+ companies who trust us
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Start your transformation today and discover how our solutions can accelerate your growth.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Schedule a free consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
