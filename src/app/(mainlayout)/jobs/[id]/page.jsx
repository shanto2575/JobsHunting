"use client";

import Image from "next/image";
import ApplyJobCard from "@/components/ApplyJobCard";
import { AllJobs } from "@/lib/api/seeker/data";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    MapPin,
    Briefcase,
    Clock3,
    CircleDollarSign,
    Calendar,
    Sparkles,
    ShieldCheck,
    Building2,
    Users,
    User,
    IdCard,
    ArrowLeft
} from "lucide-react";
import Loader from "@/Util/Loading";

export default function JobDetailsPage({ params }) {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchJobData() {
            try {
                const resolvedParams = await params;
                const jobsData = await AllJobs();
                const foundJob = jobsData?.result?.find((item) => item._id === resolvedParams.id);
                setJob(foundJob);
            } catch (error) {
                console.error("Error fetching job details:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchJobData();
    }, [params]);

    if (loading) {
        return <Loader/>
    }

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center text-sm font-bold text-rose-600">
                Job Posting Not Found!
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-[#ebdcc9]/10 px-4 md:px-8 py-4">
            <div className="max-w-7xl mx-auto">        
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-3">
                        <button 
                            onClick={() => router.back()}
                            className="group flex items-center gap-2.5 h-11 px-5 rounded-xl border border-[#dfcbaf] bg-white/60 backdrop-blur-md text-xs font-black uppercase tracking-wider text-[#2c221e] transition-all hover:bg-[#2c221e] hover:text-[#ebdcc9] hover:border-[#2c221e] shadow-sm"
                        >
                            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                            Back to previous page
                        </button>

                        <div className="relative h-[250px] md:h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-[#dfcbaf] shadow-md group">
                            <Image
                                src={job.image}
                                alt={job.company}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-102"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2c221e]/40 to-transparent" />
                            
                            <span className="absolute bottom-6 left-6 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ebdcc9]/90 text-[#2c221e] text-xs font-black uppercase tracking-wider backdrop-blur-md border border-[#dfcbaf] shadow-md">
                                <Sparkles size={12} />
                                {job.category}
                            </span>
                        </div>

                        <div className="rounded-[2.5rem] border border-[#dfcbaf]/70 bg-white/60 backdrop-blur-md p-6 md:p-8 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-[#dfcbaf]/40 pb-6">
                                <div>
                                    <p className="text-xs font-black text-[#4a3b35]/70 uppercase tracking-widest flex items-center gap-1.5">
                                        <Building2 size={12} className="text-[#2c221e]" />
                                        {job.company}
                                    </p>
                                    <h1 className="text-3xl md:text-4xl font-black text-[#2c221e] mt-2 tracking-tight leading-none">
                                        {job.title}
                                    </h1>
                                </div>
                                
                                <span className={`self-start md:self-auto px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${
                                    job.status === "active"
                                        ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                                        : "bg-rose-500/10 text-rose-700 border-rose-500/20"
                                }`}>
                                    ● {job.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                                <div className="flex flex-col gap-1 bg-[#2c221e]/5 p-4 rounded-2xl border border-[#dfcbaf]/20">
                                    <MapPin size={16} className="text-[#2c221e]" />
                                    <span className="text-[10px] font-bold uppercase text-[#4a3b35]/66 mt-1">Location</span>
                                    <span className="text-xs font-bold text-[#2c221e]">{job.location}</span>
                                </div>

                                <div className="flex flex-col gap-1 bg-[#2c221e]/5 p-4 rounded-2xl border border-[#dfcbaf]/20">
                                    <Briefcase size={16} className="text-[#2c221e]" />
                                    <span className="text-[10px] font-bold uppercase text-[#4a3b35]/66 mt-1">Job Type</span>
                                    <span className="text-xs font-bold text-[#2c221e]">{job.type}</span>
                                </div>

                                <div className="flex flex-col gap-1 bg-[#2c221e]/5 p-4 rounded-2xl border border-[#dfcbaf]/20">
                                    <Clock3 size={16} className="text-[#2c221e]" />
                                    <span className="text-[10px] font-bold uppercase text-[#4a3b35]/66 mt-1">Experience</span>
                                    <span className="text-xs font-bold text-[#2c221e]">{job.experience} Yrs Required</span>
                                </div>

                                <div className="flex flex-col gap-1 bg-[#2c221e]/5 p-4 rounded-2xl border border-[#dfcbaf]/20">
                                    <CircleDollarSign size={16} className="text-[#2c221e]" />
                                    <span className="text-[10px] font-bold uppercase text-[#4a3b35]/66 mt-1">Salary Package</span>
                                    <span className="text-xs font-bold text-[#2c221e]">৳ {job.salary?.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-black text-[#2c221e] tracking-tight mb-4 border-l-4 border-[#2c221e] pl-3">
                                    Job Description
                                </h2>
                                <p className="text-[#4a3b35] text-sm leading-relaxed font-medium whitespace-pre-line bg-white/40 p-5 rounded-2xl border border-[#dfcbaf]/30">
                                    {job.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 lg:sticky lg:top-6 lg:mt-17">
                        
                        <div className="rounded-[2.5rem] border border-[#dfcbaf] bg-white p-6 shadow-[0_20px_50px_-20px_rgba(44,34,30,0.08)] flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-2 bg-[#2c221e]" />
                            
                            <h3 className="text-lg font-black text-[#2c221e] mt-2">Ready to Apply?</h3>
                            <p className="text-xs font-medium text-[#4a3b35]/70 mt-1 px-4">
                                Make sure your resume is up-to-date before initiating the request.
                            </p>
                            <div className="w-full mt-6">
                                <ApplyJobCard job={job} />
                            </div>
                        </div>
                        
                        <div className="rounded-[2.5rem] border border-[#dfcbaf]/70 bg-white/60 backdrop-blur-md p-6 shadow-sm space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-wider text-[#2c221e] border-b border-[#dfcbaf]/40 pb-3 flex items-center gap-1.5">
                                <ShieldCheck size={14} /> Job Insights Summary
                            </h4>
                            
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs font-bold border-b border-[#dfcbaf]/20 pb-2">
                                    <span className="text-[#4a3b35]/70 flex items-center gap-1.5"><Calendar size={13}/> Deadline</span>
                                    <span className="text-rose-600 font-extrabold">{job.deadline || "N/A"}</span>
                                </div>

                                <div className="flex items-center justify-between text-xs font-bold border-b border-[#dfcbaf]/20 pb-2">
                                    <span className="text-[#4a3b35]/70 flex items-center gap-1.5"><Users size={13}/> Workplace Model</span>
                                    <span className="text-[#2c221e] capitalize">{job.workplace || "Onsite"}</span>
                                </div>

                                <div className="flex items-center justify-between text-xs font-bold">
                                    <span className="text-[#4a3b35]/70 flex items-center gap-1.5"><ShieldCheck size={13}/> Verification</span>
                                    <span className="text-emerald-600 flex items-center gap-0.5">Verified {job.company}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <span className="text-[#4a3b35]/70 flex items-center gap-1.5"><User size={13}/> JobsPost </span>
                                    <span className="text-emerald-600 flex items-center gap-0.5">{job.userEmail}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <span className="text-[#4a3b35]/70 flex items-center gap-1.5"><IdCard size={13}/> Job ID </span>
                                    <span className="text-emerald-600 flex items-center gap-0.5">{job._id}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}