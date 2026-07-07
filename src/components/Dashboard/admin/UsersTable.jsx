"use client";

import {
    Mail,
    Crown,
    Trash2,
    Ban,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { showToast } from "@/Util/toast";
import { BlockAccount, DeleteUser } from "@/lib/api/admin/action";
import { authClient } from "@/lib/auth-client";

export default function UsersTable({ users }) {
    // console.log(users)
    const router = useRouter();

    const handleBlock = async (id, currentStatus) => {
        const newStatus =
            currentStatus === "blocked"
                ? "active"
                : "blocked";

        const data = await BlockAccount(id,newStatus)
        if (data.success) {
            showToast.success(data.message);
            router.refresh();
        } else {
            showToast.error(data.message);
        }
    };

    const handleDelete = async (id) => {
        const result = await DeleteUser(id)
        if (result.success) {
            showToast.success('Deleted Successful')
            router.refresh()
        } else {
            showToast.error(error.message)
        }
    }

    return (
        <div className="overflow-hidden rounded-3xl border border-[#dfcbaf]/60 bg-white/70 backdrop-blur-md shadow-[0_12px_40px_-15px_rgba(44,34,30,0.05)]">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#2c221e] text-[#ebdcc9] uppercase tracking-wider text-xs font-bold">
                            <th className="px-6 py-4.5 text-left">
                                User
                            </th>
                            <th className="px-6 py-4.5 text-left">
                                Email
                            </th>
                            <th className="px-6 py-4.5 text-center">
                                Role
                            </th>
                            <th className="px-6 py-4.5 text-center">
                                Plan
                            </th>
                            <th className="px-6 py-4.5 text-center">
                                Status
                            </th>
                            <th className="px-6 py-4.5 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dfcbaf]/30">
                        {users.map((user) => {
                            const status = user.status || "active";
                            return (
                                <tr
                                    key={user._id}
                                    className="hover:bg-[#ebdcc9]/20 transition-all duration-200"
                                >

                                    {/* User */}

                                    <td className="px-6 py-5">
                                        <div>
                                            <h2 className="font-bold text-[#2c221e] text-sm tracking-tight">
                                                {user.name}
                                            </h2>
                                            <p className="text-xs text-[#2c221e]/60 font-medium mt-0.5">
                                                Joined{" "}
                                                {new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()}
                                            </p>
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
                                        <span
                                            className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm min-w-[85px]
                                            ${status === "blocked"
                                                    ? "bg-rose-100 text-rose-700 border-rose-300"
                                                    : "bg-emerald-100 text-emerald-700 border-emerald-300"
                                            }`}
                                        >
                                            {status}
                                        </span>
                                    </td>

                                    {/* Actions */}

                                    <td className="px-6 py-5">
                                        <div className="flex justify-center items-center gap-2">
                                            {user.role === "admin" ? (
                                                <span className="px-4 py-1.5 rounded-xl bg-[#2c221e]/5 border border-[#dfcbaf]/40 text-[#2c221e]/60 text-xs font-bold tracking-wide uppercase">
                                                    Protected
                                                </span>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleBlock(user._id, status)
                                                        }
                                                        className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border shadow-sm transition-all duration-200
                                                        ${status === "blocked"
                                                                ? "bg-white border-emerald-200 hover:bg-emerald-50 text-emerald-600"
                                                                : "bg-white border-amber-200 hover:bg-amber-50 text-amber-600"
                                                        }`}
                                                    >
                                                        <Ban size={14} />
                                                        {status === "blocked" ? "Unblock" : "Block"}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user._id)}
                                                        className="px-3 py-2 rounded-xl bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all duration-200"
                                                    >
                                                        <Trash2 size={14} />
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}