"use client";

import { Star, Quote, Sparkles } from "lucide-react";

export default function SuccessStories() {
    const testimonials = [
        {
            name: "Shanto Rahman",
            role: "Frontend Developer",
            comment: "I got my first frontend job using this platform. The clean UX and seamless application tracking system helped me prepare and land my role in no time!",
            rating: 5,
            company: "TechNexus IT",
        },
        {
            name: "Anika Tabassum",
            role: "UI/UX Designer",
            comment: "Finding remote jobs with specific design stacks was so hard before. This platform filtered exactly what I needed. Highly recommended!",
            rating: 5,
            company: "CreativeFlow",
        },
        {
            name: "Tanvir Ahmed",
            role: "Full Stack Engineer",
            comment: "The job application process is transparent and extremely fast. I received an interview call within 3 days of applying to my dream role.",
            rating: 5,
            company: "DevOps Studio",
        }
    ];

    return (
        <div className="mt-24 max-w-7xl mx-auto px-4 md:px-8">

            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-14">
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ebdcc9]/95 text-[#2c221e] text-xs font-black uppercase tracking-wider backdrop-blur-md border border-[#dfcbaf] shadow-[4px_4px_10px_rgba(44,34,30,0.1)] mb-3">
                    <Sparkles size={12} className="text-amber-600" />
                    Success Stories
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-[#2c221e] tracking-tight mt-1">
                    <span className="text-rose-600 font-serif italic font-normal lowercase tracking-normal">
                        What Our Candidates Say
                    </span>
                </h2>
                <p className="text-xs md:text-sm font-semibold text-[#2c221e]/60 mt-3 max-w-md leading-relaxed">
                    Real stories from real developers who leveled up their engineering career using our system.
                </p>
            </div>

            {/* Premium Static Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((item, idx) => (
                    <div
                        key={idx}
                        className="rounded-[2.5rem] border border-[#dfcbaf]/70 bg-white/40 backdrop-blur-md p-6 md:p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                        style={{
                            boxShadow: "14px 14px 28px #d9d1c6, -14px -14px 28px #ffffff"
                        }}
                    >
                        {/* Background Quote Icon */}
                        <div className="absolute top-6 right-6 text-[#2c221e]/10 pointer-events-none">
                            <Quote size={48} fill="currentColor" />
                        </div>

                        <div>
                            {/* Star Ratings */}
                            <div className="flex items-center gap-1 mb-5">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} size={15} className="text-amber-500 fill-amber-500" />
                                ))}
                            </div>

                            {/* Main Testimonial Comment */}
                            <p className="text-[#2c221e]/90 text-sm md:text-base leading-relaxed font-semibold italic relative z-10">
                                "{item.comment}"
                            </p>
                        </div>

                        {/* Candidate Footer Block */}
                        <div className="mt-8 pt-5 border-t border-[#dfcbaf]/40 flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <h4 className="text-sm font-black text-[#2c221e] truncate">
                                    {item.name}
                                </h4>
                                <p className="text-[10px] font-bold text-[#4a3b35]/70 uppercase tracking-wider mt-0.5 truncate">
                                    {item.role}
                                </p>
                            </div>

                            {/* Inset Badge for Company */}
                            <div
                                className="px-3 py-1.5 rounded-xl bg-[#2c221e]/5 border border-[#dfcbaf]/20 text-[10px] font-extrabold text-[#2c221e] whitespace-nowrap flex-shrink-0"
                                style={{ boxShadow: "inset 2px 2px 5px #d9d1c6, inset -2px -2px 5px #ffffff" }}
                            >
                                @ {item.company}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}