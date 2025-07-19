import React from 'react';

const About = () => {
  const milestones = [
    "Milestones & Achievements",
    "Empowering Financial Futures",
    "Proven Track Record"
  ];

  const missionPoints = [
    "Visionary and Solutions",
    "Empowering and Confidence",
    "Tailored Consultancy Expertise"
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-300">
            OMEGA RESEARCH AND CONSULTING is an international market research and consulting firm. Its primary mission is to provide solid insights and analysis by improving the customer experience to enhance the performance of individuals and organizations.
          </p>
        </div>

        {/* About Section */}
        <div className="lg:flex lg:items-center lg:gap-16">
          <div className="lg:flex-1 space-y-6">
            <p className="text-gray-300">
              OMEGA RESEARCH & CONSULTING is a full-service market research and consulting firm in the DRC and many other countries in Africa, offering the best client experience based on solid and robust information.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {milestones.map((item, i) => (
                <li key={i} className="font-medium">{item}</li>
              ))}
            </ul>
          </div>
          <div className="lg:flex-1 mt-10 lg:mt-0">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team collaboration meeting"
              className="rounded-2xl object-cover w-full max-h-96"
              loading="lazy"
            />
          </div>
        </div>

        {/* Vision Section */}
        <div className="lg:flex lg:items-center lg:gap-16">
          <div className="lg:flex-1">
            <img
              src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Vision and strategy"
              className="rounded-2xl object-cover w-full max-h-96"
              loading="lazy"
            />
          </div>
          <div className="lg:flex-1 mt-10 lg:mt-0 text-gray-300">
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="mb-6">Be the leading source of research Insights everywhere we go</p>
            <a
              href="#contact"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Contact Us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-300">

            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h4 className="font-semibold mb-2">Research product NPS+</h4>
              <p className="mb-4">Measuring and increasing customer loyalty in the B2B segment</p>
              <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-600 font-medium">
                Learn More
                <img
                  src="https://assets-global.website-files.com/65125d2b3666b95695670ae6/6545d3914f6aaae6af0d082a_ic-arrow-btn.svg"
                  alt="Arrow"
                  className="ml-2 w-4 h-4"
                  loading="lazy"
                />
              </a>
            </div>

            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h4 className="font-semibold mb-2">Social Research</h4>
              <p className="mb-4">
                Study of social trends, dynamics and principles that exist between individuals and within societies. Full range services for baseline and endline surveys.
              </p>
              <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-600 font-medium">
                Learn More
                <img
                  src="https://assets-global.website-files.com/65125d2b3666b95695670ae6/6545d3914f6aaae6af0d082a_ic-arrow-btn.svg"
                  alt="Arrow"
                  className="ml-2 w-4 h-4"
                  loading="lazy"
                />
              </a>
            </div>

            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h4 className="font-semibold mb-2">U &amp; A</h4>
              <p className="mb-4">
                U&A (Usage and Attitude) – a complex research approach that allows you to study in detail the needs and habits of consumers
              </p>
              <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-600 font-medium">
                Learn More
                <img
                  src="https://assets-global.website-files.com/65125d2b3666b95695670ae6/6545d3914f6aaae6af0d082a_ic-arrow-btn.svg"
                  alt="Arrow"
                  className="ml-2 w-4 h-4"
                  loading="lazy"
                />
              </a>
            </div>

            <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h4 className="font-semibold mb-2">Focus Group</h4>
              <p className="mb-4">
                Full range of services for focus groups organization: from conducting turnkey study to renting focus-room
              </p>
              <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-600 font-medium">
                Learn More
                <img
                  src="https://assets-global.website-files.com/65125d2b3666b95695670ae6/6545d3914f6aaae6af0d082a_ic-arrow-btn.svg"
                  alt="Arrow"
                  className="ml-2 w-4 h-4"
                  loading="lazy"
                />
              </a>
            </div>

          </div>
        </div>

        {/* Mission Section */}
        <div className="lg:flex lg:items-center lg:gap-16 mt-20">
          <div className="lg:flex-1">
            <img
              src="https://images.pexels.com/photos/3183188/pexels-photo-3183188.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team discussion and planning"
              className="rounded-2xl object-cover w-full max-h-96"
              loading="lazy"
            />
          </div>
          <div className="lg:flex-1 mt-10 lg:mt-0 text-gray-300">
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="mb-6">
              Transform the market research practices to provide valid & strong Insights SO THAT we can Greatly Empower Organization Performance
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              {missionPoints.map((point, i) => (
                <li key={i} className="font-medium">{point}</li>
              ))}
            </ul>
            <a
              href="services.html"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Learn More
              <img
                src="https://assets-global.website-files.com/65125d2b3666b95695670ae6/6545d3914f6aaae6af0d082a_ic-arrow-btn.svg"
                alt="Arrow"
                className="ml-2 w-5 h-5"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;