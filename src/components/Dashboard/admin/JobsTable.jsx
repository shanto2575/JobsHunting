"use client";

import Link from "next/link";
import {
    Building2,
    Users,
    CheckCircle,
    XCircle,
    Trash2,
    Eye,
} from "lucide-react";
import { showToast } from "@/Util/toast";
import { useRouter } from "next/navigation";
import { DeleteJobs, ManageJobs } from "@/lib/api/admin/action";

export default function JobsTable({ jobs }) {
    const router = useRouter();
    const handleStatus = async (id, status) => {
        const data = await ManageJobs(id, status)
        if (status === "approved") {
            showToast.success("Job Approved Successfully");
        } else {
            showToast.error("Job Rejected Successfully");
        }
        router.refresh();
    };

    const handleDelete = async (id) => {
        const data = await DeleteJobs(id)
        if (data) {
            showToast.success('JObs Delete Successful')
            router.refresh()
        } else {
            showToast.error('Failed Jobs Delete')
        }
    }
    return (
        <div className="overflow-hidden rounded-3xl border border-[#dfcbaf]/60 bg-white/70 backdrop-blur-md shadow-[0_12px_40px_-15px_rgba(44,34,30,0.05)]">

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-[#1d1c1b] text-[#ebdcc9] uppercase tracking-wider text-xs">

                            <th className="px-6 py-4.5 text-left font-bold">
                                Company
                            </th>

                            <th className="px-6 py-4.5 text-left font-bold">
                                Job
                            </th>

                            <th className="px-6 py-4.5 text-left font-bold">
                                Employer
                            </th>

                            <th className="px-6 py-4.5 text-center font-bold">
                                Applicants
                            </th>

                            <th className="px-6 py-4.5 text-center font-bold">
                                Status
                            </th>

                            <th className="px-6 py-4.5 text-center font-bold">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-[#dfcbaf]/30">

                        {jobs.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="py-24 text-center text-sm font-medium text-[#2c221e]/50 bg-white/40"
                                >
                                    No Jobs Found
                                </td>

                            </tr>

                        ) : (

                            jobs.map((job) => (

                                <tr
                                    key={job._id}
                                    className="hover:bg-[#ebdcc9]/20 transition-all duration-200"
                                >

                                    {/* Company */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-3.5">

                                            <div className="w-10 h-10 rounded-xl bg-[#ebdcc9]/50 border border-[#dfcbaf]/40 flex items-center justify-center shrink-0 shadow-sm">

                                                <Building2
                                                    size={18}
                                                    className="text-[#2c221e]"
                                                />

                                            </div>

                                            <div>

                                                <h2 className="font-bold text-[#2c221e] text-sm tracking-tight">
                                                    {job.company}
                                                </h2>

                                                <p className="text-xs text-[#2c221e]/60 font-medium mt-0.5">
                                                    {job.location}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* Job */}

                                    <td className="px-6 py-5">

                                        <h2 className="font-bold text-[#2c221e] text-sm tracking-tight">
                                            {job.title}
                                        </h2>

                                        <p className="text-xs text-[#2c221e]/70 font-semibold inline-flex items-center gap-1.5 mt-1 bg-[#ebdcc9]/30 px-2 py-0.5 rounded-md border border-[#dfcbaf]/20">

                                            {job.type} • ${job.salary}

                                        </p>

                                    </td>

                                    {/* Employer */}

                                    <td className="px-6 py-5 text-sm font-medium text-[#2c221e]/80">

                                        {job.userEmail}

                                    </td>

                                    {/* Applicants */}

                                    <td className="px-6 py-5 text-center">

                                        <div className="inline-flex items-center gap-1.5 bg-[#2c221e] text-[#ebdcc9] px-3 py-1 rounded-full text-xs font-bold shadow-sm">

                                            <Users
                                                size={13}
                                            />

                                            <span>

                                                {job.applicants?.length || 0}

                                            </span>

                                        </div>

                                    </td>

                                    {/* Status */}

                                    <td className="px-6 py-5 text-center">

                                        <span
                                            className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm min-w-[90px]

                                            ${job.status === "approved"

                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"

                                                    : job.status === "rejected"

                                                        ? "bg-rose-50 text-rose-700 border-rose-200"

                                                        : "bg-amber-50 text-amber-700 border-amber-200"

                                                }`}
                                        >

                                            {job.status}

                                        </span>

                                    </td>

                                    {/* Actions */}

                                    <td className="px-6 py-5">

                                        <div className="flex justify-center items-center gap-2">

                                            {/* View */}

                                            <Link
                                                href={`/jobs/${job._id}`}
                                                className="p-2 rounded-xl bg-white border border-[#dfcbaf] hover:bg-[#2c221e] text-[#2c221e] hover:text-[#ebdcc9] hover:border-[#2c221e] shadow-sm transition-all duration-200"
                                                title="View"
                                            >

                                                <Eye size={16} />

                                            </Link>

                                            {/* Pending হলে Approve Reject */}

                                            <button
                                                onClick={() =>
                                                    handleStatus(
                                                        job._id,
                                                        job.status === "approved"
                                                            ? "rejected"
                                                            : "approved"
                                                    )
                                                }
                                                className={`p-2 rounded-xl border shadow-sm transition-all duration-200 ${job.status === "approved"
                                                        ? "bg-white border-orange-200 hover:bg-orange-50 text-orange-600"
                                                        : "bg-white border-emerald-200 hover:bg-emerald-50 text-emerald-600"
                                                    }`}
                                                title={
                                                    job.status === "approved"
                                                        ? "Reject Job"
                                                        : "Approve Job"
                                                }
                                            >
                                                {job.status === "approved" ? (
                                                    <XCircle size={16} />
                                                ) : (
                                                    <CheckCircle size={16} />
                                                )}
                                            </button>

                                            {/* Delete */}

                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                className="p-2 rounded-xl bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 shadow-sm transition-all duration-200"
                                                title="Delete"
                                            >

                                                <Trash2 size={16} />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}