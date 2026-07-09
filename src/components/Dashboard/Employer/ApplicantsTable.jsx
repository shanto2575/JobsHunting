"use client";

import Link from "next/link";
import {
    FileText,
    Download,
    Calendar,
    User,
    Mail,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { showToast } from "@/Util/toast";
import InterviewModal from "./InterviewModal";
import { useState } from "react";
import HireModal from "./HireModal";

export default function ApplicantsTable({ applicants, jobId }) {
    const [openInterview, setOpenInterview] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [openHire, setOpenHire] = useState(false);
    const router = useRouter();
    // console.log(applicants,'app');

    const handleStatus = async (userId, status) => {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/employer/applicants/status`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jobId,
                    userId,
                    status,
                }),
            }
        );
        const result = await res.json();
        if (result.success) {
            showToast.success(result.message);
            router.refresh();
        } else {
            showToast.error(result.message);
        }
    };

    const statusStyles = {
        Pending: {
            badge: "bg-yellow-100 text-yellow-700",
            select: "bg-yellow-50 border-yellow-300 text-yellow-700",
        },
        Shortlisted: {
            badge: "bg-blue-100 text-blue-700",
            select: "bg-blue-50 border-blue-300 text-blue-700",
        },
        Interview: {
            badge: "bg-purple-100 text-purple-700",
            select: "bg-purple-50 border-purple-300 text-purple-700",
        },
        Hired: {
            badge: "bg-green-100 text-green-700",
            select: "bg-green-50 border-green-300 text-green-700",
        },
        Rejected: {
            badge: "bg-red-100 text-red-700",
            select: "bg-red-50 border-red-300 text-red-700",
        },
    };

    function getDownloadUrl(cvUrl, filename = "CV") {
        if (!cvUrl) return "#";
        const safeName = filename.replace(/[^a-zA-Z0-9_-]/g, "_");
        return cvUrl.replace("/upload/", `/upload/fl_attachment:${safeName}/`);
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-[#dfcbaf] bg-white/40 shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#2c221e] text-[#ebdcc9] text-sm">
                            <th className="px-6 py-4 text-left">Applicant</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-center">Applied</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">CV</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applicants.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-16 text-center text-gray-500"
                                >
                                    No Applicants Found
                                </td>
                            </tr>
                        ) : (
                            applicants.map((applicant, index) => (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-[#faf6f0] transition"
                                >
                                    {/* Applicant */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#ebdcc9] flex items-center justify-center">
                                                <User size={18} />
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-[#2c221e]">
                                                    {applicant.name}
                                                </h3>

                                                <p className="text-xs text-gray-500">
                                                    Job Applicant
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail size={16} />
                                            {applicant.email}
                                        </div>
                                    </td>

                                    {/* Applied Date */}
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex justify-center items-center gap-2 text-sm">
                                            <Calendar size={15} />
                                            {new Date(
                                                applicant.appliedAt
                                            ).toLocaleDateString()}
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-5 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[applicant.status || "Pending"]?.badge
                                                }`}
                                        >
                                            {applicant.status || "Pending"}
                                        </span>
                                    </td>

                                    {/* CV */}
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center gap-2">

                                            {/* View PDF */}
                                            <a
                                                // href={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(applicant.cv)}`}
                                                href={applicant.cv}
                                                className="px-3 py-2 bg-green-700 text-white rounded-lg"
                                                target="_blank"
                                            >
                                                View CV
                                            </a>

                                            {/* Download */}
                                            <a
                                                // href={`${applicant.cv}?fl_attachment=true`}

                                                href={getDownloadUrl(applicant.cv, `${applicant.name}_CV`)}

                                                className="px-3 py-2 bg-gray-700 text-white rounded-lg"

                                            >
                                                Download
                                            </a>

                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center gap-2">

                                            <select
                                                value={applicant.status || "Pending"}
                                                onChange={(e) => {
                                                    const status = e.target.value;

                                                    if (status === "Interview") {
                                                        setSelectedApplicant(applicant);
                                                        setOpenInterview(true);
                                                    } else if (status === "Hired") {
                                                        setSelectedApplicant(applicant);
                                                        setOpenHire(true);
                                                    } else {
                                                        handleStatus(applicant.userId, status);
                                                    }
                                                }}
                                                className={`rounded-lg px-3 py-2 text-sm font-medium border outline-none cursor-pointer ${statusStyles[applicant.status || "Pending"]?.select
                                                    }`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Shortlisted">Shortlisted</option>
                                                <option value="Interview">Interview</option>
                                                <option value="Hired">Hired</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <InterviewModal
                open={openInterview}
                setOpen={setOpenInterview}
                applicant={selectedApplicant}
                jobId={jobId}
            />
            <HireModal
                open={openHire}
                setOpen={setOpenHire}
                applicant={selectedApplicant}
                jobId={jobId}
            />
        </div>
    );
}