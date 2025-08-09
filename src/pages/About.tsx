import AboutComponent from '../components/About';
import Stats from '../components/Stats';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[68vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/img/about_2.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center mt-20 text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            About Our Company
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Leading Research Excellence in Central Africa
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            With over a decade of experience, we are the largest and most impactful research company in Central Africa, 
            delivering insights that drive strategic decisions.
          </p>
        </div>
      </section>

      <AboutComponent />
      <Stats />
    </div>
  );
};

export default About;
