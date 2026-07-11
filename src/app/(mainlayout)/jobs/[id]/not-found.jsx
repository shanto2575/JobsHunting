"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full min-h-screen bg-[#f4ece1] flex items-center justify-center px-4 text-[#2c221e]">
            <div className="max-w-md w-full text-center space-y-8">

                {/* Icon */}
                <div className="relative flex justify-center">
                    <motion.div
                        className="w-28 h-28 rounded-[2rem] bg-[#f4ece1] flex items-center justify-center relative z-10"
                        style={{
                            boxShadow:
                                "12px 12px 24px #d9d1c6, -12px -12px 24px #ffffff",
                        }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <BriefcaseBusiness
                            size={44}
                            className="text-rose-600"
                        />

                        <div
                            className="absolute inset-2 rounded-[1.6rem] pointer-events-none"
                            style={{
                                boxShadow:
                                    "inset 4px 4px 8px #d9d1c6, inset -4px -4px 8px #ffffff",
                            }}
                        />
                    </motion.div>

                    <motion.div
                        className="absolute w-28 h-28 rounded-[2rem] border border-rose-500/20"
                        animate={{
                            scale: [1, 1.4, 1.6],
                            opacity: [0.5, 0.2, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeOut",
                        }}
                    />
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <motion.h1
                        className="text-7xl sm:text-8xl font-black tracking-tighter"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        4
                        <span className="text-rose-600 font-serif italic font-normal">
                            0
                        </span>
                        4
                    </motion.h1>

                    <motion.h2
                        className="text-lg font-black uppercase tracking-widest text-[#2c221e]/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Opportunity <span className="text-rose-600">Not Found</span>
                    </motion.h2>

                    <motion.p
                        className="text-sm font-medium text-[#2c221e]/60 max-w-sm mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        The job listing you're looking for is no longer available.
                        It may have expired, been removed by the employer, or the
                        link is incorrect. Browse our latest opportunities and
                        discover your next career move.
                    </motion.p>
                </div>

                {/* Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        href="/jobs"
                        className="flex items-center justify-center gap-2 bg-[#2c221e] hover:bg-[#3d2f2a] text-[#ebdcc9] px-6 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs shadow-md transition-all duration-200 active:scale-95 group"
                    >
                        <ArrowLeft
                            size={14}
                            className="transition-transform duration-200 group-hover:-translate-x-0.5 text-rose-400"
                        />
                        <span>Browse Jobs</span>
                    </Link>

                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 bg-[#f4ece1] text-[#2c221e] px-6 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs transition-all duration-200 active:scale-95"
                        style={{
                            boxShadow:
                                "5px 5px 10px #d9d1c6, -5px -5px 10px #ffffff",
                        }}
                    >
                        <RefreshCw
                            size={14}
                            className="text-rose-600 animate-spin"
                        />
                        <span>Refresh Page</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
}