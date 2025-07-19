import React from "react";
import { ArrowRight } from "lucide-react";

const ArticlesSection = () => {
  const articles = [
    {
      title: "The global impact and reach of research",
      link: "https://researchworld.com/articles/the-global-impact-and-reach-of-research",
      description:
        "The global nature of research and how advancements in technology and methodology are driving change, both good and bad for the industry.",
      date: "18-02-2023",
      image: "assets/img/articles/article_1.jpg",
    },
    {
      title: "New ways of collecting data",
      link: "https://youtu.be/37OZQBgc8Cg",
      description: "",
      date: "18-02-2023",
      image: "assets/img/articles/article_2.png",
    },
  ];

  return (
    <section id="ressources" className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Articles & Resources
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our insightful blogs covering a wide range of topics in the research and consultancy industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white text-black text-xs px-2 py-1 rounded shadow">
                  {article.date}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {article.description || "Click to learn more about this topic."}
                </p>
                <div className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
