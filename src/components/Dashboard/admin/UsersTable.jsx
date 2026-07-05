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
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                const status = user.status || "active";
                                return (
                                    <tr
                                        key={user._id}
                                        className="border-b hover:bg-[#faf6f0]/50"
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
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
                                            ${status === "blocked"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {status}
                                            </span>

                                        </td>

                                        {/* Actions */}

                                        <td>
                                            <div className="flex justify-center gap-2">

                                                {user.role === "admin" ? (
                                                    <span className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 text-sm font-semibold">
                                                        Protected
                                                    </span>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                handleBlock(user._id, status)
                                                            }
                                                            className={`px-3 py-2 rounded-lg text-white text-sm flex items-center gap-2
                                                    ${status === "blocked"
                                                                    ? "bg-green-600 hover:bg-green-700"
                                                                    : "bg-yellow-500 hover:bg-yellow-600"
                                                                }`}
                                                        >
                                                            <Ban size={16} />
                                                            {status === "blocked"
                                                                ? "Unblock"
                                                                : "Block"}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(user._id)}
                                                            className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm flex items-center gap-2"
                                                        >
                                                            <Trash2 size={16} />
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