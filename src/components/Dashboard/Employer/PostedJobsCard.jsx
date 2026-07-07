"use client";

import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Briefcase,
    Clock3,
    Users,
    Trash2,
    Eye,
} from "lucide-react";
import { EmployerEditJobs } from "./EmployerEditJobs";
import { DeletePostedJobs } from "./DeletePostedJobs";

export default function PostedJobsCard({ job }) {
    return (
        <div className="group relative overflow-hidden rounded-3xl border border-[#dfcbaf] bg-white/40 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(44,34,30,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2c221e]/40 hover:shadow-[0_25px_60px_-15px_rgba(44,34,30,0.12)]">

            <div className="relative h-52 w-full overflow-hidden bg-[#2c221e]/5">
                <Image
                    src={job.image}
                    alt={job.company}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute top-4 right-4 z-10">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm border ${job.status === "active"
                                ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                                : "bg-rose-50/80 text-rose-700 border-rose-200"
                            }`}
                    >
                        {job.status}
                    </span>
                </div>
            </div>

            {/* Card Body Content */}
            <div className="p-6">

                <div>
                    <h2 className="text-xl font-black text-[#2c221e] line-clamp-1 tracking-tight">
                        {job.title}
                    </h2>
                    <p className="text-sm font-semibold text-[#4a3b35] mt-1 line-clamp-1 opacity-90">
                        {job.company}
                    </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 rounded-xl bg-white/40 px-3 py-2 border border-[#dfcbaf]/60">
                        <MapPin size={15} className="text-[#4a3b35] shrink-0" />
                        <span className="text-xs font-medium text-[#2c221e] truncate">
                            {job.location}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl bg-white/40 px-3 py-2 border border-[#dfcbaf]/60">
                        <Briefcase size={15} className="text-[#4a3b35] shrink-0" />
                        <span className="text-xs font-medium text-[#2c221e] truncate">
                            {job.type}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl bg-white/40 px-3 py-2 border border-[#dfcbaf]/60">
                        <Clock3 size={15} className="text-[#4a3b35] shrink-0" />
                        <span className="text-xs font-medium text-[#2c221e] truncate">
                            Deadline: {job.deadline}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl bg-white/40 px-3 py-2 border border-[#dfcbaf]/60">
                        <Users size={15} className="text-[#4a3b35] shrink-0" />
                        <span className="text-xs font-bold text-[#2c221e]">
                            {job.applicants?.length || 0} Applicants
                        </span>
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#2c221e] px-4 py-3.5 text-[#ebdcc9] shadow-sm">
                    <div>
                        <p className="text-[10px] uppercase tracking-wider opacity-60 font-semibold">Salary</p>
                        <h4 className="font-bold text-sm sm:text-base">৳ {job.salary}</h4>
                    </div>

                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider opacity-60 font-semibold">Category</p>
                        <h4 className="font-bold text-sm sm:text-base tracking-wide">{job.category}</h4>
                    </div>
                </div>

                {/* Brief Job Description */}
                <p className="mt-5 text-sm font-medium text-[#4a3b35]/90 line-clamp-2 leading-relaxed">
                    {job.description}
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">

                    <EmployerEditJobs job={job} />

                    <DeletePostedJobs job={job} />

                    <Link
                        href={`/jobs/${job._id}`}
                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#dfcbaf] py-3 text-xs uppercase tracking-wider font-bold text-[#2c221e] bg-white/20 transition-all duration-300 hover:bg-[#2c221e] hover:text-[#ebdcc9] hover:border-[#2c221e] active:scale-[0.98] shadow-sm"
                    >
                        <Eye size={14} strokeWidth={2.5} />
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}