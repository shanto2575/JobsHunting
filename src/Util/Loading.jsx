"use client";

import React from "react";
import { Briefcase } from "lucide-react";
import { motion } from "motion/react";

export default function Loader() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#ebdcc9]/10 backdrop-blur-sm">

            <div className="relative w-24 h-24 flex items-center justify-center mb-6">

                <div className="absolute inset-0 rounded-full border-4 border-[#dfcbaf]/40" />

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 rounded-full border-4 border-t-[#2c221e] border-r-transparent border-b-transparent border-l-transparent"
                />

                <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center shadow-sm z-10">
                    <Briefcase size={20} className="text-[#2c221e] stroke-[1.5]" />
                </div>
            </div>

            <div className="text-center space-y-1">
                <h3 className="text-sm font-black uppercase tracking-[0.25em] text-[#2c221e]">
                    Loading Opportunities
                </h3>
                <p className="text-[10px] font-medium tracking-widest text-[#4a3b35]/60 uppercase">
                    Curating premium listings for you
                </p>
            </div>

        </div>
    );
}