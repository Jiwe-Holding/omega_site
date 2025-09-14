import React, { useState, useEffect, useRef } from 'react';

const Values = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRefs = useRef([]);

  const values = [
    {
      year: "2010",
      month: "Founded",
      title: "Market Leadership Established",
      text: "We are the largest and most impactful research company in Africa: 786 interviewers, 88 supervisors, 22 consultants, 10 specialists, more than 18 permanent partners, 22 different pieces of research solutions, and have conducted 288 projects to empower our partners.",
      type: "type1"
    },
    {
      year: "2011",
      month: "Innovation",
      title: "Data Mining Pioneer",
      text: "We were the first research company in Africa with data-mining skills, tools and active projects achievements. Today, we have 18 permanent partners with 4 on data-mining and big data analysis.",
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
      text: "We were the only Africa research company using One-way mirror when conducting Focus groups. Today, all our 30 focus group studies (annual average) are taking place in a one-way mirror room.",
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
          bg: 'from-[#1E88E5] to-[#0D47A1]',
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
          bg: 'from-[#212121] to-[#0D47A1]',
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 mb-4 justify-center">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent to-[#0D47A1]"></div>
            <span className="text-sm font-semibold text-[#1E88E5] uppercase tracking-wider px-4 py-1 bg-[#E0F7FA] rounded-full">
              Essential Ethics
            </span>
            <div className="w-24 h-0.5 bg-gradient-to-l from-transparent to-[#0D47A1]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">Company Evolution</h2>
          <p className="text-lg md:text-xl text-gray-600 font-light">
            Milestones that shaped our leadership in African research
          </p>
        </div>

        <div className="relative flex flex-col gap-20 md:gap-12">
          {values.map((item, index) => {
            const colors = getTypeColors(item.type);
            const isVisible = visibleItems.has(index);
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                ref={el => observerRefs.current[index] = el}
                className={`transition-all duration-700 ease-out flex flex-col md:flex-row ${
                  isEven ? 'md:flex-row-reverse' : ''
                } items-center md:items-stretch`}
              >
                <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
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

                {/* Circle and Line */}
                <div className="relative w-full md:w-1/12 flex justify-center items-center">
                  <div 
                    className={`w-14 h-14 rounded-full bg-gradient-to-r ${colors.accent} flex items-center justify-center shadow-xl transform transition-all duration-500 ${
                      isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <span className={`text-lg font-bold ${colors.text}`}>
                        {item.year.slice(-2)}
                      </span>
                    </div>
                  </div>
                  {index !== values.length - 1 && (
                    <div 
                      className={`absolute top-full left-1/2 w-0.5 h-20 md:h-full bg-gradient-to-b ${colors.accent} transform -translate-x-1/2 transition-all duration-1000 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 100 + 500}ms` }}
                    ></div>
                  )}
                </div>

                <div className="w-full md:w-1/2"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Values;
