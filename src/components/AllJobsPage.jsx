"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, MapPin, Briefcase, DollarSign, Layers } from "lucide-react";
import JobsCard from "@/components/JobsCard";

export default function AllJobsPage({job}) {
    // 🎯 ১. সবকটি ফিল্টারের জন্য স্টেট (State)
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [jobType, setJobType] = useState("");
    const [workplace, setWorkplace] = useState("");


    // 🎯 ২. ফিল্টার চেঞ্জ হলে বা সার্চ বাটনে ক্লিক করলে সার্ভারে রিকোয়েস্ট পাঠানোর ফাংশন
    const handleApplyFilters = () => {
        // এই অবজেক্টটি তুমি তোমার এপিআই কল বা router.push-এ কুয়েরি হিসেবে ব্যবহার করবে
        const filterQueryParams = {
            search,
            category,
            location,
            salary,
            jobType,
            workplace
        };
        // console.log("Sending to Server:", filterQueryParams);
        
        // উদাহরণ (Next.js URL Query Update):
        // router.push(`/jobs?search=${search}&category=${category}...`)
    };

    const handleReset = () => {
        setSearch("");
        setCategory("");
        setLocation("");
        setSalary("");
        setJobType("");
        setWorkplace("");
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

            {/* 🎯 MAIN CONTENT LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-4 items-start">
                
                {/* 🧭 LEFT SIDEBAR: Filter Fields */}
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
                            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#4a3b35]/70 mb-2"><Layers size={12}/> Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-11 px-3 rounded-xl border border-[#dfcbaf]/60 bg-white text-xs font-bold text-[#2c221e] outline-none focus:border-[#2c221e] cursor-pointer">
                                <option value="">All Categories</option>
                                <option value="tech">Technology</option>
                                <option value="design">Design</option>
                                <option value="marketing">Marketing</option>
                                <option value="finance">Finance</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#4a3b35]/70 mb-2"><MapPin size={12}/> Location</label>
                            <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full h-11 px-3 rounded-xl border border-[#dfcbaf]/60 bg-white text-xs font-bold text-[#2c221e] outline-none focus:border-[#2c221e] cursor-pointer">
                                <option value="">All Locations</option>
                                <option value="dhaka">Dhaka</option>
                                <option value="chittagong">Chittagong</option>
                                <option value="sylhet">Sylhet</option>
                            </select>
                        </div>

                        {/* 3. Salary Range Field */}
                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#4a3b35]/70 mb-2"><DollarSign size={12}/> Salary Range</label>
                            <select value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full h-11 px-3 rounded-xl border border-[#dfcbaf]/60 bg-white text-xs font-bold text-[#2c221e] outline-none focus:border-[#2c221e] cursor-pointer">
                                <option value="">Any Salary</option>
                                <option value="0-50000">Under $50,000</option>
                                <option value="50000-100000">$50,000 - $100,000</option>
                                <option value="100000-150000">$100,000 - $150,000</option>
                                <option value="150000">$150,000 +</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#4a3b35]/70 mb-2"><Briefcase size={12}/> Job Type</label>
                            <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="w-full h-11 px-3 rounded-xl border border-[#dfcbaf]/60 bg-white text-xs font-bold text-[#2c221e] outline-none focus:border-[#2c221e] cursor-pointer">
                                <option value="">All Types</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#4a3b35]/70 mb-2"><MapPin size={12}/> Workplace</label>
                            <div className="grid grid-cols-3 gap-1.5">
                                {["", "Remote", "Onsite"].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setWorkplace(type)}
                                        className={`h-9 rounded-xl text-[11px] font-bold transition-all ${
                                            workplace === type 
                                                ? "bg-[#2c221e] text-[#ebdcc9]" 
                                                : "bg-[#2c221e]/5 text-[#4a3b35] hover:bg-[#2c221e]/10"
                                        }`}
                                    >
                                        {type === "" ? "All" : type}
                                    </button>
                                ))}
                            </div>
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
                    <div className="grid grid-cols-1 xl:grid-cols-2  gap-6 w-full">
                        {job?.map((job) => (
                            <JobsCard key={job._id} job={job} />
                        ))}
                    </div>
                </main>

            </div>
        </div>
    );
}