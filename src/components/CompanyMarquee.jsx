"use client";

import Marquee from "react-fast-marquee";
import { Sparkles } from "lucide-react";
import Image from "next/image";

const companies = [
    { name: "Google", logo: "/logo/google.jpg" },
    { name: "Microsoft", logo: "/logo/microsoft.jpg" },
    { name: "Amazon", logo: "/logo/amazon.jpg" },
    { name: "Apple", logo: "/logo/apple.jpg" },
    { name: "Samsung", logo: "/logo/sumsung.jpg" },
    { name: "NextGen", logo: "/logo/NextGen.jpg" },
    { name: "IBM", logo: "/logo/IBM.jpg" },
    { name: "Spacex", logo: "/logo/spacex.jpg" },
    { name: "Apex", logo: "/logo/apex.jpg" },
    { name: "Tesla", logo: "/logo/tesla.jpg" },
    { name: "Meta", logo: "/logo/meta.jpg" },
];

export default function CompanyMarquee() {
    return (
        <section className="py-20 bg-[#f4ece1] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#dfcbaf]/20 blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose-950/5 blur-[100px] pointer-events-none" />

            <div className="w-full mx-auto relative z-10">
                
                {/* Modern & Premium Heading Structure */}
                <div className="flex flex-col items-center justify-center mb-12 space-y-2.5 px-4 text-center">
                    <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-amber-500 animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#2c221e]/60">
                            Global Integrations
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#2c221e] tracking-tight leading-none">
                        Trusted by Top <span className="text-rose-700 font-serif italic font-normal lowercase tracking-normal">companies</span>
                    </h2>
                </div>

                {/* Marquee Wrapper with soft fade effects on left and right edges */}
                <div className="relative w-full mask-gradient">
                    <Marquee speed={40} pauseOnHover gradient={false}>
                        {companies.map((company) => (
                            <div
                                key={company.name}
                                className="mx-3 flex items-center gap-4 rounded-2xl bg-white/40 backdrop-blur-md border border-[#dfcbaf]/50 px-6 py-4.5 shadow-[8px_8px_20px_rgba(44,34,30,0.03),-8px_-8px_20px_rgba(255,255,255,0.6)] hover:bg-white/60 transition-all duration-300 group cursor-default"
                            >
                                {/* Premium Image Frame */}
                                <div className="p-1 rounded-xl bg-white shadow-[inset_1px_1px_3px_rgba(0,0,0,0.05)] border border-[#dfcbaf]/30 shrink-0 transition-transform duration-300 group-hover:scale-105">
                                    <Image
                                        src={company.logo}
                                        alt={company.name}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 object-contain rounded-lg"
                                    />
                                </div>

                                {/* Typography */}
                                <span className="font-black text-sm tracking-tight text-[#2c221e]/80 group-hover:text-[#2c221e] transition-colors uppercase">
                                    {company.name}
                                </span>
                            </div>
                        ))}
                    </Marquee>
                </div>

            </div>
        </section>
    );
}