"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
    Briefcase,
    Bookmark,
    User,
    Bell,
    FileText,
    Users,
    BarChart3,
    Shield,
    Ban,
    LogOut,
    Home,
    Menu,
    X,
} from "lucide-react";
import { ImProfile } from "react-icons/im";
import Image from "next/image";

export default function DashboardSideBar() {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();

    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || isPending) return null;
    // console.log(session)

    const user = session?.user;
    const role = user?.role || "seeker";

    const dashboardItems = {
        seeker: [
            {
                icon: User,
                label: "Profile",
                link: "/dashboard/seeker",
            },
            {
                icon: Briefcase,
                label: "Applied Jobs",
                link: "/dashboard/seeker/applied-jobs",
            },
            {
                icon: Bookmark,
                label: "Saved Jobs",
                link: "/dashboard/seeker/saved-jobs",
            },

            {
                icon: Bell,
                label: "Notifications",
                link: "/dashboard/seeker/notifications",
            },
        ],

        employer: [
            {
                icon: User,
                label: "Profile",
                link: "/dashboard/employer",
            },
            {
                icon: FileText,
                label: "Post Job",
                link: "/dashboard/employer/post-job",
            },
            {
                icon: FileText,
                label: "Posted Jobs",
                link: "/dashboard/employer/posted-jobs",
            },
            {
                icon: Users,
                label: "Applicants",
                link: "/dashboard/employer/applicants",
            },
            {
                icon: BarChart3,
                label: "Analytics",
                link: "/dashboard/employer/analytics",
            },
        ],

        admin: [
            {
                icon: ImProfile,
                label: "Profile",
                link: "/dashboard/admin/profile",
            },
            {
                icon: Users,
                label: "Admin Analytics ",
                link: "/dashboard/admin/Analytics ",
            },
            {
                icon: Users,
                label: "Manage Users",
                link: "/dashboard/admin/manage-users",
            },
            {
                icon: Shield,
                label: "Manage Jobs",
                link: "/dashboard/admin/manage-jobs",
            },
            {
                icon: Ban,
                label: "Block Users",
                link: "/dashboard/admin/block-users",
            },
        ],
    };

    const navItems = dashboardItems[role] || [];

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 flex items-center gap-2 bg-[#2c221e] text-[#ebdcc9] px-4 py-2 rounded-full shadow-lg"
            >
                <Menu size={18} />
                <span>Menu</span>
            </button>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-[#ebdcc9] z-50 transform transition-transform duration-300 lg:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#dfcbaf]">
                    <h2 className="font-black text-2xl tracking-tight uppercase bg-gradient-to-r from-amber-500 via-rose-500 to-rose-700 bg-clip-text text-transparent">
                        Jobs<span className="font-serif italic font-normal lowercase tracking-normal">hunting</span>
                    </h2>

                    <button onClick={() => setOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between h-[calc(100%-70px)] p-4">
                    <div>
                        {/* User Info */}
                        <div className="mb-6 bg-white/30 rounded-xl p-3">
                            <p className="truncate font-semibold text-sm">
                                {user?.email}
                            </p>

                            <span className="uppercase text-[10px] bg-[#2c221e] text-[#ebdcc9] px-2 py-1 rounded mt-2 inline-block">
                                {role}
                            </span>
                        </div>

                        {/* Nav */}
                        <div className="space-y-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.link;

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.link}
                                        onClick={() => setOpen(false)}
                                    >
                                        <div
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                        ${isActive
                                                    ? "bg-[#2c221e] text-[#ebdcc9]"
                                                    : "hover:bg-black/5"
                                                }`}
                                        >
                                            <item.icon size={18} />
                                            <span>{item.label}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-[#dfcbaf] pt-4 mb-4 space-y-3">
                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 text-sm border border-[#cdbb9d] px-4 py-3 rounded-xl hover:bg-white/30 transition"
                        >
                            <Home size={16} />
                            Back to Site
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 text-sm text-red-600 border border-red-300 px-4 py-3 rounded-xl hover:bg-red-50 transition"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col h-screen w-72 justify-between bg-[#ebdcc9]/30 border-r border-[#dfcbaf] p-4">
                <div>
                    {/* Brand */}
                    <div className="mb-6">
                        <Link href="/">
                            <h2 className="font-black text-2xl tracking-tight uppercase bg-gradient-to-r from-amber-500 via-rose-500 to-rose-700 bg-clip-text text-transparent">
                                Jobs<span className="font-serif italic font-normal lowercase tracking-normal">hunting</span>
                            </h2>
                        </Link>

                        <div className="mt-4 bg-white/50 w-full rounded-xl p-2  flex items-center gap-1 ">

                            {/* Left Image */}
                            <Image
                                src={user?.image || "/user.jpg"}
                                width={300}
                                height={300}
                                alt="Profile"
                                className="w-14 h-14 rounded-full object-cover border border-[#dfcbaf]"
                            />

                            {/* Right Content */}
                            <div className="flex-1 ">
                                <p className="truncate font-semibold text-sm text-[#2c221e]">
                                    {user?.email}
                                </p>

                                <span className="uppercase text-[10px] bg-[#2c221e] text-[#ebdcc9] px-2 py-1 rounded mt-2 inline-block">
                                    {role}
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.link;

                            return (
                                <Link key={item.label} href={item.link}>
                                    <div
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                        ${isActive
                                                ? "bg-[#463f3d] text-[#ebdcc9]"
                                                : "hover:bg-black/5"
                                            }`}
                                    >
                                        <item.icon size={18} />
                                        <span>{item.label}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom */}
                <div className="border-t border-[#dfcbaf] pt-4 mb-24 space-y-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm border border-[#cdbb9d] px-4 py-3 rounded-xl hover:bg-white/30 transition"
                    >
                        <Home size={16} />
                        Back to Site
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-sm text-red-600 border border-red-300 px-4 py-3 rounded-xl hover:bg-red-50 transition"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}