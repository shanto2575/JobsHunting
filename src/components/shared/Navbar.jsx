"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ session }) {
    const [isOpen, setIsOpen] = useState(false);
    const user = session?.user;

    const navLinks = [
        { name: "Browse Jobs", href: "/jobs" },
        { name: "Companies", href: "/companies" },
    ];

    const getDashboardLink = () => {
        if (!user) return "/signin";
        if (user.role === "job_seeker") return "/dashboard/job-seeker";
        if (user.role === "employer") return "/dashboard/employer";
        if (user.role === "admin") return "/dashboard/admin";
        return "/dashboard";
    };

    return (
        <div className="w-full sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
            <nav 
                className="max-w-7xl mx-auto rounded-full backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(44,34,30,0.3)] border transition-all duration-300"
                style={{ 
                    backgroundColor: 'rgba(44, 34, 30, 0.9)', // 90% Opacity for deep rich luxury look
                    borderColor: 'rgba(74, 59, 53, 0.5)', // Subtle borders
                }}
            >
                <div className="px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14">

                        {/* Logo Component */}
                        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-90 transition group">
                            Jobs<span className="transition-colors duration-300" style={{ color: '#ebdcc9' }}>Hunting</span>
                            <span className="inline-block ml-1 group-hover:animate-bounce text-sm">✨</span>
                        </Link>

                        {/* Desktop Links with Modern Underline Animation */}
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

                            <Link
                                href={getDashboardLink()}
                                className="relative py-1 text-gray-200 hover:text-white transition-colors duration-200 group"
                            >
                                Dashboard
                                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] transition-all duration-300 -translate-x-1/2 rounded-full group-hover:w-full" style={{ backgroundColor: '#ebdcc9' }} />
                            </Link>
                        </div>

                        {/* Right Side Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            {!user ? (
                                <>
                                    <Link
                                        href="/login"
                                        className="px-4 py-1.5 text-xs font-medium border rounded-full transition-all duration-200 bg-white/0 hover:bg-white/5"
                                        style={{ borderColor: 'rgba(235, 220, 201, 0.4)', color: '#ebdcc9' }}
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/signup"
                                        className="px-5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
                                        style={{ 
                                            backgroundColor: '#ebdcc9', 
                                            color: '#2c221e' 
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#dfcbaf'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#ebdcc9'}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center gap-2.5 pl-3 border-l" style={{ borderColor: 'rgba(235, 220, 201, 0.2)' }}>
                                    <img
                                        src={user.image || "/default-avatar.png"}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full object-cover border"
                                        style={{ borderColor: '#dfcbaf' }}
                                    />
                                    <span className="text-xs font-medium" style={{ color: '#ebdcc9' }}>{user.name}</span>
                                </div>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden p-1 text-gray-200 hover:text-white transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
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

                        <Link 
                            href={getDashboardLink()} 
                            className="block py-2 px-3 text-sm rounded-xl transition-colors text-gray-300 hover:bg-white/5 hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>

                        <div className="pt-3 mt-2 border-t" style={{ borderColor: 'rgba(235, 220, 201, 0.1)' }}>
                            {!user ? (
                                <div className="grid grid-cols-2 gap-3">
                                    <Link 
                                        href="/signin" 
                                        className="block text-center py-2 border rounded-full text-xs text-[#ebdcc9]"
                                        style={{ borderColor: 'rgba(235, 220, 201, 0.3)' }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        href="/signup" 
                                        className="block text-center py-2 rounded-full text-xs font-medium"
                                        style={{ backgroundColor: '#ebdcc9', color: '#2c221e' }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 px-3 py-1">
                                    <img
                                        src={user.image || "/default-avatar.png"}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full object-cover border"
                                        style={{ borderColor: '#dfcbaf' }}
                                    />
                                    <span className="text-sm font-medium text-[#ebdcc9]">{user.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}