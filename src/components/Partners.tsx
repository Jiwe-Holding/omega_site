
// ==============================
// Partners (Blue Corporate + Smooth Marquee + Edge Fade)
// ==============================

// Option: tiper si besoin
// type Partner = { name: string; logo: string; href?: string };

export default function Partners() {
    const partners  = [
        { name: "Vodacom", logo: "/assets/img/partners/Vodacom.png" },
        { name: "coca", logo: "/assets/img/partners/coca.png" },
        { name: "geopoll", logo: "/assets/img/partners/geopoll.png" },
        { name: "ipsos", logo: "/assets/img/partners/ipsos.png" },
        { name: "jika", logo: "/assets/img/partners/jika.png" },
        { name: "kantar", logo: "/assets/img/partners/kantar.png" },
        { name: "airtel", logo: "/assets/img/partners/airtel.png" },
        { name: "british", logo: "/assets/img/partners/british.png" },
        { name: "bracongo", logo: "/assets/img/partners/bracongo.png" },
        { name: "mielsen", logo: "/assets/img/partners/mielsen.png" },
        { name: "orange", logo: "/assets/img/partners/orange.png" },
        { name: "skol", logo: "/assets/img/partners/skol.png" },
        { name: "milklink", logo: "/assets/img/partners/milklink.png" },
        { name: "techno", logo: "/assets/img/partners/techno.png" },
        { name: "millward", logo: "/assets/img/partners/millward.png" },
        { name: "transparency", logo: "/assets/img/partners/transparency.png" },
        // …selon les images détectées dans ton zip
    ];

    const marquee = [...partners, ...partners]; // loop seamless

    return (
        <section id="clients" aria-label="Our Partners" className="py-20 bg-white relative overflow-hidden">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Partners</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        We collaborate with leading organizations to deliver excellence across Central Africa.
                    </p>
                </div>
            </div>

            {/* Marquee */}
            <div className="relative">
                {/* Edge fade masks (fond blanc) */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-transparent to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-transparent to-transparent" />

                <div className="overflow-hidden">
                    <div className="flex gap-8 items-center min-w-max animate-[scroll-x_28s_linear_infinite]
                    hover:[animation-play-state:paused] will-change-transform px-8">
                        {marquee.map((p, i) => (
                            <div key={i} className="group w-40 sm:w-44 md:w-48">
                                <div
                                    className="w-full h-20 bg-transparent rounded-xl grid place-items-center
                       shadow-sm overflow-hidden transition-colors"
                                >
                                    <img
                                        src={p.logo}
                                        alt={p.name}
                                        loading="lazy"
                                        className="max-h-10 w-auto object-contain transition-all duration-300
                         group-hover:[filter:grayscale(1)_brightness(.9)_sepia(1)_hue-rotate(190deg)_saturate(600%)]"
                                        onError={(e) => {
                                            const el = e.currentTarget as HTMLImageElement;
                                            el.style.opacity = "0.4";
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            {/* Keyframes for marquee */}
            <style>{`
        @keyframes scroll-x { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
        </section>
    );
}