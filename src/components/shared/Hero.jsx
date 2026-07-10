"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Briefcase, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

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

    const trendingJobs = ["Software Engineer", "UI/UX Designer", "DevOps Engineer", "QA Engineer", "Data Analyst"];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push("/jobs");
        }
    };

    return (
        <div className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20 bg-[#f4ece1]">

            {/* Premium Ambient Lighting Backdrops */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#dfcbaf]/40 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-rose-950/5 blur-[130px] pointer-events-none" />

            {/* High-Visibility Background Image Grid */}
            <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 opacity-85 pointer-events-none scale-105 animate-[pulse_12s_infinite_alternate]">
                {bgImages.map((src, idx) => (
                    <div
                        key={idx}
                        className={`w-full h-full min-h-[200px] rounded-[2rem] overflow-hidden border-2 border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] ${
                            idx % 2 === 0 ? "translate-y-6 animate-[bounce_8s_infinite_alternate]" : "-translate-y-6 animate-[bounce_9s_infinite_alternate]"
                        }`}
                        style={{ animationDelay: `${idx * 0.2}s` }}
                    >
                        <Image 
                            height={300} 
                            width={300} 
                            src={src} 
                            alt={`Workspace ${idx + 1}`} 
                            className="w-full h-full object-cover brightness-95 contrast-105" 
                        />
                    </div>
                ))}
            </div>

            {/* Balanced Overlap Layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f4ece1]/30 via-[#f4ece1]/75 to-[#f4ece1] z-10" />

            {/* Main Content Area */}
            <div className="relative max-w-4xl mx-auto text-center z-20 flex flex-col items-center">

                {/* Tagline Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ebdcc9] bg-white/90 backdrop-blur-md shadow-[4px_4px_10px_rgba(44,34,30,0.03),-4px_-4px_10px_#ffffff] text-[10px] font-black tracking-[0.2em] uppercase text-[#2c221e] mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-600 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-700"></span>
                    </span>
                    The Elite Career Network
                </div>

                {/* Main Typography Header */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-[#2c221e] drop-shadow-[0_2px_8px_rgba(244,236,225,0.8)]">
                    Discover Your Next <br />
                    <span className="text-rose-700 font-serif italic font-normal lowercase tracking-normal">
                        luxury career
                    </span>
                </h1>

                <p className="mt-6 text-sm sm:text-base md:text-lg max-w-2xl font-bold leading-relaxed text-[#2c221e] drop-shadow-[0_1px_4px_rgba(244,236,225,0.6)]">
                    Connecting visionary professionals with high-end global enterprises. Your next milestone architecture starts right here.
                </p>

                {/* Single Input Search Bar Form */}
                <form 
                    onSubmit={handleSearch}
                    className="w-full max-w-2xl mt-10 p-2 rounded-2xl md:rounded-full border border-[#ebdcc9] bg-white/80 backdrop-blur-lg shadow-[0_20px_50px_rgba(44,34,30,0.12),-12px_-12px_30px_#ffffff] flex flex-col md:flex-row items-center gap-2"
                >
                    {/* Only Job Title Input */}
                    <div className="w-full flex items-center gap-3 px-4 py-3">
                        <Briefcase size={18} className="text-[#2c221e]/50 shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by job title or keywords..."
                            className="w-full bg-transparent border-0 outline-none text-sm font-bold text-[#2c221e] placeholder-[#2c221e]/40 focus:ring-0"
                        />
                    </div>

                    {/* Premium CTA Search Button */}
                    <button 
                        type="submit"
                        className="w-full md:w-auto h-12 md:h-full px-8 py-3.5 rounded-xl md:rounded-full bg-[#2c221e] text-[#ebdcc9] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#3d302b] active:scale-95 shrink-0 shadow-[4px_4px_12px_rgba(44,34,30,0.15)]"
                    >
                        <Search size={14} strokeWidth={3} />
                        Search Jobs
                    </button>
                </form>

                {/* Trending Tech Tags Row */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
                    <span className="text-[#2c221e]/50 font-black uppercase tracking-wider text-[10px]">Trending:</span>
                    {trendingJobs.map((job) => (
                        <button
                            key={job}
                            onClick={() => router.push(`/jobs?search=${encodeURIComponent(job)}`)}
                            className="px-4 py-1.5 rounded-full border border-[#ebdcc9] bg-[#f4ece1]/90 backdrop-blur-sm text-[#2c221e]/90 text-xs font-bold shadow-[2px_2px_6px_rgba(207,200,191,0.4),-2px_-2px_6px_#ffffff] hover:bg-[#2c221e] hover:text-[#ebdcc9] hover:border-[#2c221e] transition-all duration-200"
                        >
                            {job}
                        </button>
                    ))}
                </div>

                {/* Secondary Call-to-Action Link Button */}
                <div className="mt-8">
                    <Link href="/jobs">
                        <button className="px-7 py-3.5 rounded-full border border-[#2c221e] bg-[#f4ece1]/80 backdrop-blur-sm text-[#2c221e] text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-[4px_4px_10px_rgba(44,34,30,0.05),-4px_-4px_10px_#ffffff] hover:bg-[#2c221e] hover:text-[#ebdcc9] transition-all duration-200 active:scale-95">
                            Explore All Jobs
                            <ArrowUpRight size={15} strokeWidth={2.5} />
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}