import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Animated accents */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Floating Cards */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-96">
              {/* Floating Cards */}
              <div className="absolute top-0 left-0 w-64 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl border border-white/20 p-6 animate-float">
                <div className="w-8 h-8 bg-blue-500 rounded-lg mb-4"></div>
                <div className="text-white font-semibold mb-2">Research Analytics</div>
                <div className="text-gray-300 text-sm">Data-driven insights for strategic decisions</div>
              </div>

              <div className="absolute top-20 right-0 w-64 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl border border-white/20 p-6 animate-float delay-500">
                <div className="w-8 h-8 bg-purple-500 rounded-lg mb-4"></div>
                <div className="text-white font-semibold mb-2">Strategic Consulting</div>
                <div className="text-gray-300 text-sm">Expert guidance for complex challenges</div>
              </div>

              <div className="absolute bottom-0 left-8 w-64 h-40 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl border border-white/20 p-6 animate-float delay-1000">
                <div className="w-8 h-8 bg-green-500 rounded-lg mb-4"></div>
                <div className="text-white font-semibold mb-2">Custom Solutions</div>
                <div className="text-gray-300 text-sm">Tailored approaches for unique needs</div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-white text-center lg:text-right flex flex-col items-center lg:items-end">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Transforming Research Into Results
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Omega Research & Consulting
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Forge meaningful partnerships and unlock new opportunities through expert consulting. 
              We turn complex research challenges into strategic advantages.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <a
                href="#services"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                Explore Services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 group">
                <PlayCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-8 mt-12 pt-8 border-t border-white/20 w-full max-w-md lg:max-w-full">
              <div className="text-center lg:text-right">
                <div className="text-3xl font-bold text-blue-400">15+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-3xl font-bold text-purple-400">500+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-3xl font-bold text-purple-400">500+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-3xl font-bold text-green-400">98%</div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
