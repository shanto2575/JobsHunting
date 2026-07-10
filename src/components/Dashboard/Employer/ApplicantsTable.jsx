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
            badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
            select: "bg-yellow-50 border-yellow-300 text-yellow-700",
        },
        Shortlisted: {
            badge: "bg-blue-100 text-blue-700 border-blue-200",
            select: "bg-blue-50 border-blue-300 text-blue-700",
        },
        Interview: {
            badge: "bg-purple-100 text-purple-700 border-purple-200",
            select: "bg-purple-50 border-purple-300 text-purple-700",
        },
        Hired: {
            badge: "bg-green-100 text-green-700 border-green-200",
            select: "bg-green-50 border-green-300 text-green-700",
        },
        Rejected: {
            badge: "bg-red-100 text-red-700 border-red-200",
            select: "bg-red-50 border-red-300 text-red-700",
        },
    };

    function getDownloadUrl(cvUrl, filename = "CV") {
        if (!cvUrl) return "#";
        const safeName = filename.replace(/[^a-zA-Z0-9_-]/g, "_");
        return cvUrl.replace("/upload/", `/upload/fl_attachment:${safeName}/`);
    }

    return (
        <div className="w-full space-y-4">
            
            {/* 1. Mobile & Tablet View: Grid of Cards (Hidden on Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                {applicants.length === 0 ? (
                    <div className="col-span-full py-16 text-center text-sm font-medium text-gray-500 bg-white/40 rounded-2xl border border-[#dfcbaf]">
                        No Applicants Found
                    </div>
                ) : (
                    applicants.map((applicant, index) => (
                        <div 
                            key={index}
                            className="rounded-2xl border border-[#dfcbaf] bg-white/40 p-5 shadow-sm flex flex-col justify-between gap-4"
                        >
                            {/* Header: Profile and Status Badge */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#ebdcc9] flex items-center justify-center shrink-0">
                                        <User size={18} className="text-[#2c221e]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#2c221e] text-base leading-tight">
                                            {applicant.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Job Applicant
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusStyles[applicant.status || "Pending"]?.badge}`}>
                                    {applicant.status || "Pending"}
                                </span>
                            </div>

                            {/* Details: Email & Applied Date */}
                            <div className="space-y-2 pt-2 border-t border-[#dfcbaf]/20 text-sm text-[#2c221e]/80">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail size={15} className="shrink-0" />
                                    <span className="truncate max-w-[220px]">{applicant.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar size={15} className="shrink-0" />
                                    <span>{new Date(applicant.appliedAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* CV Links Section */}
                            <div className="flex items-center gap-2 bg-[#faf6f0]/60 p-2 rounded-xl border border-[#dfcbaf]/30">
                                <a
                                    href={applicant.cv}
                                    className="flex-1 py-2 bg-green-700 text-white rounded-lg text-center text-xs font-medium hover:bg-green-800 transition"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View CV
                                </a>
                                <a
                                    href={getDownloadUrl(applicant.cv, `${applicant.name}_CV`)}
                                    className="flex-1 py-2 bg-gray-700 text-white rounded-lg text-center text-xs font-medium hover:bg-gray-800 transition flex items-center justify-center gap-1"
                                >
                                    <Download size={13} /> Download
                                </a>
                            </div>

                            {/* Action: Dropdown Select */}
                            <div className="pt-2 border-t border-[#dfcbaf]/10 flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Change Status</label>
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
                                    className={`w-full rounded-lg px-3 py-2 text-sm font-medium border outline-none cursor-pointer shadow-sm ${statusStyles[applicant.status || "Pending"]?.select}`}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Hired">Hired</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 2. Desktop View: Traditional Table (Hidden on Mobile/Tablet) */}
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-[#dfcbaf] bg-white/40 shadow-sm">
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

                        <tbody className="divide-y divide-[#dfcbaf]/30">
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
                                        className="hover:bg-[#faf6f0] transition"
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
                                                {new Date(applicant.appliedAt).toLocaleDateString()}
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-5 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[applicant.status || "Pending"]?.badge}`}>
                                                {applicant.status || "Pending"}
                                            </span>
                                        </td>

                                        {/* CV */}
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center gap-2 text-xs font-medium">
                                                <a
                                                    href={applicant.cv}
                                                    className="px-3 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    View CV
                                                </a>
                                                <a
                                                    href={getDownloadUrl(applicant.cv, `${applicant.name}_CV`)}
                                                    className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
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
                                                    className={`rounded-lg px-3 py-2 text-sm font-medium border outline-none cursor-pointer shadow-sm ${statusStyles[applicant.status || "Pending"]?.select}`}
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
            </div>

            {/* Modals */}
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