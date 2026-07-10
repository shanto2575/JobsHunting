"use client";

import Image from "next/image";
import ApplyJobCard from "@/components/ApplyJobCard";
import { AllJobs, GetBookmarks, GetJobById, GetReports } from "@/lib/api/seeker/data";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import {
    MapPin, Briefcase, Clock3, CircleDollarSign, Calendar, Sparkles, ShieldCheck, Building2, Users, User, IdCard, ArrowLeft,
    Bookmark, Flag,
    UsersRound
} from "lucide-react";
import Loader from "@/Util/Loading";
import { authClient } from "@/lib/auth-client";
import { BookMark, Report } from "@/lib/api/seeker/action";
import { showToast } from "@/Util/toast";
import NotFound from "./not-found";

export default function JobDetailsPage({ params }) {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isReported, setIsReported] = useState(false);
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        async function fetchJobData() {
            try {
                const resolvedParams = await params;
                const jobData = await GetJobById(resolvedParams.id);
                const foundJob = jobData?.result;

                if (!foundJob || !foundJob._id) {
                    setJob(null);
                    return; 
                }

                setJob(foundJob);

                if (user?.id) {
                    const bookmarkData = await GetBookmarks(user.id);
                    if (bookmarkData?.result) {
                        const bookmarked = bookmarkData.result.some(
                            (item) => item.jobId === foundJob._id
                        );
                        setIsBookmarked(bookmarked);
                    }
                }

                if (user?.id) {
                    const reportData = await GetReports(user.id);
                    if (reportData?.result) {
                        const reported = reportData.result.some(
                            (item) => item.jobId === foundJob._id
                        );
                        setIsReported(reported);
                    }
                }

            } catch (error) {
                console.error("Error fetching job dynamic data:", error);
            } finally {
                setLoading(false);
            }
        }

        if (user) {
            fetchJobData();
        } else {
            setLoading(false);
        }
    }, [params, user]);

    if (loading) {
        return <Loader />;
    }

    if (!job || !job._id) {
        return <NotFound />;
    }

    const handleBookmark = async () => {
        const { _id, ...resdata } = job;
        const bookmarkData = {
            ...resdata,
            jobId: _id,
            userEmail: user?.email,
            userId: user?.id
        };
        const result = await BookMark(bookmarkData);
        if (result.success) {
            setIsBookmarked(result.bookmarked);
            showToast.success(result.message);
            router.refresh();
        } else {
            showToast.error(result.message);
        }
    };

    const handleReport = async () => {
        const { _id, ...repodata } = job;
        const reportData = {
            userId: user?.id,
            userName: user?.name,
            userEmail: user?.email,
            jobId: _id,
            ...repodata,
        };

        const result = await Report(reportData);

        if (result.success === true) {
            setIsReported(true);
            showToast.success(result.message);
            router.refresh();
        } else {
            setIsReported(true);
            showToast.error(result.message);
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-[#ebdcc9]/10 px-4 md:px-8 py-8 font-sans selection:bg-[#2c221e] selection:text-[#ebdcc9]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left Layout */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Neumorphic Flat Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="group flex items-center gap-2 h-11 px-5 rounded-xl bg-[#f4ece1] text-xs font-black uppercase tracking-wider text-[#2c221e] transition-all duration-200 active:scale-98 cursor-pointer"
                            style={{
                                boxShadow: "6px 6px 12px #d9d1c6, -6px -6px 12px #ffffff"
                            }}
                        >
                            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 text-rose-600" strokeWidth={2.5} />
                            Back
                        </button>

                        {/* Combined Card: Image & Details */}
                        <div 
                            className="rounded-[2.5rem] bg-[#f4ece1] p-4 md:p-7 space-y-6"
                            style={{
                                // boxShadow: "18px 18px 36px #d9d1c6, -18px -18px 36px #ffffff"
                            }}
                        >
                            {/* Full-bleed Image Box */}
                            <div className="-mx-4 -mt-4 md:-mx-7 md:-mt-7 mb-6 relative h-[240px] md:h-[400px] rounded-t-[2.5rem] overflow-hidden border-b border-[#2c221e]/5 group">
                                {job.image && (
                                    <Image
                                        src={job.image}
                                        alt={job.company || "Company"}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-103"
                                        priority
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#2c221e]/30 via-transparent to-transparent" />

                                {/* Action Floating Badges */}
                                <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-4 z-10">
                                    <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f4ece1]/95 text-[#2c221e] text-xs font-black uppercase tracking-wider border border-white/40 shadow-lg whitespace-nowrap">
                                        <Sparkles size={12} className="text-amber-600" />
                                        {job.category}
                                    </span>

                                    <div className="flex items-center gap-3">
                                        {/* Neumorphic Floating Action Buttons */}
                                        <button
                                            onClick={handleBookmark}
                                            className={`flex items-center justify-center p-3.5 rounded-xl backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer shadow-lg ${
                                                isBookmarked
                                                ? "bg-[#2c221e] text-[#f4ece1]"
                                                : "bg-[#f4ece1]/90 text-[#2c221e] hover:bg-[#2c221e] hover:text-[#f4ece1]"
                                            }`}
                                        >
                                            <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
                                        </button>

                                        <button
                                            onClick={handleReport}
                                            className={`flex items-center justify-center p-3.5 rounded-xl backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer shadow-lg ${
                                                isReported
                                                ? "bg-rose-700 text-white"
                                                : "bg-[#f4ece1]/90 text-rose-600 hover:bg-rose-700 hover:text-white"
                                            }`}
                                        >
                                            <Flag size={16} fill={isReported ? "currentColor" : "none"} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Info Block */}
                            <div className="px-2 md:px-4">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-[#2c221e]/10 pb-6">
                                    <div>
                                        <p className="text-xs font-black text-[#2c221e]/60 uppercase tracking-widest flex items-center gap-1.5">
                                            <Building2 size={13} className="text-rose-600" />
                                            {job.company}
                                        </p>
                                        <h1 className="text-3xl md:text-4xl font-black text-[#2c221e] mt-2.5 tracking-tight leading-[1.1]">
                                            {job.title}
                                        </h1>
                                    </div>

                                    <span className={`self-start md:self-auto px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${
                                        job.status === "active"
                                        ? "bg-emerald-500/10 text-emerald-700"
                                        : "bg-rose-500/10 text-rose-700"
                                    }`}>
                                        ● {job.status}
                                    </span>
                                </div>

                                {/* Neumorphic Inset Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                    {[
                                        { icon: <MapPin size={16} />, label: "Location", val: job.location },
                                        { icon: <Briefcase size={16} />, label: "Job Type", val: job.type },
                                        { icon: <Clock3 size={16} />, label: "Experience", val: `${job.experience} Yrs Req.` },
                                        { icon: <CircleDollarSign size={16} />, label: "Salary Pack", val: `৳ ${job.salary?.toLocaleString()}` }
                                    ].map((stat, idx) => (
                                        <div key={idx} className="flex flex-col gap-1 bg-[#f4ece1] p-4 rounded-2xl"
                                             style={{ boxShadow: "inset 4px 4px 8px #d9d1c6, inset -4px -4px 8px #ffffff" }}>
                                            <span className="text-rose-600">{stat.icon}</span>
                                            <span className="text-[10px] font-black uppercase text-[#2c221e]/40 mt-1">{stat.label}</span>
                                            <span className="text-xs font-extrabold text-[#2c221e] tracking-tight">{stat.val}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Job Description Block */}
                                <div className="mt-8">
                                    <h2 className="text-lg font-black text-[#2c221e] tracking-tight mb-4 border-l-4 border-[#2c221e] pl-3">
                                        Job Description
                                    </h2>
                                    <p className="text-[#2c221e]/80 text-sm leading-relaxed font-semibold whitespace-pre-line bg-[#f4ece1] p-5 rounded-2xl"
                                       style={{ boxShadow: "inset 4px 4px 9px #d9d1c6, inset -4px -4px 9px #ffffff" }}>
                                        {job.description}
                                    </p>
                                </div>

                                {/* Total Application Tracker Banner */}
                                <div className="mt-6 rounded-2xl bg-[#2c221e] p-5 text-[#f4ece1]"
                                     style={{ boxShadow: "8px 8px 20px rgba(44,34,30,0.15)" }}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-[#f4ece1]/60 font-bold">
                                                Total Applications
                                            </p>
                                            <h2 className="text-3xl font-black mt-1 text-rose-500">
                                                {job.applicants?.length || 0}
                                            </h2>
                                            <p className="text-xs text-[#f4ece1]/70 mt-1 font-medium">
                                                Candidates have already submitted requests
                                            </p>
                                        </div>
                                        <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner text-rose-400">
                                            <UsersRound size={26} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Layout Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-8 lg:mt-16">
                        
                        {/* Ready to Apply Action Area */}
                        <div 
                            className="rounded-[2.5rem] bg-[#f4ece1] p-6 flex flex-col items-center text-center relative overflow-hidden"
                            style={{
                                boxShadow: "14px 14px 28px #d9d1c6, -14px -14px 28px #ffffff"
                            }}
                        >
                            <div className="absolute top-0 inset-x-0 h-2 bg-rose-700" />
                            <h3 className="text-lg font-black text-[#2c221e] mt-2">Ready to Apply?</h3>
                            <p className="text-xs font-semibold text-[#2c221e]/60 mt-1 px-4 leading-relaxed">
                                Make sure your profile CV data is up-to-date before initiating the system request.
                            </p>
                            <div className="w-full mt-6">
                                <ApplyJobCard job={job} />
                            </div>
                        </div>

                        {/* Insights Table */}
                        <div 
                            className="rounded-[2.5rem] bg-[#f4ece1] p-6 space-y-4"
                            style={{
                                boxShadow: "14px 14px 28px #d9d1c6, -14px -14px 28px #ffffff"
                            }}
                        >
                            <h4 className="text-xs font-black uppercase tracking-wider text-[#2c221e] border-b border-[#2c221e]/10 pb-3 flex items-center gap-1.5">
                                <ShieldCheck size={14} className="text-rose-600" /> Job Insights Summary
                            </h4>

                            <div className="space-y-3.5">
                                {[
                                    { icon: <Calendar size={13} />, label: "Deadline", val: job.deadline || "N/A", isRose: true },
                                    { icon: <Users size={13} />, label: "Workplace Model", val: job.workplace || "Onsite" },
                                    { icon: <ShieldCheck size={13} />, label: "Verification", val: `Verified ${job.company}`, isGreen: true },
                                    { icon: <User size={13} />, label: "JobPost Owner", val: job.userEmail, isTrunc: true },
                                    { icon: <IdCard size={13} />, label: "Job ID Token", val: job._id, isMono: true }
                                ].map((row, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs font-bold border-b border-[#2c221e]/5 pb-2.5 last:border-0 last:pb-0">
                                        <span className="text-[#2c221e]/60 flex items-center gap-1.5">
                                            {row.icon} {row.label}
                                        </span>
                                        <span className={`
                                            ${row.isRose ? "text-rose-600 font-black" : ""}
                                            ${row.isGreen ? "text-emerald-700" : ""}
                                            ${row.isMono ? "font-mono text-[11px] select-all text-[#2c221e]/70" : "text-[#2c221e]"}
                                            ${row.isTrunc ? "truncate max-w-[140px] text-emerald-700" : "capitalize"}
                                        `}>
                                            {row.val}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}