import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import {BlogPreviewSection} from "../components/Blog.tsx";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Market Research in Central Africa",
      excerpt: "Exploring emerging trends and technologies that are shaping the research landscape in Central Africa.",
        author: "Omega Insights Team",
      date: "March 15, 2024",
      image: "/assets/img/articles/article_1.jpg",
      category: "Market Research",
        type: "article",
    },
    {
      id: 2,
      title: "Digital Transformation in Research Methodologies",
      excerpt: "How digital tools are revolutionizing data collection and analysis in modern research practices.",
        author: "Omega Insights Team",
      date: "March 10, 2024",
      image: "/assets/img/articles/article_2.png",
      category: "Technology",
        type: "video",
        videoUrl: "https://www.youtube.com/watch?v=37OZQBgc8Cg&feature=youtu.be",
    },
  ];

  const categories = ["All", "Market Research", "Technology", "Consumer Insights", "Strategy"];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[68vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/img/articles/article_1.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/70"></div>
        
        {/* Animated accents */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center mt-20 text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
            Insights & Knowledge
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Research Insights & Blog
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest trends, insights, and thought leadership 
            in market research and consulting across Central Africa.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <div className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <BlogPreviewSection blogPosts={blogPosts} />

      {/* Newsletter Subscription */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated with Our Latest Insights
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter and never miss our latest research findings and industry insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
