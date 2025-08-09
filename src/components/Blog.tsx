import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBullseye,
    faArrowRight,
    faHandshake,
    faShieldAlt,
    faRocket,
    faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Example data (replace with your own)
const companyValues: { title: string; description: string; icon: IconDefinition }[] = [
    {
        title: "Client Obsession",
        description:
            "We build with the customer in mind, measure outcomes, and iterate fast.",
        icon: faHandshake,
    },
    {
        title: "Integrity & Trust",
        description:
            "We do the right thing even when no one is watching and protect data fiercely.",
        icon: faShieldAlt,
    },
    {
        title: "Bias for Action",
        description:
            "We ship, learn, and improve continuously with a pragmatic, results-first mindset.",
        icon: faRocket,
    },
    {
        title: "Team over Ego",
        description:
            "We collaborate openly, share context, and celebrate wins together.",
        icon: faUsersGear,
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
                                    <FontAwesomeIcon icon={faBullseye} className="w-24 h-24 text-blue-600" />

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
                        <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* keyframes for slow spin (Tailwind arbitrary syntax-ready) */}
            <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </section>
    );
}

function ValueCard({ value }: { value: { title: string; description: string; icon: IconDefinition } }) {
    const { style, onMove, onLeave } = useTilt();

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
                    <FontAwesomeIcon icon={value.icon} className="w-8 h-8" />
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


// ==============================
// Blog Preview (Blue Corporate)
// ==============================
import { FaUser, FaCalendarAlt, FaPlay, FaArrowRight, FaClock, FaTag } from "react-icons/fa";

// Blog post shape (extend as needed)
type BlogPost = {
    title: string;
    excerpt: string;
    author: string;
    date: string; // formatted string
    slug?: string;
    image?: string;
    type?: "article" | "video";
    videoUrl?: string; // YouTube or Vimeo link
    tags?: string[];
    readTime?: string; // e.g., "5 min read"
};

function isVideo(post: BlogPost) {
    return post.type === "video" || !!post.videoUrl;
}

function toEmbedUrl(url: string) {
    try {
        const u = new URL(url);
        // YouTube
        if (u.hostname.includes("youtube.com")) {
            const id = u.searchParams.get("v");
            return id ? `https://www.youtube.com/embed/${id}` : url;
        }
        if (u.hostname.includes("youtu.be")) {
            const id = u.pathname.replace("/", "");
            return id ? `https://www.youtube.com/embed/${id}` : url;
        }
        // Vimeo
        if (u.hostname.includes("vimeo.com")) {
            const id = u.pathname.split("/").filter(Boolean).pop();
            return id ? `https://player.vimeo.com/video/${id}` : url;
        }
        return url;
    } catch {
        return url;
    }
}

export function BlogPreviewSection({ blogPosts }: { blogPosts: BlogPost[] }) {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                        Latest Insights
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Research Insights & Blog</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Stay updated with the latest trends and insights in market research
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {blogPosts.map((post, index) => (
                        <article
                            key={index}
                            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                        >
                            {/* Media (image or video) */}
                            <div className="relative">
                                {isVideo(post) ? (
                                    <div className="relative w-full aspect-[16/9] bg-gray-100">
                                        {post.videoUrl ? (
                                            <iframe
                                                src={toEmbedUrl(post.videoUrl)}
                                                title={post.title}
                                                loading="lazy"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                                className="absolute inset-0 w-full h-full rounded-t-2xl"
                                            />
                                        ) : null}
                                        {/* Play overlay */}
                                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white grid place-items-center shadow-lg ring-1 ring-white/30">
                                                <FaPlay className="w-5 h-5 translate-x-[1px]" />
                                            </div>
                                        </div>
                                        {/* Video badge */}
                                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                            Video
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative w-full aspect-[16/9]">
                                        <img
                                            src={post.image || "/assets/img/blog_fallback.jpg"}
                                            alt={post.title}
                                            className="w-full object-cover"
                                            loading="lazy"
                                        />
                                        {/* subtle blue gradient overlay */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-tr from-blue-600 via-blue-400 to-blue-200" />
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                {/* Tags & meta strip */}
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    {post.tags?.slice(0, 3).map((t, i) => (
                                        <span key={i} className="inline-flex items-center text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100">
                      <FaTag className="w-3 h-3 mr-1.5" /> {t}
                    </span>
                                    ))}
                                    {post.readTime && (
                                        <span className="inline-flex items-center text-xs text-gray-500">
                      <FaClock className="w-3 h-3 mr-1.5" /> {post.readTime}
                    </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 mb-5 line-clamp-2">{post.excerpt}</p>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <FaUser className="w-4 h-4 mr-2 text-blue-600" /> {post.author}
                                    </div>
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="w-4 h-4 mr-2 text-blue-600" /> {post.date}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Example data wired to the section (from user) ---
export const blogPosts: BlogPost[] = [
    {
        title: "The Future of Market Research in Central Africa",
        excerpt: "Exploring emerging trends and technologies shaping research landscape...",
        date: "March 15, 2024",
        author: "Dr. Marie Kabila",
        image: "/assets/img/articles/article_1.jpg",
    },
    {
        title: "Digital Transformation in Research",
        excerpt: "How digital tools revolutionize data collection and analysis...",
        date: "March 10, 2024",
        author: "Jean-Paul Mukendi",
        image: "/assets/img/articles/article_2.png",
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

// Small demo component you can import anywhere
export function BlogPreviewDemo() {
    return <BlogPreviewSection blogPosts={blogPosts} />;
}
