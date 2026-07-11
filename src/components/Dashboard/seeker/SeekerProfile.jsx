"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Crown,
    Briefcase,
    Mail,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    Bookmark,
    FileText,
    CalendarCheck,
} from "lucide-react";
import { EditsProfile } from "../EditsProfile";

export default function DashboardOverviewCard({user,profile}) {
    if (!user) {
        return null;
    }

    return (
        /* Main Container: Premium Soft Neumorphic Card with 0.1 shadow intensity */
        <div className="w-full rounded-[2.5rem] border border-[#dfcbaf] bg-white/30 backdrop-blur-xl p-6 md:p-8 shadow-[12px_12px_30px_rgba(44,34,30,0.06),-12px_-12px_30px_rgba(255,255,255,0.7)]">

            {/* Top Section */}
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">

                {/* Left */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center w-full lg:w-auto">
                    <div>
                        <Image
                            src={
                                user?.image?.startsWith("http")
                                    ? user.image
                                    : "/user.jpg"
                            }
                            width={120}
                            height={120}
                            alt="Profile"
                            /* Profile Image: Soft Inset Neumorphic feel */
                            className="w-40 h-40 rounded-3xl object-cover border border-[#dfcbaf] shadow-[4px_4px_12px_rgba(44,34,30,0.05)]"
                        />
                    </div>

                    {/* User Info */}
                    <div className="space-y-4 flex-1">
                        <h2 className="text-2xl font-black text-[#2c221e] tracking-tight">
                            {user?.name}
                        </h2>

                        <div className="flex items-center gap-2 text-sm text-[#4a3b35] font-medium">
                            <Mail size={16} className="opacity-80" />
                            {user?.email}
                        </div>

                        {/* Badges with Soft Elevated Shadow */}
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1.5 rounded-xl bg-[#2c221e] text-[#ebdcc9] text-xs font-bold uppercase flex items-center gap-2 shadow-[2px_2px_5px_rgba(44,34,30,0.1)]">
                                <Briefcase size={14} />
                                {user?.role}
                            </span>

                            <span
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase flex items-center gap-2 shadow-[2px_2px_5px_rgba(44,34,30,0.05)] ${user?.plan === "pro"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                <Crown size={14} />
                                {profile.plan}
                            </span>

                            {/* <span
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-[2px_2px_5px_rgba(44,34,30,0.05)] ${user?.emailVerified
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {user?.emailVerified ? (
                                    <CheckCircle2 size={14} />
                                ) : (
                                    <XCircle size={14} />
                                )}
                                {user?.emailVerified ? "Verified" : "Not Verified"}
                            </span> */}
                        </div>
                    </div>
                </div>

                {/* Edit Button with Elevated Premium Shadow */}
                <div>
                    <EditsProfile user={user}/>
                </div>
            </div>

            {/* Stats Grid: Soft Flat Neumorphic Panels */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                {/* Applied Jobs */}
                <div className="rounded-2xl bg-[#ebdcc9]/60 p-5 border border-[#dfcbaf]/60 shadow-[4px_4px_15px_rgba(44,34,30,0.04),inset_1px_1px_2px_rgba(255,255,255,0.6)]">
                    <div className="flex items-center gap-2 mb-3 text-[#2c221e]/70">
                        <Briefcase size={18} />
                        <h4 className="font-bold text-sm uppercase tracking-wider">Applied Jobs</h4>
                    </div>
                    <p className="text-3xl font-black text-[#2c221e]">
                        {profile?.appliedJobs || 0}
                    </p>
                </div>

                {/* Saved Jobs */}
                <div className="rounded-2xl bg-[#ebdcc9]/60 p-5 border border-[#dfcbaf]/60 shadow-[4px_4px_15px_rgba(44,34,30,0.04),inset_1px_1px_2px_rgba(255,255,255,0.6)]">
                    <div className="flex items-center gap-2 mb-3 text-[#2c221e]/70">
                        <Bookmark size={18} />
                        <h4 className="font-bold text-sm uppercase tracking-wider">Saved Jobs</h4>
                    </div>
                    <p className="text-3xl font-black text-[#2c221e]">
                        {profile?.savedJobs || 0}
                    </p>
                </div>

                {/* Interviews */}
                <div className="rounded-2xl bg-[#ebdcc9]/60 p-5 border border-[#dfcbaf]/60 shadow-[4px_4px_15px_rgba(44,34,30,0.04),inset_1px_1px_2px_rgba(255,255,255,0.6)]">
                    <div className="flex items-center gap-2 mb-3 text-[#2c221e]/70">
                        <CalendarCheck size={18} />
                        <h4 className="font-bold text-sm uppercase tracking-wider">Interviews</h4>
                    </div>
                    <p className="text-3xl font-black text-[#2c221e]">
                        {profile?.interviews || 0}
                    </p>
                </div>

                {/* Resume */}
                <div className="rounded-2xl bg-[#ebdcc9]/60 p-5 border border-[#dfcbaf]/60 shadow-[4px_4px_15px_rgba(44,34,30,0.04),inset_1px_1px_2px_rgba(255,255,255,0.6)]">
                    <div className="flex items-center gap-2 mb-3 text-[#2c221e]/70">
                        <FileText size={18} />
                        <h4 className="font-bold text-sm uppercase tracking-wider">Resume</h4>
                    </div>
                    {profile.resume ? (
                        <a
                            href={profile.resume}
                            target="_blank"
                            className="text-blue-600 underline"
                        >
                            View Resume
                        </a>
                    ) : (
                        <span>Not Uploaded</span>
                    )}
                </div>
            </div>

            {/* Plan Section */}
            <div className="mt-8 rounded-[2rem] border border-[#dfcbaf] p-1 bg-[#2c221e] shadow-[8px_8px_25px_rgba(44,34,30,0.12)]">
                {profile.plan === 'free' ? (
                    <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-1.5">
                            <h3 className="text-2xl font-black text-[#ebdcc9] tracking-tight">
                                Free Plan Active
                            </h3>
                            <p className="text-sm opacity-80 leading-relaxed font-medium text-[#ebdcc9] max-w-xl">
                                Upgrade to Pro to unlock unlimited job applications,
                                priority visibility to employers, interview insights,
                                and advanced job recommendations.
                            </p>
                        </div>

                        <form action={'/api/checkout_sessions'} method="POST" className="w-full md:w-auto">
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-[#2c221e] font-black text-xs uppercase tracking-wider shadow-[4px_4px_15px_rgba(245,158,11,0.2)] transition-all duration-300 hover:scale-[1.02]"
                            >
                                <Crown size={14} />
                                Upgrade to Pro
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="relative overflow-hidden rounded-[1.85rem] border border-amber-500/30 bg-gradient-to-br from-[#1a1412] via-[#241b18] to-[#120d0c] p-6 shadow-[inset_2px_2px_10px_rgba(0,0,0,0.4)]">

                        <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" />
                        <div className="absolute -bottom-12 -left-12 h-24 w-24 rounded-full bg-yellow-500/10 blur-2xl" />

                        <div className="flex items-center gap-3.5 mb-4">
                            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-b from-amber-400 via-amber-500 to-yellow-600 p-[1px] shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#1a1412] text-amber-400">
                                    <ShieldCheck size={22} className="stroke-[2]" />
                                </div>
                            </div>

                            <div>
                                <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-amber-500/60 leading-none mb-1">
                                    Exclusive Access
                                </span>
                                <h3 className="text-xl font-black uppercase tracking-wide bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
                                    Premium Member
                                </h3>
                            </div>
                        </div>

                        <p className="text-sm font-medium text-amber-100/70 leading-relaxed border-t border-amber-500/10 pt-4">
                            Enjoy unlimited applications, better employer reach,{" "}
                            <span className="relative inline-block font-bold text-yellow-400 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-gradient-to-r after:from-transparent after:via-yellow-400 after:to-transparent">
                                AI-powered
                            </span>{" "}
                            job suggestions, and premium visibility.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}