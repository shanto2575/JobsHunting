"use client";

import {
    Mail,
    Crown,
    ShieldCheck,
    UserCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { showToast } from "@/Util/toast";

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
            <div className="h-[450px] rounded-2xl border border-[#dfcbaf] bg-white/50 flex items-center justify-center shadow-sm">
                <div className="text-center">
                    <ShieldCheck
                        size={70}
                        className="mx-auto text-red-400 mb-4"
                    />

                    <h2 className="text-2xl font-bold text-[#2c221e]">
                        No Blocked Users
                    </h2>

                    <p className="text-gray-500 mt-2">
                        There are currently no blocked users.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-[#dfcbaf] bg-white/50 shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#2c221e] text-[#ebdcc9]">
                            <th className="px-6 py-4 text-left">
                                User
                            </th>

                            <th className="px-6 py-4 text-left">
                                Email
                            </th>

                            <th className="px-6 py-4 text-center">
                                Role
                            </th>

                            <th className="px-6 py-4 text-center">
                                Plan
                            </th>

                            <th className="px-6 py-4 text-center">
                                Status
                            </th>
                            <th className="px-6 py-4 text-center">
                                Blocked Date
                            </th>

                            <th className="px-6 py-4 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="border-b hover:bg-[#faf6f0] transition"
                            >
                                {/* User */}
                                <td className="px-6 py-5">
                                    <div>
                                        <h2 className="font-semibold text-[#2c221e]">
                                            {user.name}
                                        </h2>

                                        <p className="text-xs text-gray-500">
                                            Joined{" "}
                                            {new Date(
                                                user.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <Mail size={15} />
                                        {user.email}
                                    </div>
                                </td>

                                {/* Role */}
                                <td className="text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${user.role === "admin"
                                                ? "bg-red-100 text-red-700"
                                                : user.role === "employer"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                {/* Plan */}
                                <td className="text-center">
                                    <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                                        <Crown size={14} />
                                        {user.plan}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="text-center">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                        <ShieldCheck size={14} />
                                        Blocked
                                    </span>
                                </td>

                                <td className="text-center">
                                    {user.blockedAt
                                        ? new Date(user.blockedAt).toLocaleString()
                                        : "-"}
                                </td>

                                {/* Action */}
                                <td>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() =>
                                                handleUnblock(user._id)
                                            }
                                            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium flex items-center gap-2 transition"
                                        >
                                            <UserCheck size={16} />
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
    );
}