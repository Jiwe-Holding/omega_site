import React, { useState, useEffect, useRef } from 'react';

const Values = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRefs = useRef([]);

  const values = [
    {
      year: "2010",
      month: "Founded",
      title: "Market Leadership Established",
      text: "We are the largest and most impactful research company in Central Africa: 786 interviewers, 88 supervisors, 22 consultants, 10 specialists, more than 18 permanent clients, 22 different pieces of research solutions, and have conducted 288 projects to empower our clients.",
      type: "type1"
    },
    {
      year: "2011",
      month: "Innovation",
      title: "Data Mining Pioneer",
      text: "We were the first research company in Central Africa with data-mining skills, tools and active projects achievements. Today, we have 18 permanent clients with 4 on data-mining and big data analysis.",
      type: "type2"
    },
    {
      year: "2012",
      month: "Digital First",
      title: "Online Qualitative Research",
      text: "We were the first to experiment Online Qualitative research, now we are spending 416 hours discussing with customers online to derive deep and actionable insights.",
      type: "type3"
    },
    {
      year: "2013",
      month: "Technology",
      title: "CATI Surveys Leadership",
      text: "We were the first with tools and specialized team on CATI surveys. Today, out of 198,000 interviews we conduct annually, we have 66,000 talks with consumers using the latest CATI technology.",
      type: "type1"
    },
    {
      year: "2015",
      month: "Expansion",
      title: "Digital Excellence",
      text: "We expanded our online qualitative research capabilities, now spending 416 hours discussing with customers online to derive deep and actionable insights.",
      type: "type2"
    },
    {
      year: "2016",
      month: "Infrastructure",
      title: "Focus Group Innovation",
      text: "We were the only Central Africa research company using One-way mirror when conducting Focus groups. Today, all our 30 focus group studies (annual average) are taking place in a one-way mirror room.",
      type: "type3"
    },
    {
      year: "2018",
      month: "Global Standards",
      title: "ESOMAR Corporate Member",
      text: "We have joined ESOMAR Corporate and now we continue to execute all our research projects following International standards.",
      type: "type1"
    }
  ];

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * 200);
          }
        },
        { threshold: 0.3 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const getTypeColors = (type) => {
    switch(type) {
      case 'type1':
        return {
          bg: 'from-[#1E88E5] to-[#0D47A1]',      // Bleu dégradé
          accent: 'from-[#64B5F6] to-[#0D47A1]',
          text: 'text-[#0D47A1]',
          date: 'text-white'
        };
      case 'type2':
        return {
          bg: 'from-[#0D47A1] to-[#1565C0]',
          accent: 'from-[#42A5F5] to-[#0D47A1]',
          text: 'text-[#0D47A1]',
          date: 'text-white'
        };
      case 'type3':
        return {
          bg: 'from-[#212121] to-[#0D47A1]',      // #212121 intégré
          accent: 'from-[#90CAF9] to-[#0D47A1]',
          text: 'text-[#212121]',
          date: 'text-white'
        };
      default:
        return {
          bg: 'from-[#1E88E5] to-[#0D47A1]',
          accent: 'from-[#64B5F6] to-[#0D47A1]',
          text: 'text-[#0D47A1]',
          date: 'text-white'
        };
    }
  };


  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 mb-4 justify-center">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent to-[#0D47A1]"></div>
            <span className="text-sm font-semibold text-[#1E88E5] uppercase tracking-wider px-4 py-1 bg-[#E0F7FA] rounded-full">
              Essential Ethics
            </span>
            <div className="w-24 h-0.5 bg-gradient-to-l from-transparent to-[#0D47A1]"></div>
          </div>
          <h2 className="text-5xl font-light text-gray-800 mb-4">Company Evolution</h2>
          <p className="text-xl text-gray-600 font-light">
            Milestones that shaped our leadership in Central African research
          </p>
        </div>

        <div className="relative">
          {values.map((item, index) => {
            const colors = getTypeColors(item.type);
            const isVisible = visibleItems.has(index);
            const isEven = index % 2 === 0;
            const isLast = index === values.length - 1;

            return (
              <div
                key={index}
                ref={el => observerRefs.current[index] = el}
                className={`flex mb-8 relative transition-all duration-700 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${isEven ? 'flex-row-reverse' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-2/5 ${isEven ? 'pl-8' : 'pr-8'}`}>
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <div className={`bg-gradient-to-r ${colors.bg} p-4`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-2xl font-bold ${colors.date}`}>
                          {item.year}
                        </span>
                        <span className={`text-sm font-medium ${colors.date} opacity-90`}>
                          {item.month}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-3 ${colors.text} uppercase tracking-wide`}>
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-1/5 flex justify-center relative">
                  {!isLast && (
                    <div 
                      className={`absolute top-20 left-1/2 w-0.5 bg-gradient-to-b ${colors.accent} transform -translate-x-1/2 transition-all duration-1000 ${
                        isVisible ? 'h-24 opacity-100' : 'h-0 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 100 + 500}ms` }}
                    ></div>
                  )}

                  <div 
                    className={`absolute top-10 w-20 h-0.5 bg-gradient-to-r ${colors.accent} transition-all duration-700 ${
                      isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    } ${isEven ? 'left-1/2' : 'right-1/2'}`}
                    style={{ 
                      transitionDelay: `${index * 100 + 300}ms`,
                      transformOrigin: isEven ? 'left' : 'right'
                    }}
                  ></div>

                  <div 
                    className={`w-20 h-20 rounded-full bg-gradient-to-r ${colors.accent} flex items-center justify-center shadow-xl transform transition-all duration-500 ${
                      isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <span className={`text-2xl font-bold ${colors.text}`}>
                        {item.year.slice(-2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-2/5"></div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-20">
          <div className={`transition-all duration-1000 ${
            visibleItems.size > values.length / 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Shape the Future Together?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Join us in our mission to revolutionize research in Central Africa
            </p>
            <button className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
