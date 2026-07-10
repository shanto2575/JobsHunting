"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, LogOut, ChevronRight, LayoutDashboard, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Browse Jobs", href: "/jobs" },
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
        <div className="w-full flex flex-col items-center pt-3 px-4 sm:px-6 lg:px-8 pointer-events-none">
            
            {/* 1. Main Navbar Pill */}
            <nav
                className={`w-full max-w-7xl rounded-full border border-[rgba(44,34,30,0.1)] transition-all duration-500 pointer-events-auto ${
                    scrolled 
                    ? "shadow-[0_15px_30px_-10px_rgba(44,34,30,0.25)] scale-[0.99] backdrop-blur-2xl" 
                    : "shadow-[0_4px_20px_-5px_rgba(44,34,30,0.05)]"
                }`}
                style={{
                    backgroundColor: scrolled ? 'rgba(44, 34, 30, 0.95)' : 'rgba(44, 34, 30, 0.88)',
                }}
            >
                <div className="px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14">

                        {/* Logo */}
                        <Link href="/" className="text-2xl font-black tracking-tight uppercase transition duration-300 group flex items-center gap-1">
                            <span className="text-[#ebdcc9] group-hover:text-white transition-colors duration-300">
                                Jobs<span className="text-rose-500 font-serif italic font-normal lowercase tracking-normal">hunting</span>
                            </span>
                            <span className="inline-block text-rose-500 transition-transform duration-300 group-hover:rotate-12 text-base font-normal ml-0.5">
                                ✦
                            </span>
                        </Link>

                        {/* Middle Links */}
                        <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative py-1 text-[#ebdcc9]/70 hover:text-[#ebdcc9] transition-colors duration-300 group"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 rounded-full bg-rose-500 group-hover:w-full" />
                                </Link>
                            ))}

                            {user && (
                                <Link
                                    href={getDashboardLink()}
                                    className="relative py-1 text-[#ebdcc9]/70 hover:text-[#ebdcc9] transition-colors duration-300 group flex items-center gap-1"
                                >
                                    <LayoutDashboard size={13} className="text-rose-400" />
                                    Dashboard
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 rounded-full bg-rose-500 group-hover:w-full" />
                                </Link>
                            )}
                        </div>

                        {/* Desktop Auth Section */}
                        <div className="hidden md:flex items-center gap-4">
                            {!user ? (
                                <>
                                    <Link
                                        href="/login"
                                        className="px-5 py-2 text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300 border border-[rgba(235,220,201,0.2)] bg-white/5 text-[#ebdcc9] hover:bg-white/10"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/signup"
                                        className="px-6 py-2 text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg hover:bg-white bg-[#ebdcc9] text-[#2c221e]"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center gap-4 pl-4 border-l border-[rgba(235,220,201,0.15)]">
                                    <Link href={getDashboardLink()} className="flex items-center gap-2.5 group">
                                        <div className="relative">
                                            <Image
                                                src={user?.image?.startsWith("http") ? user.image : "/user.jpg"}
                                                width={40}
                                                height={40}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full object-cover border-2 transition-all duration-300 group-hover:border-rose-500"
                                                style={{ borderColor: 'rgba(235, 220, 201, 0.3)' }}
                                            />
                                            {(user?.role === "admin" || user?.role === "employer") && (
                                                <span className="absolute -bottom-1 -right-1 bg-rose-600 rounded-full p-0.5 text-white border border-[#2c221e]">
                                                    <ShieldCheck size={8} />
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-[#ebdcc9] tracking-wide transition-colors duration-300 group-hover:text-white">
                                                {user.name}
                                            </span>
                                            <span className="text-[9px] font-bold text-[#ebdcc9]/40 uppercase tracking-widest -mt-0.5">
                                                {user.role}
                                            </span>
                                        </div>
                                    </Link>
                                    
                                    <button
                                        onClick={handleSignOut}
                                        className="p-2 rounded-full text-red-400 hover:text-white bg-white/5 hover:bg-rose-950/30 transition-all duration-300"
                                    >
                                        <LogOut size={14} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Hamburger Trigger */}
                        <button
                            className="md:hidden p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-200 hover:text-white transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* 2. Fixed Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="w-full max-w-7xl md:hidden mt-2 p-4 space-y-2 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] border backdrop-blur-2xl bg-gradient-to-b from-[rgba(44,34,30,0.97)] to-[rgba(34,25,22,0.99)] border-[rgba(235,220,201,0.1)] pointer-events-auto"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center justify-between py-3 px-4 text-xs font-black uppercase tracking-widest rounded-2xl transition-all duration-200 text-[#ebdcc9]/80 hover:bg-white/5 hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                                <ChevronRight size={14} className="opacity-40 text-rose-400" />
                            </Link>
                        ))}

                        {user && (
                            <Link
                                href={getDashboardLink()}
                                className="flex items-center justify-between py-3 px-4 text-xs font-black uppercase tracking-widest rounded-2xl transition-all duration-200 text-[#ebdcc9]/80 hover:bg-white/5 hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="flex items-center gap-2">
                                    <LayoutDashboard size={14} className="text-rose-400" />
                                    Dashboard
                                </span>
                                <ChevronRight size={14} className="opacity-40 text-rose-400" />
                            </Link>
                        )}

                        <div className="pt-4 mt-2 border-t border-[rgba(235,220,201,0.08)]">
                            {!user ? (
                                <div className="grid grid-cols-2 gap-3 font-black text-xs uppercase tracking-widest">
                                    <Link
                                        href="/login"
                                        className="block text-center py-3 border border-[rgba(235,220,201,0.15)] rounded-2xl text-[#ebdcc9] bg-white/5 hover:bg-white/10"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="block text-center py-3 rounded-2xl bg-[#ebdcc9] text-[#2c221e] shadow-md"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between px-2 py-1 bg-white/5 rounded-2xl p-2 border border-white/[0.02]">
                                    <Link href={getDashboardLink()} className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                                        <Image
                                            src={user?.image?.startsWith("http") ? user.image : "/user.jpg"}
                                            alt="Profile"
                                            width={40}
                                            height={40}
                                            className="w-9 h-9 rounded-full object-cover border"
                                            style={{ borderColor: 'rgba(235, 220, 201, 0.3)' }}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-[#ebdcc9] tracking-wide">{user.name}</span>
                                            <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest -mt-0.5">{user.role}</span>
                                        </div>
                                    </Link>
                                    
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setIsOpen(false);
                                        }}
                                        className="py-2.5 px-4 rounded-xl bg-rose-950/40 text-red-400 hover:text-white flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest border border-rose-900/30"
                                    >
                                        <LogOut size={12} />
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}