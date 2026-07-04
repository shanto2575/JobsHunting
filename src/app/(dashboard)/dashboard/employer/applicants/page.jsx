import Image from "next/image";
import Link from "next/link";
import { Users, Building2, Briefcase } from "lucide-react";
import { EmployerPostedJobs } from "@/lib/api/employer/data";
import { getUser } from "@/lib/session";

const Applicants = async () => {
    const user = await getUser();

    const PostedJobs = await EmployerPostedJobs(user?.email);

    const jobs = PostedJobs?.data || [];

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-[#2c221e]">
                    Applicants
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Select a job to view its applicants.
                </p>
            </div>

            {jobs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border">
                    <h2 className="text-xl font-bold text-gray-600">
                        No Posted Jobs Found
                    </h2>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-[#dfcbaf]"
                        >
                            <div className="relative h-52">
                                <Image
                                    src={job.image}
                                    alt={job.title}
                                    fill
                                    className="object-cover"
                                />

                                <span className="absolute top-4 right-4 bg-[#2c221e] text-white text-xs px-3 py-1 rounded-full">
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

                                <div className="flex justify-between items-center bg-[#f8f4ee] rounded-xl p-4">
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Total Applicants
                                        </p>

                                        <h3 className="text-2xl font-black text-[#2c221e]">
                                            {job.applicants?.length || 0}
                                        </h3>
                                    </div>

                                    <Users
                                        className="text-[#2c221e]"
                                        size={34}
                                    />
                                </div>

                                <Link
                                    href={`/dashboard/employer/applicants/${job._id}`}
                                    className="block w-full text-center bg-[#2c221e] hover:bg-[#44352e] text-white py-3 rounded-xl font-semibold transition"
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