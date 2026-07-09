"use client";

import CountUp from "react-countup";
import { Sparkles, Briefcase, Users, Building2, UserCheck } from "lucide-react";

const stats = [
    {
        targetNumber: 10000,
        label: "Jobs Posted",
        icon: Briefcase,
        iconColor: "text-amber-500",
    },
    {
        targetNumber: 8500,
        label: "Candidates",
        icon: Users,
        iconColor: "text-rose-600",
    },
    {
        targetNumber: 1200,
        label: "Companies",
        icon: Building2,
        iconColor: "text-emerald-700",
    },
    {
        targetNumber: 5000,
        label: "Successful Hiring",
        icon: UserCheck,
        iconColor: "text-blue-600",
    },
];

export default function JobStatistics() {
    return (
        <section className="py-10 bg-[#f4ece1] relative overflow-hidden">
            {/* Ambient Premium Backdrop Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#dfcbaf]/15 blur-[130px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                
                {/* Header Title Section */}
                <div className="flex flex-col items-center justify-center mb-16 space-y-2.5 text-center">
                    <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-amber-500 animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#2c221e]/60">
                            Our Impact in Numbers
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#2c221e] tracking-tight leading-none">
                        Job <span className="text-rose-700 font-serif italic font-normal lowercase tracking-normal">statistics</span> 
                    </h2>
                    <p className="text-[#2c221e]/70 text-sm font-medium max-w-md">
                        Empowering career trajectories and corporate scaling globally.
                    </p>
                </div>

                {/* 4-Column Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-[#f4ece1] rounded-[2.2rem] p-6 border border-[#ebdcc9] shadow-[12px_12px_24px_rgba(44,34,30,0.06),-12px_-12px_24px_#ffffff] transition-all duration-300 hover:shadow-[18px_18px_35px_rgba(44,34,30,0.09),-14px_-14px_30px_#ffffff] hover:-translate-y-1.5 group flex flex-col items-center text-center justify-center"
                            >
                                {/* Icon Wrapper Frame */}
                                <div className="p-3.5 bg-[#f4ece1] rounded-2xl w-fit shadow-[4px_4px_8px_rgba(207,200,191,0.5),-4px_-4px_8px_#ffffff] border border-[#ebdcc9]/50 group-hover:bg-[#2c221e] group-hover:text-white transition-all duration-300 mb-5">
                                    <IconComponent 
                                        size={22} 
                                        className={`${stat.iconColor} group-hover:text-white transition-colors duration-300`} 
                                        />
                                </div>

                                {/* Animated Number */}
                                <h3 className="text-3xl sm:text-4xl font-black text-[#2c221e] tracking-tight">
                                    <CountUp
                                        end={stat.targetNumber}
                                        duration={3} // কত সেকেন্ড ধরে অ্যানিমেশনটি চলবে
                                        separator="," // সংখ্যায় কমা অ্যাড করার জন্য (যেমন: 10,000)
                                        enableScrollSpy={true} // স্ক্রিন এই কার্ডে আসলেই কেবল কাউন্টিং শুরু হবে
                                        scrollSpyOnce={true} // বারবার স্ক্রল করলে যেন ক্র্যাশ বা রিলোড না হয়
                                    />
                                    <span className="text-rose-700 ml-0.5">+</span>
                                </h3>

                                {/* Label */}
                                <p className="text-xs font-black uppercase tracking-wider text-[#2c221e]/60 mt-2">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}