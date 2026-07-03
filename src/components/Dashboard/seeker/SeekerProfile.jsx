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
                                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase flex items-center gap-2 ${
                                    user?.plan === "pro"
                                        ? "bg-yellow-200 text-yellow-800"
                                        : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                <Crown size={14} />
                                {user?.plan}
                            </span>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${
                                    user?.emailVerified
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
                    <>
                        <h3 className="text-lg font-bold mb-2">
                            Free Plan Active
                        </h3>

                        <p className="text-sm opacity-90 leading-relaxed">
                            Upgrade to Pro to unlock unlimited job applications,
                            priority visibility to employers, interview insights,
                            and advanced job recommendations.
                        </p>

                        <button className="mt-4 px-5 py-2 rounded-full bg-[#ebdcc9] text-[#2c221e] font-semibold text-sm">
                            Upgrade to Pro
                        </button>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2 mb-2">
                            <ShieldCheck size={18} />
                            <h3 className="text-lg font-bold">
                                Premium Member
                            </h3>
                        </div>

                        <p className="text-sm opacity-90 leading-relaxed">
                            Enjoy unlimited applications, better employer reach,
                            AI-powered job suggestions, and premium visibility.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}