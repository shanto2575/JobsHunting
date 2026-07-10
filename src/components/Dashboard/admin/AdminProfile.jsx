import Image from "next/image";
import Link from "next/link";
import {
    Users,
    Crown,
    Mail,
    ShieldAlert,
    TrendingUp,
    FileCheck,
    Settings,
    DollarSign
} from "lucide-react";
import { getUser } from "@/lib/session";
import { AdminProfile } from "@/lib/api/admin/data";

export default async function AdminDashboardOverviewCard() {
    const user = await getUser();
const data = await AdminProfile();
    // console.log(data)

    return (
        /* Outer Card: Theme based bg [#f4ece1] with soft blended shadows */
        <div className="w-full rounded-[2.5rem] bg-[#f4ece1] p-6 md:p-8 shadow-[12px_12px_30px_rgba(207,200,191,0.4),-12px_-12px_30px_rgba(255,255,255,0.1)] border border-[#ebdcc9]/40 transition-all duration-300 hover:shadow-[16px_16px_35px_rgba(207,200,191,0.5),-16px_-16px_35px_rgba(255,255,255,0.1)]">

            {/* Top Section: Profile Info & Administrative Actions */}
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between pb-6 border-b border-[#ebdcc9]/50">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full">

                    {/* Profile Image with Crimson/Red Border Indicator for Admin Root */}
                    <div className="relative group shrink-0">
                        <div className="absolute inset-0 rounded-2xl blur-sm opacity-20 transition-opacity group-hover:opacity-40 bg-rose-700" />
                        <div className="relative p-1.5 rounded-2xl bg-[#f4ece1] shadow-[3px_3px_6px_rgba(207,200,191,0.4),-3px_-3px_6px_#ffffff] border border-rose-950/20">
                            <Image
                                src={user?.image?.startsWith("http") ? user.image : "/user.jpg"}
                                width={110}
                                height={110}
                                alt="Admin Profile"
                                className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                            />
                        </div>
                    </div>

                    {/* User Info & Administrative Badges */}
                    <div className="space-y-3 flex-1">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-3xl font-black text-[#2c221e] tracking-tight flex items-center gap-2 flex-wrap">
                                {user?.name || "Admin Name"}
                                <ShieldAlert size={22} className="text-rose-600 animate-pulse" />
                            </h2>
                            <p className="flex items-center gap-2 text-sm font-medium text-[#2c221e]/70">
                                <Mail size={14} className="text-[#2c221e]/50" />
                                {user?.email}
                            </p>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2.5">
                            {/* Role Badge - Root Admin Panel */}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950 text-rose-100 text-xs font-black uppercase tracking-wider shadow-[2px_2px_5px_rgba(79,15,19,0.15)]">
                                <ShieldAlert size={13} />
                                {user?.role || "Super Admin"}
                            </span>

                            {/* System Status Badge */}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2c221e] text-[#ebdcc9] text-xs font-black uppercase tracking-wider shadow-[2px_2px_5px_rgba(44,34,30,0.15)]">
                                <Settings size={13} className="text-amber-400" />
                                Live System
                            </span>
                        </div>
                    </div>
                </div>

                {/* System Control Settings Button */}
                {/* <Link
                    href="/admin/settings"
                    className="w-full lg:w-auto text-center px-6 py-3.5 rounded-2xl bg-[#ded1c0] text-[#2c221e] font-black text-xs uppercase tracking-wider shadow-[3px_3px_6px_rgba(207,200,191,0.4),-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_5px_rgba(207,200,191,0.4),inset_-3px_-3px_5px_#ffffff] active:scale-95 transition-all duration-200 border border-[#ebdcc9]/20"
                >
                    System Control
                </Link> */}
            </div>

            {/* Middle Section: 4-Column Core Admin Stats Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

                {/* 1. Total Registered Users */}
                <div className="group rounded-2xl bg-[#f4ece1] p-5 border border-[#ebdcc9]/40 shadow-[4px_4px_10px_rgba(207,200,191,0.3),-4px_-4px_10px_#ffffff]">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-[#2c221e]/60">Total Users</span>
                        <div className="p-2.5 bg-[#f4ece1] text-[#2c221e] rounded-xl shadow-[inset_2px_2px_4px_rgba(207,200,191,0.4),inset_-2px_-2px_4px_#ffffff] group-hover:scale-105 transition-transform">
                            <Users size={18} />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-[#2c221e]">
                        {data?.result.totalUsers || 0}
                    </p>
                </div>

                {/* 2. Pro/Active Subscriptions */}
                <div className="group rounded-2xl bg-[#f4ece1] p-5 border border-[#ebdcc9]/40 shadow-[4px_4px_10px_rgba(207,200,191,0.3),-4px_-4px_10px_#ffffff]">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-[#2c221e]/60">Pro Subscriptions</span>
                        <div className="p-2.5 bg-[#f4ece1] text-amber-600 rounded-xl shadow-[inset_2px_2px_4px_rgba(207,200,191,0.4),inset_-2px_-2px_4px_#ffffff] group-hover:scale-105 transition-transform">
                            <Crown size={18} />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-[#2c221e]">
                        {data?.result.proUsers || 0}
                    </p>
                </div>

                {/* 3. Pending Job/Post Approvals */}
                <div className="group rounded-2xl bg-[#f4ece1] p-5 border border-[#ebdcc9]/40 shadow-[4px_4px_10px_rgba(207,200,191,0.3),-4px_-4px_10px_#ffffff]">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-[#2c221e]/60">Pending Approvals</span>
                        <div className="p-2.5 bg-[#f4ece1] text-rose-600 rounded-xl shadow-[inset_2px_2px_4px_rgba(207,200,191,0.4),inset_-2px_-2px_4px_#ffffff] group-hover:scale-105 transition-transform">
                            <FileCheck size={18} />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-rose-800">
                        {data?.result.pendingApprovals || 0}
                    </p>
                </div>

                {/* 4. Total Platform Revenue */}
                <div className="group rounded-2xl bg-[#f4ece1] p-5 border border-[#ebdcc9]/40 shadow-[4px_4px_10px_rgba(207,200,191,0.3),-4px_-4px_10px_#ffffff]">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-[#2c221e]/60">Total Revenue</span>
                        <div className="p-2.5 bg-[#f4ece1] text-emerald-600 rounded-xl shadow-[inset_2px_2px_4px_rgba(207,200,191,0.4),inset_-2px_-2px_4px_#ffffff] group-hover:scale-105 transition-transform">
                            <DollarSign size={18} />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-emerald-800">
                        ${data?.result.totalRevenue || 0}
                    </p>
                </div>
            </div>

            {/* Bottom Section: Administrative Terminal System Overview Banner */}
            <div className="mt-8 overflow-hidden rounded-2xl shadow-[4px_4px_12px_rgba(207,200,191,0.3),-4px_-4px_12px_#ffffff] border border-rose-950/10">
                <div className="p-6 bg-[#2c221e] text-[#ebdcc9] relative">
                    <div className="absolute -right-8 -bottom-8 opacity-5 text-white pointer-events-none">
                        <Settings size={140} />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-rose-400">
                                <TrendingUp size={20} />
                                <h3 className="text-base font-black uppercase tracking-wider">
                                    System Server Health: Optimal
                                </h3>
                            </div>
                            <p className="text-xs sm:text-sm text-[#ebdcc9]/80 max-w-2xl leading-relaxed font-medium">
                                Database, user authentication gateways, and transaction pipelines are fully operational. No latency exceptions reported in the last 24 hours.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <Link
                                href="/admin/logs"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-black text-xs uppercase tracking-wider border border-white/10 transition-colors"
                            >
                                View System Logs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}