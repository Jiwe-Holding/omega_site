import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const JourneyFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Données adaptées depuis ta section journey
  const journeyItems = [
    {
      title: "Passion",
      text:
        "We put our heart and mind in our work to deliver the BEST value and experience.",
    },
    {
      title: "Resilience",
      text:
        "We are Icebreaker in the route to bring more complete & scientific based results. Never give up mind oriented.",
    },
    {
      title: "Accountability",
      text:
        "We take fully the responsibility of our actions that influence the life of our customers and fellow workers",
    },
    {
      title: "Open",
      text:
        "Our mind is like parachute. We always open to new and more impactful ideas to make it work.",
    },
    {
      title: "Speed",
      text:
        "Speed is critical in our business. We are making sure that you get the right deliverable, quicker than anyone else.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="journey bg-gray-900 py-16 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        {/* Image à gauche sur grand écran */}
        <div className="journey-img flex-shrink-0 max-w-md w-full">
          <img
            src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Journey"
            loading="lazy"
            className="rounded-lg shadow-lg w-full object-cover"
            sizes="(max-width: 479px) 92vw, (max-width: 767px) 95vw, (max-width: 991px) 96vw, 46vw"
          />
        </div>

        {/* Contenu texte / FAQ accordéon */}
        <div className="journey-data flex-1">
          <div className="section-title mb-8">
            <h2 className="text-3xl font-bold text-white">
              The heart of our organization
            </h2>
          </div>

          <div className="journey-info space-y-4">
            {journeyItems.map((item, index) => (
              <div
                key={index}
                className="journey-block border border-gray-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="journey-title flex items-center justify-between px-6 py-4 w-full text-left cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="journey-line w-1 h-6 bg-blue-600 rounded"></div>
                    <div className="text-lg font-semibold">{item.title}</div>
                  </div>

                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="journey-text px-6 pb-6 text-gray-400">
                    <p>{item.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyFAQ;