"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { GetNotifications } from "@/lib/api/seeker/data";
import {
    Bell,
    Calendar,
    Briefcase,
    CheckCircle,
    XCircle,
    Clock3,
    Users,
} from "lucide-react";

export default function NotificationsPage() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function loadData() {
            if (!user?.id) return;

            const data = await GetNotifications(user.id);

            setNotifications(data.result || []);
        }

        loadData();
    }, [user]);

    const statusColor = {
        Pending: "bg-yellow-100 text-yellow-700",
        Shortlisted: "bg-blue-100 text-blue-700",
        Interview: "bg-purple-100 text-purple-700",
        Hired: "bg-green-100 text-green-700",
        Rejected: "bg-red-100 text-red-700",
    };

    const statusIcon = {
        Pending: <Clock3 size={18} />,
        Shortlisted: <Users size={18} />,
        Interview: <Calendar size={18} />,
        Hired: <CheckCircle size={18} />,
        Rejected: <XCircle size={18} />,
    };

    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Bell />
                Notifications
            </h1>

            {notifications.length === 0 ? (

                <div className="text-center py-20 border rounded-2xl bg-white">
                    <Bell size={40} className="mx-auto mb-4 text-gray-400" />
                    <p className="font-semibold text-gray-500">
                        No notifications yet.
                    </p>
                </div>

            ) : (

                <div className="space-y-5">

                    {notifications.map((item) => (

                        <div
                            key={item._id}
                            className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-start">

                                <div className="flex gap-4">

                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center ${statusColor[item.status]}`}
                                    >
                                        {statusIcon[item.status]}
                                    </div>

                                    <div>

                                        <h2 className="font-bold text-lg">
                                            {item.title}
                                        </h2>

                                        <p className="text-gray-600 mt-2">
                                            {item.message}
                                        </p>
                                        {item.status === "Interview" && item.interview && (
                                            <div className="mt-5 rounded-xl border border-purple-200 bg-purple-50 p-4 space-y-3">

                                                <h3 className="font-bold text-purple-700 flex items-center gap-2">
                                                    <Calendar size={18} />
                                                    Interview Details
                                                </h3>

                                                <div className="grid md:grid-cols-2 gap-3 text-sm">

                                                    <div>
                                                        <span className="font-semibold">📅 Date:</span>{" "}
                                                        {item.interview.date}
                                                    </div>

                                                    <div>
                                                        <span className="font-semibold">🕒 Time:</span>{" "}
                                                        {item.interview.time}
                                                    </div>

                                                    <div>
                                                        <span className="font-semibold">💻 Type:</span>{" "}
                                                        {item.interview.type}
                                                    </div>

                                                    {item.interview.type === "Online" ? (
                                                        <div className="md:col-span-2">
                                                            <span className="font-semibold">🔗 Meeting Link:</span>{" "}
                                                            {item.interview.meetingLink ? (
                                                                <a
                                                                    href={item.interview.meetingLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 underline break-all"
                                                                >
                                                                    Join Interview
                                                                </a>
                                                            ) : (
                                                                <span>No Meeting Link</span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="md:col-span-2">
                                                            <span className="font-semibold">📍 Address:</span>{" "}
                                                            {item.interview.address}
                                                        </div>
                                                    )}

                                                    {item.interview.note && (
                                                        <div className="md:col-span-2">
                                                            <span className="font-semibold">📝 Note:</span>{" "}
                                                            {item.interview.note}
                                                        </div>
                                                    )}

                                                </div>

                                            </div>
                                        )}

                                        {item.status === "Hired" && item.hiring && (
                                            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 space-y-3">

                                                <h3 className="font-bold text-green-700 flex items-center gap-2">
                                                    <CheckCircle size={18} />
                                                    Joining Details
                                                </h3>

                                                <div className="grid md:grid-cols-2 gap-3 text-sm">

                                                    <div>
                                                        <span className="font-semibold">📅 Joining Date:</span>{" "}
                                                        {item.hiring.joiningDate}
                                                    </div>

                                                    <div>
                                                        <span className="font-semibold">🕒 Joining Time:</span>{" "}
                                                        {item.hiring.joiningTime}
                                                    </div>

                                                    <div>
                                                        <span className="font-semibold">💰 Salary:</span>{" "}
                                                        ৳ {Number(item.hiring.salary).toLocaleString()}
                                                    </div>

                                                    <div>
                                                        <span className="font-semibold">📍 Location:</span>{" "}
                                                        {item.hiring.location}
                                                    </div>

                                                    {item.hiring.note && (
                                                        <div className="md:col-span-2">
                                                            <span className="font-semibold">📝 Note:</span>{" "}
                                                            {item.hiring.note}
                                                        </div>
                                                    )}

                                                </div>

                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">

                                            <Briefcase size={16} />

                                            <span>
                                                {item.jobTitle}
                                            </span>

                                            •

                                            <span>
                                                {item.company}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                <span
                                    className={`px-4 py-1 rounded-full text-xs font-bold ${statusColor[item.status]}`}
                                >
                                    {item.status}
                                </span>

                            </div>

                            <p className="text-xs text-gray-400 mt-5">
                                {new Date(item.createdAt).toLocaleString()}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}