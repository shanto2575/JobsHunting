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
    MapPin,
    DollarSign,
    ExternalLink
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

    // Ultra-clean modern colors matching the premium brown/amber palette
    const statusColor = {
        Pending: "bg-[#ebdcc9] text-[#2c221e]",
        Shortlisted: "bg-blue-500/10 text-blue-700 border border-blue-500/20",
        Interview: "bg-purple-500/10 text-purple-700 border border-purple-500/20",
        Hired: "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20",
        Rejected: "bg-rose-500/10 text-rose-700 border border-rose-500/20",
    };

    const statusIcon = {
        Pending: <Clock3 size={18} />,
        Shortlisted: <Users size={18} />,
        Interview: <Calendar size={18} />,
        Hired: <CheckCircle size={18} />,
        Rejected: <XCircle size={18} />,
    };

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            {/* Page Header */}
            <h1 className="text-3xl font-black mb-8 flex items-center gap-3 text-[#2c221e] tracking-tight">
                <Bell className="text-[#2c221e]" size={28} />
                Notifications
            </h1>

            {notifications.length === 0 ? (
                /* Empty State with Soft Shadow ~0.1 */
                <div className="text-center py-20 rounded-[2.5rem] bg-[#f4ece1] border border-[#ebdcc9]/40 shadow-[10px_10px_30px_rgba(44,34,30,0.06),-10px_-10px_30px_rgba(255,255,255,0.8)]">
                    <Bell size={44} className="mx-auto mb-4 text-[#2c221e]/30" />
                    <p className="font-black text-lg text-[#2c221e]/60">
                        No notifications yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {notifications.map((item) => (
                        /* Main Notification Card: Shadow intensity strictly at ~0.1 */
                        <div
                            key={item._id}
                            className="rounded-[2.5rem] bg-[#f4ece1] p-6 md:p-8 border border-[#ebdcc9]/50 shadow-[12px_12px_30px_rgba(44,34,30,0.08),-12px_-12px_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[14px_14px_35px_rgba(44,34,30,0.12),-14px_-14px_35px_rgba(255,255,255,0.1)]"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="flex gap-4 items-start w-full">
                                    {/* Icon Box */}
                                    <div
                                        className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-[inset_2px_2px_5px_rgba(44,34,30,0.05),inset_-2px_-2px_5px_#ffffff] ${statusColor[item.status]}`}
                                    >
                                        {statusIcon[item.status]}
                                    </div>

                                    <div className="flex-1 w-full">
                                        <h2 className="font-black text-xl text-[#2c221e] tracking-tight">
                                            {item.title}
                                        </h2>

                                        <p className="text-[#2c221e]/80 mt-2 text-sm leading-relaxed font-medium">
                                            {item.message}
                                        </p>

                                        {/* ================= INTERVIEW DETAILS CARD (PREMIUM PURPLE STYLE) ================= */}
                                        {item.status === "Interview" && item.interview && (
                                            <div className="mt-6 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-50/70 to-purple-100/30 p-5 md:p-6 shadow-[4px_4px_15px_rgba(147,51,234,0.04)] relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-3 text-purple-200 pointer-events-none">
                                                    <Calendar size={64} className="opacity-15" />
                                                </div>
                                                
                                                <h3 className="font-black text-purple-900 flex items-center gap-2 text-xs uppercase tracking-widest mb-4">
                                                    <span className="w-1.5 h-3 bg-purple-600 rounded-full inline-block"></span>
                                                    Interview Schedule
                                                </h3>

                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-purple-950 font-semibold">
                                                    <div className="bg-white/60 p-3 rounded-xl border border-purple-200/40">
                                                        <span className="block text-[10px] text-purple-600/70 uppercase font-bold tracking-wider mb-0.5">📅 Date</span>
                                                        {item.interview.date}
                                                    </div>
                                                    <div className="bg-white/60 p-3 rounded-xl border border-purple-200/40">
                                                        <span className="block text-[10px] text-purple-600/70 uppercase font-bold tracking-wider mb-0.5">🕒 Time</span>
                                                        {item.interview.time}
                                                    </div>
                                                    <div className="bg-white/60 p-3 rounded-xl border border-purple-200/40">
                                                        <span className="block text-[10px] text-purple-600/70 uppercase font-bold tracking-wider mb-0.5">💻 Method</span>
                                                        {item.interview.type}
                                                    </div>
                                                </div>

                                                {/* Interview Location / Link Wrapper */}
                                                <div className="mt-4 pt-4 border-t border-purple-200/40">
                                                    {item.interview.type === "Online" ? (
                                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                                            <div className="text-sm font-medium text-purple-900">
                                                                <span className="font-bold text-purple-950">Meeting: </span> Digital Conference Link Setup
                                                            </div>
                                                            {item.interview.meetingLink ? (
                                                                <a
                                                                    href={item.interview.meetingLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider bg-purple-700 text-white rounded-xl shadow-sm hover:bg-purple-800 transition-colors"
                                                                >
                                                                    Join Interview <ExternalLink size={12} />
                                                                </a>
                                                            ) : (
                                                                <span className="text-xs text-purple-500 font-bold">Link Not Generated</span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="text-sm font-medium text-purple-950 flex items-start gap-1.5">
                                                            <MapPin size={16} className="text-purple-600 shrink-0 mt-0.5" />
                                                            <div>
                                                                <span className="font-black text-purple-900 block text-xs uppercase tracking-wider mb-0.5">📍 Address</span>
                                                                {item.interview.address}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {item.interview.note && (
                                                    <div className="mt-3 text-xs bg-purple-950 text-purple-100/90 p-3 rounded-xl font-medium leading-relaxed">
                                                        <span className="font-bold text-amber-400">Important Note: </span> {item.interview.note}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* ================= HIRED DETAILS CARD (PREMIUM EMERALD STYLE) ================= */}
                                        {item.status === "Hired" && item.hiring && (
                                            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-50/70 to-emerald-100/30 p-5 md:p-6 shadow-[4px_4px_15px_rgba(16,185,129,0.04)] relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-3 text-emerald-200 pointer-events-none">
                                                    <CheckCircle size={64} className="opacity-15" />
                                                </div>

                                                <h3 className="font-black text-emerald-900 flex items-center gap-2 text-xs uppercase tracking-widest mb-4">
                                                    <span className="w-1.5 h-3 bg-emerald-600 rounded-full inline-block"></span>
                                                    Official Offer Placement
                                                </h3>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-emerald-950 font-semibold">
                                                    <div className="bg-white/60 p-3 rounded-xl border border-emerald-200/40">
                                                        <span className="block text-[10px] text-emerald-600/70 uppercase font-bold tracking-wider mb-0.5">📅 Joining Date</span>
                                                        {item.hiring.joiningDate}
                                                    </div>
                                                    <div className="bg-white/60 p-3 rounded-xl border border-emerald-200/40">
                                                        <span className="block text-[10px] text-emerald-600/70 uppercase font-bold tracking-wider mb-0.5">🕒 Reporting Time</span>
                                                        {item.hiring.joiningTime}
                                                    </div>
                                                    <div className="bg-white/60 p-3 rounded-xl border border-emerald-200/40">
                                                        <span className="block text-[10px] text-emerald-600/70 uppercase font-bold tracking-wider mb-0.5">💰 Remuneration</span>
                                                        ৳ {Number(item.hiring.salary).toLocaleString()}
                                                    </div>
                                                    <div className="bg-white/60 p-3 rounded-xl border border-emerald-200/40">
                                                        <span className="block text-[10px] text-emerald-600/70 uppercase font-bold tracking-wider mb-0.5">📍 Workplace</span>
                                                        {item.hiring.location}
                                                    </div>
                                                </div>

                                                {item.hiring.note && (
                                                    <div className="mt-4 text-xs bg-emerald-950 text-emerald-100/90 p-3 rounded-xl font-medium leading-relaxed">
                                                        <span className="font-bold text-amber-400">Onboarding Info: </span> {item.hiring.note}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Meta Job Title & Company Footer */}
                                        <div className="flex items-center gap-2 mt-5 text-xs font-bold text-[#2c221e]/50">
                                            <Briefcase size={14} className="opacity-70" />
                                            <span>{item.jobTitle}</span>
                                            <span className="opacity-40">•</span>
                                            <span>{item.company}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Pill (Top Right on large devices) */}
                                <span
                                    className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shrink-0 text-center sm:self-start shadow-[3px_3px_8px_rgba(44,34,30,0.05),-3px_-3px_8px_#ffffff] ${statusColor[item.status]}`}
                                >
                                    {item.status}
                                </span>
                            </div>

                            {/* Timestamp Component */}
                            <p className="text-[10px] font-black text-[#2c221e]/40 mt-5 uppercase tracking-wider border-t border-[#ebdcc9]/40 pt-4">
                                Received on: {new Date(item.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}