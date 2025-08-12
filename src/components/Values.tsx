import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heart, Shield, Eye, Zap, UserCheck, Award } from "lucide-react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Example data (replace with your own)
type CompanyValue = { title: string; description: string; icon: React.ComponentType<{ className?: string }> };

const companyValues: CompanyValue[] = [
    {
        icon: Heart,
        title: "Passion",
        description:
            "We put our heart and mind in our work to deliver the BEST value and experience.",
    },
    {
        icon: Shield,
        title: "Resilience",
        description:
            "We are Icebreaker in the route to bring more complete & scientific based results. Never give up mind oriented.",
    },
    {
        icon: Eye,
        title: "Open",
        description:
            "Our mind is like parachute. We always open to new and more impactful ideas to make it work.",
    },
    {
        icon: Zap,
        title: "Speed",
        description:
            "Speed is critical in our business. We are making sure that you get the right deliverable, quicker than anyone else.",
    },
    {
        icon: UserCheck,
        title: "Accountability",
        description:
            "We take fully the responsibility of our actions that influence the life of our customers and fellow workers.",
    },
    {
        icon: Award,
        title: "Integrity",
        description:
            "We uphold the highest ethical standards and maintain transparency in all our professional relationships and research practices.",
    },
];

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

export default function CompanyValuesSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background kept clean white for a corporate look */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header — center aligned, full width */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-10 text-center"
                >
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        The Heart of Our Organization
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                </motion.div>

                {/* Values — take the whole width, responsive grid */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                        },
                    }}
                    className="grid md:grid-cols-2 gap-6"
                >
                    {companyValues.map((value, index) => (
                        <motion.div
                            key={index}
                            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                        >
                            <ValueCard value={value} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA — left aligned */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    className="mt-12 text-center"
                >
                    <Link
                        to="/about"
                        className="inline-flex items-center px-8 py-4 bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors shadow-sm"
                    >
                        Discover Our Story
                        <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-5 h-5" />
                    </Link>
                </motion.div>
            </div>

            {/* keyframes (kept for potential decorative elements elsewhere) */}
            <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </section>
    );
}

function ValueCard({ value }: { value: { title: string; description: string; icon: React.ComponentType<{ className?: string }> } }) {
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
                    <Icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 [transform:translateZ(18px)]">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed [transform:translateZ(12px)]">{value.description}</p>
                </div>
            </div>

            {/* subtle glow on hover for depth */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-[2px] w-24 bg-gradient-to-r from-blue-600 to-blue-300 rounded-full [transform:translateZ(8px)]" />
            </div>
        </div>
    );
}