"use client";

import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Briefcase,
    CircleDollarSign,
    CheckCircle2,
    ArrowUpRight,
} from "lucide-react";

export default function AppliedJobsCard({ job }) {
    return (
        <div className="group overflow-hidden rounded-[2rem] border border-[#dfcbaf] bg-white/60 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

            {/* Image */}
            <div className="relative h-44 w-full overflow-hidden">
                <Image
                    src={job.image}
                    alt={job.company}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Applied Badge */}
                <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                        <CheckCircle2 size={14} />
                        Applied
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">

                {/* Company + Title */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#4a3b35]">
                        {job.company}
                    </p>

                    <h2 className="text-lg font-black text-[#2c221e] line-clamp-1">
                        {job.title}
                    </h2>
                </div>

                {/* Job Info */}
                <div className="space-y-2 text-sm text-[#4a3b35]">

                    <div className="flex items-center gap-2">
                        <MapPin size={15} />
                        <span>{job.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Briefcase size={15} />
                        <span>{job.type}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <CircleDollarSign size={15} />
                        <span>৳ {job.salary}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#dfcbaf]">
                    <span className="rounded-xl bg-[#ebdcc9] px-3 py-1 text-xs font-bold text-[#2c221e]">
                        {job.category}
                    </span>

                    <Link
                        href={`/jobs/${job._id}`}
                        className="flex items-center gap-1 rounded-xl bg-[#2c221e] px-4 py-2 text-xs font-bold text-[#ebdcc9] transition hover:opacity-90"
                    >
                        Details
                        <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}