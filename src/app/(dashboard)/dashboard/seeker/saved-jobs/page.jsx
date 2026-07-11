import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Briefcase,
    CircleDollarSign,
    ArrowRight,
    Bookmark,
} from "lucide-react";

import { GetBookmarks } from "@/lib/api/seeker/data";
import { getUser } from "@/lib/session";
import NoSavedJobs from "@/components/Dashboard/seeker/NoSavedJobs";

const SaveJobsPage = async () => {
    const user = await getUser();
    const bookmarks = await GetBookmarks(user?.id);

    return (
        <div className=" px-6 py-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-[#2c221e] text-[#ebdcc9]">
                    <Bookmark size={22} fill="currentColor" />
                </div>

                <div>
                    <h1 className="text-3xl font-black text-[#2c221e]">
                        Saved Jobs
                    </h1>
                    <p className="text-sm text-[#6b5b52]">
                        Your bookmarked opportunities
                    </p>
                </div>
            </div>

            {/* Empty */}
            {bookmarks?.result?.length === 0 ? (
                <NoSavedJobs />
            ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {bookmarks.result.map((job) => (
                        <div
                            key={job._id}
                            className="group rounded-3xl overflow-hidden border border-[#dfcbaf] bg-white/50 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-44 overflow-hidden">
                                <Image
                                    src={job.image}
                                    alt={job.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition duration-500"
                                />

                                <span className="absolute top-4 right-4 bg-[#2c221e] text-[#ebdcc9] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                    {job.type}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-5">

                                <p className="text-xs uppercase font-bold tracking-widest text-[#8a7668]">
                                    {job.company}
                                </p>

                                <h2 className="text-xl font-black text-[#2c221e] mt-2 line-clamp-1">
                                    {job.title}
                                </h2>

                                <div className="space-y-2 mt-4 text-sm">

                                    <div className="flex items-center gap-2 text-[#4a3b35]">
                                        <MapPin size={15} />
                                        {job.location}
                                    </div>

                                    <div className="flex items-center gap-2 text-[#4a3b35]">
                                        <Briefcase size={15} />
                                        {job.experience} Years
                                    </div>

                                    <div className="flex items-center gap-2 font-bold text-[#2c221e]">
                                        <CircleDollarSign size={15} />
                                        ৳ {job.salary}
                                    </div>

                                </div>

                                <div className="mt-6">
                                    <Link
                                        href={`/jobs/${job.jobId}`}
                                        className="flex items-center justify-center gap-2 rounded-2xl bg-[#2c221e] py-3 font-bold text-[#ebdcc9] hover:bg-[#43342d] transition"
                                    >
                                        View Details
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SaveJobsPage;