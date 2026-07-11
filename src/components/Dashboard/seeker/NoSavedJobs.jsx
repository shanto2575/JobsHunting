"use client";

import { motion } from "framer-motion";
import { Bookmark, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function NoSavedJobs() {
    return (
        <div className="flex items-center justify-center min-h-[75vh] px-4">
            <div className="max-w-lg w-full text-center space-y-8">

                {/* Icon */}
                <div className="relative flex justify-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-28 h-28 rounded-[2rem] bg-[#f4ece1] flex items-center justify-center"
                        style={{
                            boxShadow:
                                "12px 12px 24px #d9d1c6, -12px -12px 24px #ffffff",
                        }}
                    >
                        <Bookmark
                            size={42}
                            className="text-blue-600"
                        />

                        <div
                            className="absolute inset-2 rounded-[1.6rem]"
                            style={{
                                boxShadow:
                                    "inset 4px 4px 8px #d9d1c6, inset -4px -4px 8px #ffffff",
                            }}
                        />
                    </motion.div>

                    <motion.div
                        className="absolute w-28 h-28 rounded-[2rem] border border-blue-500/20"
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
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-black text-[#2c221e]"
                    >
                        No Saved Jobs
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-[#2c221e]/70 leading-relaxed max-w-md mx-auto"
                    >
                        You haven't saved any jobs yet. Bookmark interesting
                        opportunities so you can easily find and apply to them
                        later.
                    </motion.p>
                </div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/jobs"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2c221e] text-[#ebdcc9] font-black uppercase text-xs tracking-wider hover:bg-[#3d302a] transition"
                    >
                        <Search size={16} />
                        Explore Jobs
                    </Link>

                    <Link
                        href="/dashboard/seeker"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#f4ece1] text-[#2c221e] font-black uppercase text-xs tracking-wider border border-[#dfcbaf]"
                        style={{
                            boxShadow:
                                "5px 5px 10px #d9d1c6, -5px -5px 10px #ffffff",
                        }}
                    >
                        <ArrowLeft size={16} />
                        Back Dashboard
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}