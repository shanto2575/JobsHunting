"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    MapPin,
    Briefcase,
    Clock3,
    ArrowUpRight,
    Sparkles,
    CircleDollarSign,
} from "lucide-react";

export default function JobsCard({ job }) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/jobs/${job._id}`)}
            className="group w-full cursor-pointer rounded-[2.5rem] border border-[#dfcbaf]/70 bg-white/70 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 shadow-[12px_12px_30px_rgba(44,34,30,0.05),-12px_-12px_30px_rgba(255,255,255,0.1)] hover:shadow-[20px_20px_40px_rgba(44,34,30,0.1)] flex flex-col justify-between overflow-hidden"
        >
            {/* Image Section - Touches Top, Left, Right */}
            <div className="relative h-60 w-full overflow-hidden border-b border-[#dfcbaf]/50 group">
                <Image
                    src={job.image}
                    alt={job.company}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#2c221e]/40 via-transparent to-transparent" />
                
                {/* Status & Category */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider backdrop-blur-md border shadow-sm ${
                        job.status === "active"
                            ? "bg-emerald-500/90 text-white border-emerald-500"
                            : "bg-rose-500/90 text-white border-rose-500"
                    }`}>
                        {job.status}
                    </span>

                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-[#ebdcc9]/95 text-[#2c221e] border border-[#dfcbaf] shadow-md">
                        <Sparkles size={11} />
                        {job.category}
                    </span>
                </div>
            </div>

            {/* Content & Footer Padding Wrapper */}
            <div className="p-5 pt-4 flex flex-col justify-between flex-grow">
                {/* Info Section */}
                <div className="px-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#4a3b35]/70">
                        {job.company}
                    </p>
                    <h2 className="text-lg font-black text-[#2c221e] mt-1 tracking-tight truncate">
                        {job.title}
                    </h2>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="flex items-center gap-2 rounded-xl bg-[#2c221e]/5 px-3 py-2 text-[10px] font-bold text-[#4a3b35] border border-[#dfcbaf]/20">
                            <MapPin size={12} className="text-[#2c221e]" />
                            <span className="truncate">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl bg-[#2c221e]/5 px-3 py-2 text-[10px] font-bold text-[#4a3b35] border border-[#dfcbaf]/20">
                            <Briefcase size={12} className="text-[#2c221e]" />
                            <span className="truncate">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl bg-[#2c221e]/5 px-3 py-2 text-[10px] font-bold text-[#4a3b35] border border-[#dfcbaf]/20">
                            <Clock3 size={12} className="text-[#2c221e]" />
                            <span>{job.experience} Yrs</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl bg-[#2c221e]/5 px-3 py-2 text-[10px] font-bold text-[#4a3b35] border border-[#dfcbaf]/20">
                            <Clock3 size={12} className="text-[#2c221e]" />
                            <span className="truncate">Till: {job.deadline}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between p-3 rounded-2xl bg-[#2c221e] text-[#ebdcc9] shadow-lg">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-white/10">
                            <CircleDollarSign size={16} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold uppercase opacity-70">Salary</p>
                            <h4 className="font-black text-sm text-white">৳ {Number(job.salary).toLocaleString()}</h4>
                        </div>
                    </div>

                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#ebdcc9] text-[#2c221e] transition-transform group-hover:rotate-45">
                        <ArrowUpRight size={20} strokeWidth={3} />
                    </div>
                </div>
            </div>
        </div>
    );
}