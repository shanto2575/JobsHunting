"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const navLinks = [
        { name: "Browse Jobs", href: "/jobs" },
        { name: "Companies", href: "/companies" },
    ];

    const getDashboardLink = () => {
        if (!user) return "/signin";
        if (user?.role === "seeker") return "/dashboard/seeker";
        if (user?.role === "employer") return "/dashboard/employer";
        if (user?.role === "admin") return "/dashboard/admin";
        return "/dashboard";
    };

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        <div className="w-full sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
            <nav
                className="max-w-7xl mx-auto rounded-full backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(44,34,30,0.3)] border transition-all duration-300"
                style={{
                    backgroundColor: 'rgba(44, 34, 30, 0.9)',
                    borderColor: 'rgba(74, 59, 53, 0.5)',
                }}
            >
                <div className="px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14">

                        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-90 transition group">
                            Jobs<span className="transition-colors duration-300" style={{ color: '#ebdcc9' }}>Hunting</span>
                            <span className="inline-block ml-1 group-hover:animate-bounce text-sm">✨</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative py-1 text-gray-200 hover:text-white transition-colors duration-200 group"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-1/2 w-0 h-[2px] transition-all duration-300 -translate-x-1/2 rounded-full group-hover:w-full" style={{ backgroundColor: '#ebdcc9' }} />
                                </Link>
                            ))}

                            {user && (
                                <Link
                                    href={getDashboardLink()}
                                    className="relative py-1 text-gray-200 hover:text-white transition-colors duration-200 group"
                                >
                                    Dashboard
                                    <span className="absolute bottom-0 left-1/2 w-0 h-[2px] transition-all duration-300 -translate-x-1/2 rounded-full group-hover:w-full" style={{ backgroundColor: '#ebdcc9' }} />
                                </Link>
                            )}
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            {!user ? (
                                <>
                                    <Link
                                        href="/login"
                                        className="px-4 py-1.5 text-xs font-semibold border rounded-full transition-all duration-200 bg-white/5 hover:bg-white/10"
                                        style={{ borderColor: 'rgba(235, 220, 201, 0.4)', color: '#ebdcc9' }}
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/signup"
                                        className="px-5 py-1.5 text-xs font-bold rounded-full transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
                                        style={{
                                            backgroundColor: '#ebdcc9',
                                            color: '#2c221e'
                                        }}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center gap-4 pl-3 border-l" style={{ borderColor: 'rgba(235, 220, 201, 0.2)' }}>
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={
                                                user?.image?.startsWith("http")
                                                    ? user.image
                                                    : "/user.jpg"
                                            }
                                            width={300}
                                            height={300}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover border"
                                            style={{ borderColor: '#dfcbaf' }}
                                        />
                                        <span className="text-xs font-semibold" style={{ color: '#ebdcc9' }}>{user.name}</span>
                                    </div>
                                    <button
                                        onClick={handleSignOut}
                                        className="p-1.5 rounded  text-red-400 hover:text-white transition-colors duration-200 flex items-center justify-center gap-2"
                                        title="Logout"
                                    >
                                        <LogOut size={16} /> LogOut
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            className="md:hidden p-1 text-gray-200 hover:text-white transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div
                        className="md:hidden mx-2 mb-2 px-4 py-4 space-y-2 font-medium rounded-3xl shadow-xl border animate-in fade-in slide-in-from-top-2 duration-300"
                        style={{
                            backgroundColor: '#2c221e',
                            borderColor: '#4a3b35'
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block py-2 px-3 text-sm rounded-xl transition-colors text-gray-300 hover:bg-white/5 hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {user && (
                            <Link
                                href={getDashboardLink()}
                                className="block py-2 px-3 text-sm rounded-xl transition-colors text-gray-300 hover:bg-white/5 hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}

                        <div className="pt-3 mt-2 border-t" style={{ borderColor: 'rgba(235, 220, 201, 0.1)' }}>
                            {!user ? (
                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        href="/login"
                                        className="block text-center py-2 border rounded-full text-xs font-semibold text-[#ebdcc9]"
                                        style={{ borderColor: 'rgba(235, 220, 201, 0.3)' }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="block text-center py-2 rounded-full text-xs font-bold"
                                        style={{ backgroundColor: '#ebdcc9', color: '#2c221e' }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between px-3 py-1">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={
                                                user?.image?.startsWith("http")
                                                    ? user.image
                                                    : "/user.jpg"
                                            }
                                            alt="Profile"
                                            width={300}
                                            height={300}
                                            className="w-8 h-8 rounded-full object-cover border"
                                            style={{ borderColor: '#dfcbaf' }}
                                        />
                                        <span className="text-sm font-semibold text-[#ebdcc9]">{user.name}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setIsOpen(false);
                                        }}
                                        className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white flex items-center gap-2 text-xs font-semibold border border-white/10"
                                    >
                                        <LogOut size={14} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}