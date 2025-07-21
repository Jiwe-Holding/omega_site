import React, { useState } from 'react';

const reviews = [
  {
    text: "Good and timely communication, thorough in the training and execution of projects.",
    name: "E.N.",
    company: "GeoPoll",
  },
  {
    text: "Love working with the team. Very efficient and always deliver on time.",
    name: "C.F.",
    company: "Kantar SA",
  },
  {
    text: "Good structure on the various people handling projects e.g supervisor, QC & also the entire has feasibility on projects.",
    name: "S.C.",
    company: "Nielsen Kenya",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? reviews.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === reviews.length - 1 ? 0 : current + 1);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>

        <div className="relative bg-white rounded-xl shadow-lg p-8">
          {/* Review Content */}
          <p className="text-gray-700 italic mb-6 text-center text-lg leading-relaxed">
            “{reviews[current].text}”
          </p>

          {/* Reviewer info */}
          <div className="text-center">
            <div className="font-semibold text-gray-900">{reviews[current].name}</div>
            <div className="text-sm text-gray-500">{reviews[current].company}</div>
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous Review"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Review"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition"
          >
            ›
          </button>

          {/* Dots navigation */}
          <div className="flex justify-center mt-6 space-x-3">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === current ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
