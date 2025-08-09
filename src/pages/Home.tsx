import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaBullseye,
    FaCheckCircle,
    FaArrowRight,
    FaUsers,
    FaChartLine,
    FaHandshake,
} from "react-icons/fa";
import { useState } from "react";
import { ArrowRight, BarChart3, Users, BookOpen, Heart, Shield, UserCheck, Eye, Zap, Award } from 'lucide-react';

import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import {BlogPreviewSection} from "../components/Blog.tsx";
import ServicesPreviewSection from "../components/Services.tsx";
import Partners from "../components/Partners.tsx";

const Home = () => {

  // Small helper to add subtle 3D tilt on hover using mouse position
  function useTilt() {
    const [style, setStyle] = useState<React.CSSProperties>({});

    function onMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1

      const rotateX = (0.5 - py) * 10; // -5..5 deg
      const rotateY = (px - 0.5) * 12; // -6..6 deg

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
      });
    }

    function onLeave() {
      setStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)" });
    }

    return { style, onMove, onLeave };
  }

  const servicesPreviews = [
    {
      title: "Research Analytics",
      description: "Data-driven insights for strategic decisions and market understanding.",
        icon: BarChart3,
    },
    {
      title: "Strategic Consulting",
      description: "Expert guidance for complex challenges and business transformation.",
        icon: Users,
    },
    {
      title: "Custom Solutions",
      description: "Tailored approaches designed for your unique business needs.",
        icon: BookOpen,
    }
  ];

  const companyValues = [
    {
      icon: Heart,
      title: "Passion",
      description: "We put our heart and mind in our work to deliver the BEST value and experience.",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: Shield,
      title: "Resilience",
      description: "We are Icebreaker in the route to bring more complete & scientific based results. Never give up mind oriented.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: UserCheck,
      title: "Accountability",
      description: "We take fully the responsibility of our actions that influence the life of our customers and fellow workers.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Eye,
      title: "Open",
      description: "Our mind is like parachute. We always open to new and more impactful ideas to make it work.",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Zap,
      title: "Speed",
      description: "Speed is critical in our business. We are making sure that you get the right deliverable, quicker than anyone else.",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: Award,
      title: "Integrity",
      description: "We uphold the highest ethical standards and maintain transparency in all our professional relationships and research practices.",
      color: "from-teal-500 to-cyan-600"
    }
  ];

  const blogPosts = [
      {
          title: "The Future of Market Research in Central Africa",
          excerpt: "Exploring emerging trends and technologies shaping research landscape...",
          date: "March 15, 2024",
          author: "Omega Insights Team",
          image: "/assets/img/articles/article_1.jpg",
          type: "article",
      },
      {
          title: "Digital Transformation in Research",
          excerpt: "How digital tools revolutionize data collection and analysis...",
          date: "March 10, 2024",
          author: "Omega Insights Team",
          image: "/assets/img/articles/article_2.png",
          type: "video",
          videoUrl: "https://www.youtube.com/watch?v=37OZQBgc8Cg&feature=youtu.be",
      },
      // Example of a video post (YouTube or Vimeo) → uncomment to use
      // {
      //   title: "Quant at Scale: Sampling in the Real World",
      //   excerpt: "A deep-dive into sampling frames, bias control, and field realities...",
      //   date: "April 02, 2024",
      //   author: "Omega Research Team",
      //   type: "video",
      //   videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      //   tags: ["methodology", "quant"],
      //   readTime: "7 min watch",
      // },
  ];

  return (
    <div>
      <Hero />
      
      {/* Services Preview */}
      <ServicesPreviewSection servicesPreview={servicesPreviews}/>

      {/* About Preview */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        {/* Blue ambient accents */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-blue-600/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left */}
                    <div>
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                            About Omega Research
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Leading Research Excellence in Central Africa
                        </h2>

                        <p className="text-lg text-gray-600 mb-6">
                            With over a decade of experience, we are the largest and most impactful
                            research company in Central Africa, delivering insights that drive strategic
                            decisions across multiple industries.
                        </p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start text-gray-700">
                                <FaCheckCircle className="text-blue-600 mr-3 w-5 h-5 mt-0.5" />
                                <span>
              <strong className="text-gray-900">786</strong> interviewers across Central Africa
            </span>
                            </li>
                            <li className="flex items-start text-gray-700">
                                <FaCheckCircle className="text-blue-600 mr-3 w-5 h-5 mt-0.5" />
                                <span>
              <strong className="text-gray-900">288+</strong> completed projects
            </span>
                            </li>
                            <li className="flex items-start text-gray-700">
                                <FaCheckCircle className="text-blue-600 mr-3 w-5 h-5 mt-0.5" />
                                <span>
              <strong className="text-gray-900">18+</strong> permanent clients
            </span>
                            </li>
                        </ul>

                        {/* Compact stat strip (blue, corporate) */}
                        <div className="grid grid-cols-3 gap-4 mb-10">
                            <div className="bg-white rounded-xl border border-blue-100 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                                <FaUsers className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                                <div className="text-2xl font-bold text-gray-900">786</div>
                                <div className="text-xs text-gray-500">Interviewers</div>
                            </div>
                            <div className="bg-white rounded-xl border border-blue-100 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                                <FaChartLine className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                                <div className="text-2xl font-bold text-gray-900">288+</div>
                                <div className="text-xs text-gray-500">Projects</div>
                            </div>
                            <div className="bg-white rounded-xl border border-blue-100 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                                <FaHandshake className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                                <div className="text-2xl font-bold text-gray-900">18+</div>
                                <div className="text-xs text-gray-500">Clients</div>
                            </div>
                        </div>

                        <Link
                            to="/about"
                            className="inline-flex items-center px-8 py-4 bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors shadow-sm"
                        >
                            Learn More About Us
                            <FaArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>

                    {/* Right: image with layered blue glow + badges */}
                    <div className="relative">
                        {/* soft blue glow */}
                        <div className="absolute -inset-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 rounded-3xl blur-2xl opacity-70" />
                        <img
                            src="/assets/img/about_2.jpg"
                            alt="About Omega Research"
                            className="relative rounded-2xl shadow-2xl ring-1 ring-blue-100 transition-transform duration-500 hover:scale-[1.02]"
                        />

                        {/* Experience badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-lg border border-blue-100">
                            <div className="text-3xl font-bold text-blue-600 leading-none">15+</div>
                            <div className="text-gray-600 text-sm">Years Experience</div>
                        </div>

                        {/* Quality chip */}
                        <div className="absolute -top-6 right-0 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md flex items-center">
                            <span className="w-2 h-2 bg-white/90 rounded-full mr-2 animate-pulse" />
                            Data Quality First
                        </div>
                    </div>
                </div>
            </div>
      </section>

      {/* Blog Preview */}
      <BlogPreviewSection blogPosts={blogPosts} />
        <div className="text-center">
            <Link
                to="/blog"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
            >
                Read All Articles
                <FaArrowRight className="ml-2 w-5 h-5" />
            </Link>
        </div>

      {/* Company Values */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern (blue-only, corporate) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 to-blue-800/10"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              The Heart of Our Organization
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every project we deliver
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Target Icon (blue) */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Concentric animated rings */}
                <div className="relative w-80 h-80 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse" />
                  <div className="absolute inset-4 rounded-full border-4 border-blue-200 animate-pulse [animation-delay:400ms]" />
                  <div className="absolute inset-8 rounded-full border-4 border-blue-300 animate-pulse [animation-delay:800ms]" />

                  {/* Main target icon on clean white disc */}
                  <div className="relative w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl border border-blue-200">
                    <FaBullseye className="w-24 h-24 text-blue-600" />

                    {/* Soft rotating halo for depth */}
                    <div className="absolute -inset-2 rounded-full border border-blue-200/60 blur-[1px] [animation:spin_12s_linear_infinite]" />
                  </div>

                  {/* Floating accent elements (all blue) */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce [animation-delay:300ms]" />
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-700 rounded-full animate-bounce [animation-delay:700ms]" />
                  <div className="absolute top-1/2 -left-8 w-4 h-4 bg-blue-400 rounded-full animate-bounce [animation-delay:1000ms]" />
                </div>
              </div>
            </div>

            {/* Right Side - Values List with 3D hover tilt */}
            <div className="space-y-6">
              {companyValues.map((value, index) => (
                <ValueCard key={index} value={value} />
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors shadow-sm"
            >
              Discover Our Story
              <FaArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* keyframes for slow spin (Tailwind arbitrary syntax-ready) */}
        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </section>

      {/* Testimonials places */}
      <Testimonials />

        {/* Partners places */}
        <Partners/>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Data Into Insights?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today to discuss how we can help you achieve your research objectives
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-10 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors text-lg"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );

  function ValueCard({ value }: { value: { title: string; description: string; icon: any } }) {
    const { style, onMove, onLeave } = useTilt();
    const Icon = value.icon;
  
    return (
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={style}
        className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-xl [transform-style:preserve-3d]"
      >
        {/* 3D layered header badge */}
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg group-hover:shadow-2xl transition-shadow [transform:translateZ(24px)]">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 [transform:translateZ(18px)]">{value.title}</h3>
            <p className="text-gray-600 leading-relaxed [transform:translateZ(12px)]">
              {value.description}
            </p>
          </div>
        </div>
  
        {/* subtle glow on hover for depth */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-[2px] w-24 bg-gradient-to-r from-blue-600 to-blue-300 rounded-full [transform:translateZ(8px)]" />
        </div>
      </div>
    );}
};

export default Home;
