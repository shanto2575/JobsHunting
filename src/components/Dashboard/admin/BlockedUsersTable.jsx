"use client";

import {
    Mail,
    Crown,
    ShieldCheck,
    UserCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { showToast } from "@/Util/toast";
import Image from "next/image";

export default function BlockedUsersTable({ users }) {
    const router = useRouter();

    const handleUnblock = async (id) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/manage-user/block/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: "active",
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                showToast.success(data.message);
                router.refresh();
            } else {
                showToast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            showToast.error("Something went wrong");
        }
    };

    // Empty State
    if (users.length === 0) {
        return (
            <div className="h-[450px] rounded-3xl border border-[#dfcbaf]/60 bg-white/70 backdrop-blur-md flex items-center justify-center shadow-[0_12px_40px_-15px_rgba(44,34,30,0.05)]">
                <div className="text-center p-6">
                    <ShieldCheck
                        size={64}
                        className="mx-auto text-emerald-600/80 mb-4 stroke-[1.5]"
                    />
                    <h2 className="text-xl font-bold text-[#2c221e] tracking-tight">
                        No Blocked Users
                    </h2>
                    <p className="text-xs text-[#2c221e]/60 font-medium mt-1.5 max-w-sm mx-auto">
                        There are currently no restricted or blocked accounts in the system.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            
            {/* 1. Mobile & Tablet View: Grid of Cards (Hidden on Desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                {users.map((user) => (
                    <div 
                        key={user._id}
                        className="rounded-3xl border border-[#dfcbaf]/60 bg-white/70 backdrop-blur-md p-5 shadow-[0_8px_30px_rgb(44,34,30,0.03)] flex flex-col justify-between gap-4"
                    >
                        {/* Top: User Info & Status */}
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-3">
                                <div className="relative w-11 h-11 overflow-hidden rounded-full shrink-0">
                                    <Image
                                        src={
                                            user?.image?.startsWith("http")
                                                ? user.image
                                                : "/user.jpg"
                                        }
                                        alt={user.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-bold text-[#2c221e] text-base tracking-tight">
                                        {user.name}
                                    </h2>
                                    <p className="text-[11px] text-[#2c221e]/60 font-medium">
                                        Joined {new Date(user.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200 shadow-sm shrink-0">
                                <ShieldCheck size={12} />
                                Blocked
                            </span>
                        </div>

                        {/* Middle: Email, Role, Plan & Blocked Date */}
                        <div className="space-y-2.5 pt-2 border-t border-[#dfcbaf]/20">
                            <div className="flex items-center gap-2 text-xs font-medium text-[#2c221e]/80 truncate">
                                <Mail size={14} className="text-[#2c221e]/50 shrink-0" />
                                <span className="truncate">{user.email}</span>
                            </div>

                            <div className="flex items-center justify-between text-xs font-semibold">
                                <div className="flex items-center gap-4">
                                    {/* Role Badge */}
                                    <span
                                        className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm
                                        ${user.role === "admin"
                                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                                : user.role === "employer"
                                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            }`}
                                    >
                                        {user.role}
                                    </span>

                                    {/* Plan Badge */}
                                    <span className="inline-flex items-center gap-1 bg-[#ebdcc9]/40 text-[#2c221e] px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#dfcbaf]/20 shadow-sm">
                                        <Crown size={12} className="text-amber-600 fill-amber-600/10" />
                                        {user.plan}
                                    </span>
                                </div>
                                
                                {/* Blocked Date */}
                                <span className="text-[11px] text-[#2c221e]/60 font-medium">
                                    {user.blockedAt
                                        ? new Date(user.blockedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })
                                        : "-"}
                                </span>
                            </div>
                        </div>

                        {/* Bottom: Unblock Action Button */}
                        <button
                            onClick={() => handleUnblock(user._id)}
                            className="w-full py-2.5 rounded-xl bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 active:scale-98"
                        >
                            <UserCheck size={14} />
                            Unblock User
                        </button>
                    </div>
                ))}
            </div>

            {/* 2. Desktop View: Traditional Table (Hidden on Mobile/Tablet) */}
            <div className="hidden lg:block overflow-hidden rounded-3xl border border-[#dfcbaf]/60 bg-white/70 backdrop-blur-md shadow-[0_12px_40px_-15px_rgba(44,34,30,0.05)]">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#2c221e] text-[#ebdcc9] uppercase tracking-wider text-xs font-bold">
                                <th className="px-6 py-4.5 text-left">User</th>
                                <th className="px-6 py-4.5 text-left">Email</th>
                                <th className="px-6 py-4.5 text-center">Role</th>
                                <th className="px-6 py-4.5 text-center">Plan</th>
                                <th className="px-6 py-4.5 text-center">Status</th>
                                <th className="px-6 py-4.5 text-center">Blocked Date</th>
                                <th className="px-6 py-4.5 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dfcbaf]/30">
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-[#ebdcc9]/20 transition-all duration-200"
                                >
                                    {/* User */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-10 h-10 overflow-hidden rounded-full shrink-0">
                                                <Image
                                                    src={
                                                        user?.image?.startsWith("http")
                                                            ? user.image
                                                            : "/user.jpg"
                                                    }
                                                    alt={user.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-[#2c221e] text-sm tracking-tight">
                                                    {user.name}
                                                </h2>
                                                <p className="text-xs text-[#2c221e]/60 font-medium mt-0.5">
                                                    Joined {new Date(user.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td className="px-6 py-5 text-sm font-medium text-[#2c221e]/80">
                                        <div className="flex items-center gap-2 text-[#2c221e]/70">
                                            <Mail size={14} className="text-[#2c221e]/50" />
                                            {user.email}
                                        </div>
                                    </td>

                                    {/* Role */}
                                    <td className="px-6 py-5 text-center">
                                        <span
                                            className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm min-w-[85px]
                                            ${user.role === "admin"
                                                    ? "bg-rose-50 text-rose-700 border-rose-200"
                                                    : user.role === "employer"
                                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Plan */}
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-flex items-center gap-1.5 bg-[#ebdcc9]/40 text-[#2c221e] px-3 py-1 rounded-full text-xs font-bold border border-[#dfcbaf]/30 shadow-sm">
                                            <Crown size={13} className="text-amber-600 fill-amber-600/10" />
                                            {user.plan}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-300 shadow-sm">
                                            <ShieldCheck size={13} />
                                            Blocked
                                        </span>
                                    </td>

                                    {/* Blocked Date */}
                                    <td className="px-6 py-5 text-center text-sm font-medium text-[#2c221e]/70">
                                        {user.blockedAt
                                            ? new Date(user.blockedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
                                            : "-"}
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => handleUnblock(user._id)}
                                                className="px-3 py-2 rounded-xl bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all duration-200"
                                            >
                                                <UserCheck size={14} />
                                                Unblock
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}