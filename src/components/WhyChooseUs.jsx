import { Sparkles, Send, ShieldCheck, Briefcase, Handshake } from "lucide-react";

const features = [
    {
        title: "Easy Apply",
        description: "Apply to your dream jobs with just a single click. Seamless, fast, and optimized for modern professionals.",
        icon: Send,
        iconColor: "text-amber-500",
    },
    {
        title: "Verified Companies",
        description: "Zero spam. Every single company profile and job posting is strictly vetted by our administration team.",
        icon: ShieldCheck,
        iconColor: "text-rose-600",
    },
    {
        title: "Thousands of Jobs",
        description: "Explore endless opportunities across diverse tech stacks, creative domains, and management roles.",
        icon: Briefcase,
        iconColor: "text-emerald-700",
    },
    {
        title: "Direct Contact",
        description: "Skip the middleman. Establish a direct communication channel with top-tier corporate employers.",
        icon: Handshake,
        iconColor: "text-blue-600",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-[#f4ece1] relative overflow-hidden">
            {/* Ambient Premium Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#dfcbaf]/15 blur-[130px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                
                {/* Header Title Section */}
                <div className="flex flex-col items-center justify-center mb-16 space-y-2.5 text-center">
                    <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-amber-500 animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#2c221e]/60">
                            Our Core Value
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#2c221e] tracking-tight leading-none">
                        Why Choose <span className="text-rose-700 font-serif italic font-normal lowercase tracking-normal">us</span> 
                    </h2>
                    <p className="text-[#2c221e]/70 text-sm font-medium max-w-md">
                        We streamline your recruitment journey with absolute elite-class precision.
                    </p>
                </div>

                {/* 4-Column Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-[#f4ece1] rounded-[2.2rem] p-6 border border-[#ebdcc9] shadow-[12px_12px_24px_rgba(44,34,30,0.06),-12px_-12px_24px_#ffffff] transition-all duration-300 hover:shadow-[18px_18px_35px_rgba(44,34,30,0.09),-14px_-14px_30px_#ffffff] hover:-translate-y-1.5 group flex flex-col justify-between"
                            >
                                <div className="space-y-5">
                                    {/* Icon Wrapper Frame with Deep Soft Shadow */}
                                    <div className="p-3.5 bg-[#f4ece1] rounded-2xl w-fit shadow-[4px_4px_8px_rgba(207,200,191,0.5),-4px_-4px_8px_#ffffff] border border-[#ebdcc9]/50 group-hover:bg-[#2c221e] group-hover:text-white transition-all duration-300">
                                        <IconComponent 
                                            size={22} 
                                            className={`${feature.iconColor} group-hover:text-white transition-colors duration-300`} 
                                        />
                                    </div>

                                    {/* Content Area */}
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-black text-[#2c221e] tracking-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#2c221e]/70 leading-relaxed font-medium">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}