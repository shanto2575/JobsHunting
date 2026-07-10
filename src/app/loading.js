"use client";

import { motion } from "framer-motion";
import { Briefcase, Sparkles } from "lucide-react";

export default function Loading() {
    return (
        <div className="w-full min-h-screen bg-[#f4ece1] flex flex-col items-center justify-center px-4 text-[#2c221e]">
            <div className="space-y-10 text-center flex flex-col items-center max-w-sm w-full">
                
                {/* Neumorphic Glowing Container */}
                <div 
                    className="relative w-28 h-28 rounded-[2.5rem] bg-[#f4ece1] flex items-center justify-center"
                    style={{
                        boxShadow: "14px 14px 28px #d9d1c6, -14px -14px 28px #ffffff"
                    }}
                >
                    {/* Inset Inner Frame */}
                    <div className="absolute inset-3 rounded-[1.8rem]"
                        style={{
                            boxShadow: "inset 4px 4px 8px #d9d1c6, inset -4px -4px 8px #ffffff"
                        }}
                    />

                    {/* Briefcase Icon with Pulse */}
                    <motion.div
                        animate={{ 
                            scale: [0.95, 1.05, 0.95],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 2, 
                            ease: "easeInOut" 
                        }}
                        className="relative z-10 text-rose-600"
                    >
                        <Briefcase size={36} className="fill-rose-600/5" />
                    </motion.div>

                    {/* Premium AI Sparkle */}
                    <motion.div
                        className="absolute top-2 right-2 text-rose-500 z-20"
                        animate={{ 
                            y: [0, -6, 0],
                            opacity: [0.4, 1, 0.4],
                            scale: [0.8, 1.1, 0.8]
                        }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 1.8, 
                            ease: "easeInOut" 
                        }}
                    >
                        <Sparkles size={16} className="fill-rose-500" />
                    </motion.div>

                    {/* Premium Radial Scanning Line */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="43"
                            stroke="url(#aiScanGradient)"
                            strokeWidth="3"
                            fill="transparent"
                            strokeDasharray="270"
                            animate={{ strokeDashoffset: [270, 0, -270] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient id="aiScanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#2c221e" stopOpacity="0" />
                                <stop offset="50%" stopColor="#be123c" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#e11d48" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Modern Fetching Title & Status */}
                <div className="space-y-4 w-full">
                    <div className="space-y-1">
                        <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[#2c221e]/90">
                            Scanning <span className="text-rose-600 font-serif italic font-normal lowercase tracking-normal text-sm">live opportunities</span>
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c221e]/50">
                            Compiling the ultimate career index
                        </p>
                    </div>

                    {/* Neumorphic Slim Progress Bar Line */}
                    <div 
                        className="h-2 w-full bg-[#f4ece1] rounded-full overflow-hidden p-[1px]"
                        style={{
                            boxShadow: "inset 2px 2px 4px #d9d1c6, inset -2px -2px 4px #ffffff"
                        }}
                    >
                        <motion.div 
                            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-700"
                            initial={{ width: "0%" }}
                            animate={{ 
                                width: ["0%", "35%", "70%", "100%"],
                            }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 3.2, 
                                ease: "easeInOut" 
                            }}
                        />
                    </div>

                    {/* Dynamic Text Shifter Animation (Job Specific) */}
                    <div className="h-4 overflow-hidden relative">
                        <motion.div
                            className="text-[11px] font-black uppercase tracking-wider text-rose-600/80 flex flex-col items-center gap-4"
                            animate={{ y: [0, -28, -56, 0] }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 6, 
                                ease: "easeInOut",
                                times: [0, 0.33, 0.66, 1]
                            }}
                        >
                            <span>Fetching latest openings...</span>
                            <span>Matching neural profile markers...</span>
                            <span>Filtering verified salary blueprints...</span>
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    );
}