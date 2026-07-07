"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, MapPin, Briefcase, DollarSign, Layers } from "lucide-react";
import JobsCard from "@/components/JobsCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FcBriefcase } from "react-icons/fc";

export default function AllJobsPage({ job, pagination }) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [jobType, setJobType] = useState("");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }

        if (category) {
            params.set("category", category);
        } else {
            params.delete("category");
        }

        if (location) {
            params.set("location", location);
        } else {
            params.delete("location");
        }

        if (salary) {
            params.set("salary", salary);
        } else {
            params.delete("salary");
        }

        if (jobType) {
            params.set("type", jobType);
        } else {
            params.delete("type");
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleReset = () => {
        setSearch("");
        setCategory("");
        setLocation("");
        setSalary("");
        setJobType("");

        router.push(pathname);
    };
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;

    const changePage = (page) => {
        const params = new URLSearchParams(searchParams);

        params.set("page", page);

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="w-7xl mx-auto px-4 md:px-8 py-10 bg-[#ebdcc9]/10">
            <div className="mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-[#dfcbaf]/40 pb-8">
                <div>
                    <h2 className="text-4xl font-black text-[#2c221e] tracking-tight">Available Jobs</h2>
                    <p className="text-[#4a3b35]/80 mt-1 text-sm font-medium">Find your dream job from the latest opportunities.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80 group">
                        <input
                            type="text"
                            placeholder="Search title or company..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-14 pl-12 pr-4 rounded-2xl border border-[#dfcbaf] bg-white/70 text-sm font-semibold text-[#2c221e] outline-none transition-all focus:border-[#2c221e] focus:bg-white"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a3b35]/60" size={18} />
                    </div>
                    <button
                        onClick={handleApplyFilters}
                        className="h-14 px-6 rounded-2xl bg-[#2c221e] text-[#ebdcc9] text-xs font-black uppercase tracking-wider hover:opacity-90 transition-all"
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 items-start">

                <aside className="w-full lg:w-80 shrink-0 bg-white/30 backdrop-blur-md border border-[#dfcbaf]/80 rounded-[2rem] p-6 shadow-sm sticky top-6">
                    <div className="flex items-center justify-between border-b border-[#dfcbaf]/40 pb-4 mb-5">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal size={16} className="text-[#2c221e]" />
                            <h3 className="font-black text-base text-[#2c221e] uppercase tracking-wider">Filters</h3>
                        </div>
                        <button onClick={handleApplyFilters} className="text-xs font-bold text-rose-600 hover:underline">Apply</button>
                    </div>

                    <div className="space-y-5">
                        {/* 1. Category Field */}
                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#4a3b35]/70 mb-2"><Layers size={12} /> Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-11 px-3 rounded-xl border border-[#dfcbaf]/60 bg-white text-xs font-bold text-[#2c221e] outline-none focus:border-[#2c221e] cursor-pointer">
                                <option value="">All Categories</option>
                                <option value="Frontend Development">Frontend Development</option>
                                <option value="Backend Development">Backend Development</option>
                                <option value="Full Stack Development">Full Stack Development</option>
                                <option value="Design">Design</option>
                                <option value="DevOps">DevOps</option>
                                <option value="Python">Python</option>
                                <option value="Artificial Intelligence">Artificial Intelligence</option>
                                <option value="Mobile Development">Mobile Development</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Cyber Security">Cyber Security</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#4a3b35]/70 mb-2"><MapPin size={12} /> Location</label>
                            <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full h-11 px-3 rounded-xl border border-[#dfcbaf]/60 bg-white text-xs font-bold text-[#2c221e] outline-none focus:border-[#2c221e] cursor-pointer">
                                <option value="">All Locations</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chattogram">Chattogram</option>
                                <option value="Sylhet">Sylhet</option>
                                <option value="Rajshahi">Rajshahi</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Barishal">Barishal</option>
                                <option value="Rangpur">Rangpur</option>
                                <option value="Mymensingh">Mymensingh</option>
                                <option value="Gazipur">Gazipur</option>
                                <option value="Narayanganj">Narayanganj</option>
                                <option value="Cumilla">Cumilla</option>
                                <option value="Cox's Bazar">Cox's Bazar</option>
                            </select>
                        </div>

                        {/* 3. Salary Range Field */}
                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#4a3b35]/70 mb-2"><DollarSign size={12} /> Salary Range</label>
                            <select value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full h-11 px-3 rounded-xl border border-[#dfcbaf]/60 bg-white text-xs font-bold text-[#2c221e] outline-none focus:border-[#2c221e] cursor-pointer">
                                <option value="">Any Salary</option>
                                <option value="0-50000">Under $50,000</option>
                                <option value="50000-100000">$50,000 - $100,000</option>
                                <option value="100000-150000">$100,000 - $150,000</option>
                                <option value="150000">$150,000 +</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#4a3b35]/70 mb-2"><Briefcase size={12} /> Job Type</label>
                            <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="w-full h-11 px-3 rounded-xl border border-[#dfcbaf]/60 bg-white text-xs font-bold text-[#2c221e] outline-none focus:border-[#2c221e] cursor-pointer">
                                <option value="">All Types</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Remote">Remote</option>
                                <option value="Contract">Contract</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>

                    {/* Reset Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <button
                            onClick={handleReset}
                            className="h-11 rounded-xl border border-[#2c221e]/30 text-xs font-bold uppercase tracking-wider text-[#4a3b35] transition-all hover:bg-[#2c221e]/5"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleApplyFilters}
                            className="h-11 rounded-xl bg-[#2c221e] text-xs font-black uppercase tracking-wider text-[#ebdcc9] transition-all hover:opacity-90"
                        >
                            Filter
                        </button>
                    </div>
                </aside>

                <main className="w-full flex-1">
                    {job && job.length > 0 ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full animate-in fade-in duration-500">
                            {job.map((item) => (
                                <JobsCard key={item._id} job={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-[400px] rounded-3xl border border-[#dfcbaf]/50 bg-white/70 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center shadow-[0_12px_40px_-15px_rgba(44,34,30,0.04)] animate-in fade-in zoom-in-95 duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-[#ebdcc9]/40 border border-[#dfcbaf]/40 flex items-center justify-center mb-5 shadow-sm text-[#2c221e]/70">
                            <FcBriefcase size={28} />
                            </div>

                            <h3 className="text-2xl font-bold text-[#2c221e] tracking-tight">
                                No Active Jobs Found
                            </h3>

                            <p className="text-xs text-[#2c221e]/60 font-medium mt-2 max-w-xs leading-relaxed">
                                There are currently no listings available. Please check back later or modify your search filters.
                            </p>
                        </div>
                    )}
                    <div className="flex justify-center items-center mt-12 gap-3 selection:bg-transparent">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => changePage(currentPage - 1)}
                            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#dfcbaf]/60 bg-white/80 text-[#2c221e] backdrop-blur-md transition-all duration-300 shadow-[0_4px_12px_rgba(44,34,30,0.03)] hover:bg-[#2c221e] hover:text-white hover:border-[#2c221e] hover:shadow-[0_8px_20px_-6px_rgba(44,34,30,0.2)] disabled:opacity-35 disabled:hover:bg-white/80 disabled:hover:text-[#2c221e] disabled:hover:border-[#dfcbaf]/60 disabled:hover:shadow-none disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <div className="flex gap-2 items-center">
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNum = index + 1;
                                const isActive = currentPage === pageNum;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => changePage(pageNum)}
                                        className={`w-10 h-10 text-xs font-bold rounded-xl backdrop-blur-md transition-all duration-300 flex items-center justify-center border
                        ${isActive
                                                ? "bg-[#2c221e] border-[#2c221e] text-white shadow-[0_8px_20px_-4px_rgba(44,34,30,0.3)] scale-105"
                                                : "bg-white/70 border-[#dfcbaf]/40 text-[#2c221e]/70 hover:bg-[#ebdcc9]/30 hover:border-[#dfcbaf] hover:text-[#2c221e] shadow-[0_4px_12px_rgba(44,34,30,0.02)]"
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => changePage(currentPage + 1)}
                            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#dfcbaf]/60 bg-white/80 text-[#2c221e] backdrop-blur-md transition-all duration-300 shadow-[0_4px_12px_rgba(44,34,30,0.03)] hover:bg-[#2c221e] hover:text-white hover:border-[#2c221e] hover:shadow-[0_8px_20px_-6px_rgba(44,34,30,0.2)] disabled:opacity-35 disabled:hover:bg-white/80 disabled:hover:text-[#2c221e] disabled:hover:border-[#dfcbaf]/60 disabled:hover:shadow-none disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </main>

            </div>
        </div>
    );
}