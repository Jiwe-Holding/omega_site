import React from 'react';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="text-gray-900 bg-white">
      {/* Page Title */}
      <div className="py-20 text-center bg-gray-100 px-4">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg max-w-3xl mx-auto">
          OMEGA RESEARCH & CONSULTING is an international market research and consulting firm. Its primary mission is to provide solid insights and analysis by improving the customer experience to enhance the performance of individuals and organizations.
        </p>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[#212121]">About Us</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            OMEGA RESEARCH & CONSULTING is a full-service market research and consulting firm operating in the DRC and across many African countries. We deliver the best client experience, backed by robust and reliable insights.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center text-base text-gray-800">
              <CheckCircle className="text-blue-600 mr-2" /> Milestones & Achievements
            </li>
            <li className="flex items-center text-base text-gray-800">
              <CheckCircle className="text-blue-600 mr-2" /> Empowering Financial Futures
            </li>
            <li className="flex items-center text-base text-gray-800">
              <CheckCircle className="text-blue-600 mr-2" /> Proven Track Record
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <img
            src="assets/img/about_1.jpg"
            alt="About Omega Consulting"
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 lg:order-1">
            <img
              src="assets/img/about_2.jpg"
              alt="Vision"
              className="rounded-xl shadow-md w-full max-w-md"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-3xl font-bold mb-4 text-[#212121]">Our Vision</h3>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              To be the leading source of market insights, helping businesses grow through strategic knowledge and informed decision-making.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          {/* Text on the left */}
          <div>
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="mb-6 text-lg leading-relaxed">
              Transform the market research practices to provide valid & strong insights so that we can
              greatly empower organization performance.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-base">
                <CheckCircle className="text-blue-600 mr-2" /> Visionary and Solutions
              </li>
              <li className="flex items-center text-base">
                <CheckCircle className="text-blue-600 mr-2" /> Empowering and Confidence
              </li>
              <li className="flex items-center text-base">
                <CheckCircle className="text-blue-600 mr-2" /> Tailored Consultancy Expertise
              </li>
            </ul>
          </div>

          {/* Image on the right */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1521790945508-bf2a36314e85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Mission illustration"
              className="rounded-xl shadow-md w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;