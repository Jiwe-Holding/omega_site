import { FaArrowRight } from "react-icons/fa";
import {Link} from "react-router-dom";
import {useState} from "react";
import {
    BarChart3,
    Users,
    BookOpen,
    Target,
    Layers,
    PieChart,
    Megaphone,
    LineChart,
    Type,
    Split,
    Globe,
    PhoneCall,
    Briefcase,
    ClipboardList,
    FileText,
} from "lucide-react";

type ServiceCard = {
    title: string;
    description: string;
    icon: any; // React component (e.g., from react-icons)
};

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

export default function ServicesPreviewSection({ servicesPreview = [
    // Tes 3 services existants
    {
        title: "Research Analytics",
        description:
            "Data-driven insights for strategic decisions and market understanding.",
        icon: BarChart3,
    },
    {
        title: "Strategic Consulting",
        description:
            "Expert guidance for complex challenges and business transformation.",
        icon: Users,
    },
    {
        title: "Custom Solutions",
        description: "Tailored approaches designed for your unique business needs.",
        icon: BookOpen,
    },

    // Ajouts
    {
        title: "Research product NPS+",
        description:
            "Measuring and increasing customer loyalty in the B2B segment",
        icon: Target,
    },
    {
        title: "U&A",
        description:
            "U&A (Usage and Attitude) – a complex research approach that allows you to study in detail the needs and habits of consumers",
        icon: Layers,
    },
    {
        title: "Syndicates (NPS, CSI)",
        description:
            "Research for making decisions on future development of both products and services and companies as a whole",
        icon: PieChart,
    },
    {
        title: "Ad Research",
        description: "Evaluation of the effectiveness of advertising campaigns",
        icon: Megaphone,
    },
    {
        title: "Focus Group",
        description:
            "Full range of services for focus groups organization: from conducting turnkey study to renting focus-room",
        icon: Users,
    },
    {
        title: "Conjoint Analysis",
        description:
            "The most popular and precise statistical method for studying the elasticity of demand",
        icon: LineChart,
    },
    {
        title: "Naming",
        description:
            "Choosing of the best name for a company, product or service",
        icon: Type,
    },
    {
        title: "Segmentation",
        description:
            "Grouping of consumers based on their market behavior, lifestyle and needs",
        icon: Split,
    },
    {
        title: "Social Research",
        description:
            "Study of social trends, dynamics and principles that exist between individuals and within societies. Full range services for baseline and endline surveys.",
        icon: Globe,
    },
    {
        title: "Omnibus",
        description: "Representative all-Congolese population-based surveys",
        icon: Globe,
    },
    {
        title: "Mystery-shopping and Mystery-calling",
        description: "Measuring the quality of customer experience",
        icon: PhoneCall,
    },
    {
        title: "B2B-panel",
        description:
            "Learn from the business community and improve your product or service",
        icon: Briefcase,
    },
    {
        title: "Online Survey",
        description: "OMEGA Research Panel",
        icon: FileText,
    },
    {
        title: "Census",
        description:
            "Procedure of systematically calculating, acquiring and recording information about the members of a given population. Full range service of population or retail census.",
        icon: ClipboardList,
    },
] }: { servicesPreview?: ServiceCard[] }) {
    if (!Array.isArray(servicesPreview) || servicesPreview.length === 0) {
        // Option: skeleton / vide propre
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center text-gray-500">No services to display.</div>
                </div>
            </section>
        );
    }

    return (
        <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                        Our Expertise
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do Best</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive research and consulting solutions tailored to drive your success
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {servicesPreview.map((service, index) => (
                        <ServiceCard3D key={index} service={service} />
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/services"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
                    >
                        View All Services
                        <FaArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ServiceCard3D({ service }: { service: ServiceCard }) {
    const { style, onMove, onLeave } = useTilt();
    const Icon = service.icon;

    return (
        <div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={style}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 [transform-style:preserve-3d] hover:-translate-y-1"
        >
            {/* Icon block (force blue gradient regardless of provided color) */}
            <div className={`w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform [transform:translateZ(22px)]`}>
                <Icon className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 [transform:translateZ(18px)]">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed [transform:translateZ(12px)]">{service.description}</p>

            {/* subtle learn more affordance */}
            <div className="mt-6 inline-flex items-center text-sm font-semibold text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity [transform:translateZ(10px)]">
                Learn more <span className="ml-2 inline-flex"><FaArrowRight className="w-4 h-4" /></span>
            </div>

            {/* bottom accent line */}
            <div className="mt-6 h-[2px] w-24 bg-gradient-to-r from-blue-600 to-blue-300 rounded-full [transform:translateZ(8px)]" />
        </div>
    );
}