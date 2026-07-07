import Image from "next/image";
import Link from "next/link";
import { Users, Building2, Briefcase } from "lucide-react";
import { EmployerPostedJobs } from "@/lib/api/employer/data";
import { getUser } from "@/lib/session";

const Applicants = async () => {
    const user = await getUser();

    const PostedJobs = await EmployerPostedJobs(user?.email);

    const jobs = PostedJobs?.data || [];

    const totalApplicants = jobs.reduce(
        (total, job) => total + (job.applicants?.length || 0),
        0
    );

    return (
        <div className="p-6">
            <div className="mb-6 rounded-3xl bg-gradient-to-r from-[#2c221e] via-[#43342d] to-[#5c483c] p-6 text-white shadow-lg">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div>

                        <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                            Employer Dashboard
                        </span>

                        <h1 className="mt-3 text-3xl font-black">
                            Applicants Management
                        </h1>

                        <p className="mt-2 text-sm text-gray-200 max-w-lg">
                            Manage applicants and review every application for your posted jobs.
                        </p>

                    </div>

                    <div className="flex gap-4">

                        <div className="rounded-2xl bg-white/10 px-5 py-4 text-center min-w-[130px]">

                            <Briefcase
                                size={26}
                                className="mx-auto mb-2"
                            />

                            <h2 className="text-2xl font-bold">
                                {jobs.length}
                            </h2>

                            <p className="text-xs text-gray-200">
                                Jobs
                            </p>

                        </div>

                        <div className="rounded-2xl bg-white/10 px-5 py-4 text-center min-w-[130px]">

                            <Users
                                size={26}
                                className="mx-auto mb-2"
                            />

                            <h2 className="text-2xl font-bold">
                                {totalApplicants}
                            </h2>

                            <p className="text-xs text-gray-200">
                                Applicants
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Jobs */}

            {jobs.length === 0 ? (

                <div className="text-center py-24 rounded-3xl border border-[#dfcbaf] bg-white/50">

                    <h2 className="text-2xl font-bold text-[#2c221e]">
                        No Posted Jobs Found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Start posting jobs to receive applications.
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {jobs.map((job) => (

                        <div
                            key={job._id}
                            className="bg-white/50 rounded-3xl overflow-hidden border border-[#dfcbaf] shadow-sm hover:shadow-xl transition-all duration-300"
                        >

                            <div className="relative h-52">

                                <Image
                                    src={job.image}
                                    alt={job.title}
                                    fill
                                    className="object-cover"
                                />

                                <span
                                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white
                                        ${job.status === "approved"
                                            ? "bg-green-600"
                                            : job.status === "rejected"
                                                ? "bg-red-600"
                                                : "bg-yellow-500"
                                        }`}
                                >
                                    {job.status}
                                </span>

                            </div>

                            <div className="p-5 space-y-4">

                                <div>

                                    <h2 className="text-xl font-bold text-[#2c221e] line-clamp-1">
                                        {job.title}
                                    </h2>

                                    <p className="flex items-center gap-2 text-gray-600 text-sm mt-2">

                                        <Building2 size={15} />

                                        {job.company}

                                    </p>

                                    <p className="flex items-center gap-2 text-gray-600 text-sm mt-2">

                                        <Briefcase size={15} />

                                        {job.type}

                                    </p>

                                </div>

                                <div className="flex justify-between items-center rounded-2xl bg-[#f8f5f1] p-4">

                                    <div>

                                        <p className="text-xs text-gray-500">
                                            Total Applicants
                                        </p>

                                        <h3 className="text-3xl font-black text-[#2c221e]">

                                            {job.applicants?.length || 0}

                                        </h3>

                                    </div>

                                    <div className="w-14 h-14 rounded-2xl bg-[#2c221e] flex items-center justify-center">

                                        <Users
                                            size={28}
                                            className="text-white"
                                        />

                                    </div>

                                </div>

                                <Link
                                    href={`/dashboard/employer/applicants/${job._id}`}
                                    className="block w-full rounded-xl bg-[#2c221e] py-3 text-center font-semibold text-white transition hover:bg-[#44352e]"
                                >
                                    View Applicants
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Applicants;