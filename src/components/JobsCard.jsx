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
    Eye,
} from "lucide-react";

export default function JobsCard({ job }) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/jobs/${job._id}`)}
            className="group w-full cursor-pointer overflow-hidden rounded-[2.5rem] border border-[#dfcbaf]/70 bg-white/60 backdrop-blur-md shadow-[0_10px_30px_-15px_rgba(44,34,30,0.03)] transition-all duration-500 hover:-translate-y-2 hover:border-[#2c221e] hover:shadow-[0_40px_70px_-20px_rgba(44,34,30,0.15)] flex flex-col justify-between"
        >
            <div>
                <div className="relative h-64 w-full overflow-hidden rounded-t-[2.5rem]">
                    <Image
                        src={job.image}
                        alt={job.company}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        priority
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#2c221e]/70 via-[#2c221e]/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-10">
                        <span className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/20 text-[#ebdcc9] text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/30 shadow-lg">
                            <Eye size={14} strokeWidth={2.5} />
                            View Details
                        </span>
                    </div>

                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                        <span
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider backdrop-blur-md border shadow-sm flex items-center gap-1.5 ${
                                job.status === "active"
                                    ? "bg-emerald-500/20 text-emerald-700 border-emerald-500/30"
                                    : "bg-rose-500/20 text-rose-700 border-rose-500/30"
                            }`}
                        >
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                    job.status === "active"
                                        ? "bg-emerald-500"
                                        : "bg-rose-500"
                                }`}
                            />
                            {job.status}
                        </span>

                        <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-[#ebdcc9]/90 text-[#2c221e] border border-[#dfcbaf] shadow-sm">
                            <Sparkles size={11} />
                            {job.category}
                        </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#ebdcc9]/80 mb-1">
                            {job.company}
                        </p>
                        <h2 className="text-xl font-black tracking-tight line-clamp-1">
                            {job.title}
                        </h2>
                    </div>
                </div>
                <div className="px-6 py-5">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 rounded-xl bg-[#2c221e]/5 px-3 py-2.5 text-xs font-bold text-[#4a3b35]">
                            <MapPin
                                size={14}
                                className="text-[#2c221e]/70 shrink-0"
                            />
                            <span className="line-clamp-1">
                                {job.location}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl bg-[#2c221e]/5 px-3 py-2.5 text-xs font-bold text-[#4a3b35]">
                            <Briefcase
                                size={14}
                                className="text-[#2c221e]/70 shrink-0"
                            />
                            <span className="line-clamp-1">{job.type}</span>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl bg-[#2c221e]/5 px-3 py-2.5 text-xs font-bold text-[#4a3b35]">
                            <Clock3
                                size={14}
                                className="text-[#2c221e]/70 shrink-0"
                            />
                            <span>{job.experience} Yrs Exp</span>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl bg-[#2c221e]/5 px-3 py-2.5 text-xs font-bold text-[#4a3b35]">
                            <Clock3
                                size={14}
                                className="text-[#2c221e]/70 shrink-0"
                            />
                            <span className="line-clamp-1">
                                Till: {job.deadline}
                            </span>
                        </div>
                    </div>

                    {/* <p className="mt-4 text-xs font-medium text-[#4a3b35]/80 line-clamp-2 leading-relaxed px-1">
                        {job.description}
                    </p> */}
                </div>
            </div>

            {/* Bottom Salary + Apply */}
            <div className="px-6 pb-6 pt-2">
                <div className="flex items-center justify-between p-2 pl-4 rounded-2xl bg-[#2c221e] text-[#ebdcc9] shadow-inner transition-all duration-300 group-hover:bg-[#3d302b]">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-white/10 text-[#ebdcc9]">
                            <CircleDollarSign size={18} />
                        </div>

                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-[#ebdcc9]/60">
                                Yearly Package
                            </p>
                            <h4 className="font-black text-base text-white mt-0.5 tracking-tight">
                                ${Number(job.salary).toLocaleString()}
                            </h4>
                        </div>
                    </div>

                    <div className="flex h-11 px-4 items-center justify-center gap-1.5 rounded-xl bg-[#ebdcc9] text-[#2c221e] shadow-sm transition-all duration-300 overflow-hidden">
                        <span className="text-[10px] font-black uppercase tracking-wider max-w-0 opacity-0 group-hover:max-w-[60px] group-hover:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap">
                            Apply
                        </span>

                        <ArrowUpRight
                            size={16}
                            strokeWidth={2.5}
                            className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}