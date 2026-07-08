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
import { authClient } from "@/lib/auth-client";

export default function DashboardOverviewCard() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    return (
        <div className="w-full rounded-3xl border border-[#dfcbaf] bg-white/30 backdrop-blur-xl p-6 shadow-[0_20px_40px_-15px_rgba(44,34,30,0.08)]">

            {/* Top Section */}
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">

                {/* Left */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
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
                            className="w-48 h-48 rounded-2xl object-cover border-2 border-[#dfcbaf]"
                        />
                    </div>

                    {/* User Info */}
                    <div className="space-y-3">
                        <h2 className="text-2xl font-black text-[#2c221e]">
                            {user?.name}
                        </h2>

                        <div className="flex items-center gap-2 text-sm text-[#4a3b35]">
                            <Mail size={16} />
                            {user?.email}
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 rounded-full bg-[#2c221e] text-[#ebdcc9] text-xs font-semibold uppercase flex items-center gap-2">
                                <Briefcase size={14} />
                                {user?.role}
                            </span>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase flex items-center gap-2 ${user?.plan === "pro"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                <Crown size={14} />
                                {user?.plan}
                            </span>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${user?.emailVerified
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
                            </span>
                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <Link
                    href="/dashboard/profile/edit"
                    className="px-5 py-3 rounded-xl bg-[#2c221e] text-[#ebdcc9] font-semibold text-sm hover:opacity-90 transition-all"
                >
                    Edit Profile
                </Link>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                {/* Applied Jobs */}
                <div className="rounded-2xl bg-[#ebdcc9]/60 p-4 border border-[#dfcbaf]">
                    <div className="flex items-center gap-2 mb-2">
                        <Briefcase size={18} />
                        <h4 className="font-semibold">Applied Jobs</h4>
                    </div>
                    <p className="text-2xl font-black text-[#2c221e]">
                        {user?.appliedJobs || 0}
                    </p>
                </div>

                {/* Saved Jobs */}
                <div className="rounded-2xl bg-[#ebdcc9]/60 p-4 border border-[#dfcbaf]">
                    <div className="flex items-center gap-2 mb-2">
                        <Bookmark size={18} />
                        <h4 className="font-semibold">Saved Jobs</h4>
                    </div>
                    <p className="text-2xl font-black text-[#2c221e]">
                        {user?.savedJobs || 0}
                    </p>
                </div>

                {/* Interviews */}
                <div className="rounded-2xl bg-[#ebdcc9]/60 p-4 border border-[#dfcbaf]">
                    <div className="flex items-center gap-2 mb-2">
                        <CalendarCheck size={18} />
                        <h4 className="font-semibold">Interviews</h4>
                    </div>
                    <p className="text-2xl font-black text-[#2c221e]">
                        {user?.interviews || 0}
                    </p>
                </div>

                {/* Resume */}
                <div className="rounded-2xl bg-[#ebdcc9]/60 p-4 border border-[#dfcbaf]">
                    <div className="flex items-center gap-2 mb-2">
                        <FileText size={18} />
                        <h4 className="font-semibold">Resume</h4>
                    </div>
                    <p className="text-sm font-bold text-[#2c221e]">
                        {user?.resume ? "Uploaded" : "Not Uploaded"}
                    </p>
                </div>
            </div>

            {/* Plan Section */}
            <div className="mt-8 rounded-2xl border border-[#dfcbaf] p-5 bg-[#2c221e] text-[#ebdcc9]">
                {user?.plan === "free" ? (
                    <div className=" flex justify-between items-center h-32">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">
                                Free Plan Active
                            </h3>

                            <p className="text-sm opacity-90 leading-relaxed">
                                Upgrade to Pro to unlock unlimited job applications,
                                priority visibility to employers, interview insights,
                                and advanced job recommendations.
                            </p>
                        </div>

                        <form action={'/api/checkout_sessions'} method="POST">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-6 py-5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-[#2c221e] font-black text-xs uppercase tracking-wider shadow transition-all duration-200 hover:scale-[1.02]">
                                <Crown size={14} />
                                Upgrade to Pro
                            </button>
                        </form>
                    </div>
                ) : (
                    <>
                        <div className="relative overflow-hidden rounded-[2rem] border border-amber-500/30 bg-gradient-to-br from-[#1a1412] via-[#241b18] to-[#120d0c] p-6 shadow-[0_20px_50px_-20px_rgba(217,119,6,0.15)]">

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
                    </>
                )}
            </div>
        </div>
    );
}