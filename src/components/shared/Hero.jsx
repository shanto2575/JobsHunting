"use client";

import { Search, MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const bgImages = [
        "/hero1.jpg",
        "/hero2.jpg",
        "/hero3.jpg",
        "/hero4.jpg",
        "/hero5.jpg",
        "/hero6.jpg",
        "/hero7.jpg",
        "/hero8.jpg"
    ];

    const trendingJobs = ["Software Engineer", "UI/UX Designer", "Product Manager", "Data Analyst"];

    return (
        <div className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20 bg-[#ebdcc9]">

            {/* Background Images with full opacity and colorful display */}
            <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 opacity-50 pointer-events-none scale-105 animate-[pulse_8s_infinite_alternate]">
                {bgImages.map((src, idx) => (
                    <div
                        key={idx}
                        className={`w-full h-full min-h-[180px] rounded-3xl overflow-hidden shadow-md ${idx % 2 === 0 ? "translate-y-4 animate-[bounce_6s_infinite_alternate]" : "-translate-y-4 animate-[bounce_7s_infinite_alternate]"
                            }`}
                        style={{ animationDelay: `${idx * 0.2}s` }}
                    >
                        <Image height={300} width={300} src={src} alt={`Workspace ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* Light overlay grid for text readability without washing out the pictures */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#ebdcc9]/20 via-[#ebdcc9]/50 to-[#ebdcc9]/90 z-10" />

            {/* Main Content */}
            <div className="relative max-w-4xl mx-auto text-center z-20 flex flex-col items-center">

                {/* Tagline Badge */}
                <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-6 animate-in fade-in slide-in-from-top-4 duration-700"
                    style={{ borderColor: '#dfcbaf', color: '#2c221e', backgroundColor: 'rgba(235, 220, 201, 0.8)' }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2c221e] animate-ping" />
                    The Elite Career Network
                </div>

                {/* Typography Headings with Text Shadow for extreme legibility over backgrounds */}
                <h1
                    className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-[#2c221e] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150"
                    style={{ textShadow: "0 2px 10px rgba(235, 220, 201, 0.5)" }}
                >
                    Discover Your Next <br />
                    <span className="relative inline-block mt-2">
                        Luxury Career
                        <span className="absolute bottom-1 left-0 w-full h-[3px] rounded-full" style={{ backgroundColor: '#dfcbaf' }} />
                    </span>
                </h1>

                <p className="mt-6 text-sm sm:text-base md:text-lg max-w-2xl font-bold leading-relaxed text-[#2c221e] opacity-95 animate-in fade-in zoom-in-95 duration-1000 delay-300">
                    Connecting visionary professionals with high-end global enterprises. Your next milestone architecture starts right here.
                </p>

                {/* Modern Search Bar - Premium Soft Glassmorphism */}
                <div
                    className="w-full max-w-3xl mt-10 p-2 rounded-2xl md:rounded-full border shadow-[0_25px_50px_-12px_rgba(44,34,30,0.15)] flex flex-col md:flex-row items-center gap-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', borderColor: '#dfcbaf', backdropFilter: 'blur(8px)' }}
                >
                    {/* Role Input */}
                    <div className="w-full flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r" style={{ borderColor: '#dfcbaf' }}>
                        <Briefcase size={18} className="text-[#2c221e]/60 shrink-0" />
                        <input
                            type="text"
                            placeholder="Job title, keywords..."
                            className="w-full bg-transparent  border-0 outline-none text-sm font-semibold text-[#2c221e] placeholder-[#2c221e]/50 focus:ring-0"
                        />
                    </div>

                    {/* Location Input */}
                    <div className="w-full flex items-center gap-3 px-4 py-3">
                        <MapPin size={18} className="text-[#2c221e]/60 shrink-0" />
                        <input
                            type="text"
                            placeholder="City, country or remote..."
                            className="w-full bg-transparent border-0 outline-none text-sm font-semibold text-[#2c221e] placeholder-[#2c221e]/50 focus:ring-0"
                        />
                    </div>

                    {/* Premium Search Button with Custom Hover */}
                    <button
                        className="w-full md:w-auto h-12 md:h-full px-8 py-3 rounded-xl md:rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0 shadow-sm"
                        style={{ backgroundColor: '#2c221e', color: '#ebdcc9' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#4a3b35'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#2c221e'}
                    >
                        <Search size={15} strokeWidth={2.5} />
                        Search Jobs
                    </button>
                </div>
                

                {/* Trending Tech Tags Component */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-bold animate-in fade-in duration-1000 delay-700">
                    <span className="text-[#2c221e]/70 font-bold">Trending Search:</span>
                    {trendingJobs.map((job) => (
                        <button
                            key={job}
                            className="px-4 py-1.5 rounded-full border bg-white/40 transition-all duration-300 text-[#2c221e] shadow-sm"
                            style={{ borderColor: '#dfcbaf' }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#2c221e';
                                e.target.style.color = '#ebdcc9';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                                e.target.style.color = '#2c221e';
                            }}
                        >
                            {job}
                        </button>
                    ))}
                </div>

                <div className="my-4">
                    <button
                    className="animate-in fade-in duration-1000 delay-600 px-7 py-3 rounded-full border-2 font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                    style={{ borderColor: '#2c221e', color: '#2c221e', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#2c221e';
                        e.target.style.color = '#ebdcc9';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                        e.target.style.color = '#2c221e';
                    }}
                >
                    Explore All Jobs
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                </button>
                </div>

            </div>
        </div>
    );
}