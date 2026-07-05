"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Crown,
    Briefcase,
    Mail,
    ShieldCheck,
    FileText,
    Sparkles,
    User
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function DashboardOverviewCard() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const isPro = user?.plan === "pro";

    return (
        <div className="w-full rounded-3xl border border-[#dfcbaf]/50 bg-white/60 backdrop-blur-xl p-6 md:p-8 shadow-[0_24px_50px_-15px_rgba(44,34,30,0.06)] transition-all duration-300 hover:shadow-[0_30px_60px_-15px_rgba(44,34,30,0.1)]">
            
            {/* Top Section: Profile Info & Action */}
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between pb-6 border-b border-[#dfcbaf]/30">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full">
                    {/* Profile Image with Modern Border */}
                    <div className="relative group shrink-0">
                        <div className={`absolute inset-0 rounded-2xl blur-sm opacity-40 transition-opacity group-hover:opacity-70 ${isPro ? "bg-gradient-to-tr from-amber-400 to-yellow-600" : "bg-[#2c221e]"}`} />
                        <div className={`relative p-1 rounded-2xl bg-white border-2 ${isPro ? "border-amber-400" : "border-[#dfcbaf]"}`}>
                            <Image
                                src={user?.image?.startsWith("http") ? user.image : "/user.jpg"}
                                width={110}
                                height={110}
                                alt="Profile"
                                className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                            />
                        </div>
                    </div>

                    {/* User Info & Badges */}
                    <div className="space-y-3 flex-1">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-3xl font-black text-[#2c221e] tracking-tight flex items-center gap-2 flex-wrap">
                                {user?.name || "User Name"}
                                {isPro && <Sparkles size={20} className="text-amber-500 animate-pulse" />}
                            </h2>
                            <p className="flex items-center gap-2 text-sm font-medium text-[#4a3b35]/80">
                                <Mail size={14} className="text-[#2c221e]/60" />
                                {user?.email}
                            </p>
                        </div>

                        {/* Status Badges */}
                        <div className="flex flex-wrap gap-2.5">
                            {/* Role Badge */}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2c221e] text-[#ebdcc9] text-xs font-bold uppercase tracking-wider shadow-sm">
                                <Briefcase size={13} />
                                {user?.role || "Member"}
                            </span>

                            {/* Plan Badge (Dynamic Color) */}
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                                isPro 
                                    ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white" 
                                    : "bg-[#ebdcc9] text-[#2c221e]"
                            }`}>
                                <Crown size={13} />
                                {user?.plan || "Free"} Plan
                            </span>
                        </div>
                    </div>
                </div>

                {/* Edit Profile Button */}
                <Link
                    href="/dashboard/profile/edit"
                    className="w-full lg:w-auto text-center px-6 py-3 rounded-xl border border-[#2c221e] text-[#2c221e] font-bold text-sm hover:bg-[#2c221e] hover:text-[#f8f3ea] transition-all duration-200 shadow-sm"
                >
                    Edit Profile
                </Link>
            </div>

            {/* Middle Section: Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {/* Jobs Published */}
                <div className="group rounded-2xl bg-gradient-to-br from-white to-[#ebdcc9]/20 p-5 border border-[#dfcbaf]/40 shadow-sm hover:border-[#dfcbaf] transition-all duration-200">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#4a3b35]/60">Jobs Published</span>
                        <div className="p-2.5 bg-[#ebdcc9]/40 text-[#2c221e] rounded-xl group-hover:scale-110 transition-transform">
                            <FileText size={18} />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-[#2c221e]">
                        {user?.jobsPublished || 0}
                    </p>
                </div>

                {/* Applications */}
                <div className="group rounded-2xl bg-gradient-to-br from-white to-[#ebdcc9]/20 p-5 border border-[#dfcbaf]/40 shadow-sm hover:border-[#dfcbaf] transition-all duration-200">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#4a3b35]/60">Total Applications</span>
                        <div className="p-2.5 bg-[#ebdcc9]/40 text-[#2c221e] rounded-xl group-hover:scale-110 transition-transform">
                            <Briefcase size={18} />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-[#2c221e]">
                        {user?.applications || 0}
                    </p>
                </div>
            </div>

            {/* Bottom Section: Dynamic Plan Promotion */}
            <div className="mt-8 overflow-hidden rounded-2xl border transition-all duration-300 shadow-sm">
                {!isPro ? (
                    /* Free Plan UI */
                    <div className="p-6 bg-[#2c221e] text-[#ebdcc9] relative">
                        <div className="absolute -right-8 -bottom-8 opacity-10 text-white pointer-events-none">
                            <Crown size={140} />
                        </div>
                        <div className="relative space-y-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-white/10 text-[#dfcbaf]">Recommended Upgrade</span>
                                <h3 className="text-xl font-extrabold mt-2 tracking-tight">Free Plan Active</h3>
                            </div>
                            <p className="text-sm text-[#ebdcc9]/80 max-w-xl leading-relaxed font-medium">
                                Upgrade to <span className="text-amber-400 font-bold">Pro Membership</span> to unlock premium job visibility, advanced recruitment analytics, unlimited job postings, and standalone highlighted listings.
                            </p>
                            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-[#2c221e] font-black text-xs uppercase tracking-wider shadow transition-all duration-200 hover:scale-[1.02]">
                                <Crown size={14} />
                                Upgrade to Pro
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Pro Plan (Golden Premium UI) */
                    <div className="p-6 bg-gradient-to-br from-[#2c221e] via-[#3d302b] to-[#2c221e] border-2 border-amber-500/30 text-white relative">
                        {/* Golden Glowing Accents */}
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-yellow-600/10 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-amber-400">
                                    <ShieldCheck size={20} className="drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                                    <h3 className="text-lg font-black uppercase tracking-wider bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
                                        Premium Pro Member
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-300 max-w-xl leading-relaxed">
                                    You have full elite access. Enjoy premium reach, advanced applicant management tools, unlimited access, and featured job listings.
                                </p>
                            </div>
                            <div className="shrink-0 flex items-center justify-center sm:justify-end">
                                <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-600/20 border border-amber-500/40 text-amber-400 font-black text-xs uppercase tracking-widest shadow-inner">
                                    Elite Status
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}