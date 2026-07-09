"use client";

import React from "react";
import { ShieldAlert, ArrowLeft, Home, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const UnauthorizedPage = () => {
    const router = useRouter();

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                when: "beforeChildren",
                staggerChildren: 0.08,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <div className="min-h-screen bg-[#e3d3bc] flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-rose-950 selection:text-rose-200">
            {/* Soft Deep Red Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-rose-950/5 blur-[120px] pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-5xl w-full md:w-11/12 grid grid-cols-1 md:grid-cols-12 rounded-[2.5rem] border border-rose-950/15 bg-white/40 backdrop-blur-xl shadow-[20px_20px_50px_rgba(79,15,19,0.05),-20px_-20px_50px_rgba(255,255,255,0.1)] overflow-hidden"
            >
                {/* Left Column: Info Section */}
                <div className="md:col-span-7 p-8 sm:p-14 flex flex-col justify-between border-b md:border-b-0 md:border-r border-rose-950/10 relative overflow-hidden group">
                    <div className="absolute -top-24 -left-24 w-80 h-80 bg-rose-600/5 rounded-full blur-3xl transition-all duration-700 group-hover:bg-rose-600/10" />

                    {/* Meta Badge */}
                    <motion.div variants={itemVariants} className="flex items-center gap-2.5 relative z-10">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-600 animate-ping" />
                        <span className="text-[11px] font-black tracking-[0.25em] uppercase text-rose-950/60">
                            Security Violation • Breach
                        </span>
                    </motion.div>

                    {/* Main Text Content (Tightened spacing & Larger Typography) */}
                    <div className="my-6 space-y-6 relative z-10">
                        {/* Matte Deep Red Icon Box */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, rotate: -5 }}
                            className="inline-flex p-4.5 rounded-2xl bg-rose-950 text-rose-200 shadow-lg shadow-rose-950/10 cursor-default border border-rose-900/20"
                        >
                            <ShieldAlert size={40} strokeWidth={1.5} className="text-rose-400" />
                        </motion.div>

                        <div className="space-y-4">
                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl sm:text-5xl lg:text-6xl font-black text-rose-950 tracking-tight leading-[1.05]"
                            >
                                Restricted Zone. <br />
                                <span className="text-rose-700 font-serif italic font-normal">Access Denied.</span>
                            </motion.h1>
                            <motion.p
                                variants={itemVariants}
                                className="text-sm sm:text-base font-medium text-rose-900/80 max-w-lg leading-relaxed"
                            >
                                Your session tokens do not possess authorization permissions for this directory. Security firewall protocol active. Please contact system administration if this is an error.
                            </motion.p>
                        </div>
                    </div>

                    <motion.p variants={itemVariants} className="text-xs sm:text-sm text-rose-950/40 font-bold relative z-10">
                        Think this is a platform bug? Please log a report to security command.
                    </motion.p>
                </div>

                {/* Right Column: Clearance Gateway */}
                <div className="md:col-span-5 bg-rose-950/[0.015] p-8 sm:p-14 flex flex-col justify-center space-y-8 relative">
                    <motion.div variants={itemVariants} className="space-y-2.5">
                        <span className="text-xs font-black text-rose-950/40 uppercase tracking-widest block">
                            Clearance Gateway
                        </span>
                        <h3 className="text-2xl font-black text-rose-950 tracking-tight">
                            Verify Identity
                        </h3>
                    </motion.div>

                    {/* Actions Grid */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-4">
                        {/* Primary Crimson Sign In Button */}
                        <Link href='/login' passHref>
                            <motion.button
                                whileHover={{ scale: 1.01, backgroundColor: "#3b070c" }}
                                whileTap={{ scale: 0.99 }}
                                className="w-full flex items-center justify-between px-7 py-4.5 rounded-xl bg-rose-950 text-rose-100 font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-rose-950/10 cursor-pointer group border border-rose-900/30"
                            >
                                <span className="flex items-center gap-3">
                                    <LogIn size={18} className="text-rose-300" />
                                    Sign In to Account
                                </span>
                                <span className="text-sm transition-transform duration-300 group-hover:translate-x-1 text-rose-400">→</span>
                            </motion.button>
                        </Link>

                        {/* Return to Previous */}
                        <motion.button
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(159,18,57,0.04)" }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => router.back()}
                            className="w-full flex items-center gap-3 px-7 py-4.5 rounded-xl border border-rose-950/15 bg-white/20 text-xs sm:text-sm font-black uppercase tracking-widest text-rose-950 cursor-pointer transition-colors"
                        >
                            <ArrowLeft size={18} className="text-rose-950/60" />
                            Return to Previous
                        </motion.button>

                        {/* Teleport to Home */}
                        <motion.button
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(159,18,57,0.03)" }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => router.push("/")}
                            className="w-full flex items-center gap-3 px-7 py-4.5 rounded-xl bg-transparent text-xs sm:text-sm font-black uppercase tracking-widest text-rose-950/70 hover:text-rose-950 cursor-pointer transition-colors"
                        >
                            <Home size={18} className="text-rose-950/50" />
                            Teleport to Home
                        </motion.button>
                    </motion.div>

                    {/* Footer Status */}
                    <motion.div
                        variants={itemVariants}
                        className="pt-4 border-t border-rose-950/10 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-rose-950/40"
                    >
                        <span>Status: 401 / Unauthorized</span>
                        <span>Secure TLS 1.3</span>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default UnauthorizedPage;