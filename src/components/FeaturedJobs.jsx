import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Briefcase,
    Clock,
    ArrowUpRight,
    Sparkles
} from "lucide-react";
import { featuredCompanies } from "@/lib/api/seeker/data";

const FeaturedJobs = async () => {
    const jobs = await featuredCompanies();

    return (
        <section className="py-10 bg-[#f4ece1] relative overflow-hidden">
            {/* Ambient Lighting Backdrops */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#dfcbaf]/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-rose-950/5 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-amber-500 animate-pulse" />
                            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#2c221e]/60">
                                Verified Postings
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2c221e] tracking-tight leading-none">
                            Find your favorite <span className="text-rose-700 font-serif italic font-normal lowercase tracking-normal">job</span>
                        </h2>
                        <p className="text-[#2c221e]/70 text-sm font-medium">
                            Discover top-tier companies actively recruiting premier talent.
                        </p>
                    </div>

                    <Link
                        href="/jobs"
                        className="self-start md:self-auto text-center px-6 py-3.5 rounded-2xl bg-[#2c221e] text-[#ebdcc9] font-black text-xs uppercase tracking-wider shadow-[4px_4px_12px_rgba(44,34,30,0.15)] hover:bg-[#3d302b] active:scale-95 transition-all duration-200 border border-[#2c221e]/20"
                    >
                        View All Jobs
                    </Link>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs?.map((job) => (
                        <div
                            key={job._id}
                            className="bg-[#f4ece1] rounded-[2.5rem] p-6 border border-[#ebdcc9] shadow-[12px_12px_24px_rgba(44,34,30,0.06),-12px_-12px_24px_#ffffff] transition-all duration-300 hover:shadow-[18px_18px_35px_rgba(44,34,30,0.09),-14px_-14px_30px_#ffffff] hover:-translate-y-1 group flex flex-col justify-between"
                        >
                            <div>
                                {/* Top Meta Row: Company Logo & Action Button */}
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-1.5 rounded-2xl bg-[#f4ece1] shadow-[3px_3px_6px_rgba(207,200,191,0.4),-3px_-3px_6px_#ffffff] border border-[#ebdcc9]/60 shrink-0">
                                            <Image
                                                src={job.image}
                                                alt={job.company}
                                                width={50}
                                                height={50}
                                                className="w-12 h-12 rounded-xl object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-base text-[#2c221e] tracking-tight">
                                                {job.company}
                                            </h3>
                                            <p className="text-xs font-bold text-[#2c221e]/50 uppercase tracking-wider mt-0.5">
                                                {job.category}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Interactive Diagonal Arrow */}
                                    <div className="p-2.5 bg-[#f4ece1] text-[#2c221e] rounded-xl shadow-[3px_3px_6px_rgba(207,200,191,0.4),-3px_-3px_6px_#ffffff] group-hover:bg-[#2c221e] group-hover:text-white transition-all duration-300">
                                        <ArrowUpRight
                                            className="group-hover:rotate-45 transition-transform duration-300"
                                            size={18}
                                        />
                                    </div>
                                </div>

                                {/* Main Typography Info */}
                                <div className="mt-6 space-y-2">
                                    <h4 className="text-xl font-black text-[#2c221e] tracking-tight leading-snug">
                                        {job.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-[#2c221e]/70 line-clamp-2 leading-relaxed font-medium">
                                        {job.description}
                                    </p>
                                </div>

                                {/* Badges Grid Layout */}
                                <div className="flex flex-wrap gap-2 mt-5">
                                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f4ece1] text-[#2c221e]/80 text-xs font-black uppercase tracking-wider shadow-[2px_2px_5px_rgba(207,200,191,0.35),-2px_-2px_5px_#ffffff] border border-[#ebdcc9]/40">
                                        <MapPin size={12} className="opacity-70" />
                                        {job.location}
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f4ece1] text-[#2c221e]/80 text-xs font-black uppercase tracking-wider shadow-[2px_2px_5px_rgba(207,200,191,0.35),-2px_-2px_5px_#ffffff] border border-[#ebdcc9]/40">
                                        <Briefcase size={12} className="opacity-70" />
                                        {job.type}
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f4ece1] text-[#2c221e]/80 text-xs font-black uppercase tracking-wider shadow-[2px_2px_5px_rgba(207,200,191,0.35),-2px_-2px_5px_#ffffff] border border-[#ebdcc9]/40">
                                        <Clock size={12} className="opacity-70" />
                                        {job.experience}
                                    </span>
                                </div>
                            </div>

                            {/* Footer Pricing & CTA Button */}
                            <div className="mt-6 pt-5 border-t border-[#ebdcc9] flex items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-[#2c221e]/50">Salary Range</span>
                                    <span className="text-lg font-black text-emerald-800 tracking-tight">
                                        ৳ {job.salary}
                                    </span>
                                </div>

                                <Link
                                    href={`/jobs/${job._id}`}
                                    className="px-5 py-3 rounded-xl bg-[#2c221e] text-[#ebdcc9] font-black text-xs uppercase tracking-wider shadow-[3px_3px_6px_rgba(44,34,30,0.15)] hover:bg-[#3d302b] transition-all duration-200 active:scale-95"
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedJobs;