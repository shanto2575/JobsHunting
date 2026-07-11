"use client";

import { Sparkles, LayoutDashboard } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-[#f4ece1] flex flex-col items-center justify-center p-4 antialiased">
            <div className="relative flex flex-col items-center">

                {/* Center Core Spinner - Premium Glassmorph Matrix */}
                <div
                    className="w-24 h-24 rounded-[2rem] bg-white/40 border border-[#dfcbaf] flex items-center justify-center relative overflow-hidden"
                    style={{
                        boxShadow: "14px 14px 28px #d9d1c6, -14px -14px 28px #ffffff"
                    }}
                >
                    {/* Rotating Border Ripple */}
                    <div className="absolute inset-1.5 rounded-[1.6rem] border-2 border-dashed border-[#2c221e]/20 animate-[spin_20s_linear_infinite]" />
                    <div className="absolute inset-0 rounded-[2rem] border-2 border-[#2c221e] border-t-transparent border-r-transparent animate-[spin_1.2s_cubic-bezier(0.4,0,0.2,1)_infinite]" />

                    {/* Center Icon */}
                    <div className="relative text-[#2c221e] z-10 animate-pulse">
                        <LayoutDashboard size={32} />
                    </div>
                </div>

                {/* Floating Micro Particles */}
                <div className="absolute -top-4 -right-4 text-amber-600/40 animate-ping duration-1000">
                    <Sparkles size={16} />
                </div>
                <div className="absolute -bottom-2 -left-4 text-rose-600/30 animate-pulse delay-300">
                    <Sparkles size={14} />
                </div>

                {/* Status Typography */}
                <div className="text-center mt-8 space-y-2">
                    <h3 className="text-[#2c221e] text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2">
                        Loading
                    </h3>

                    {/* Progress Bar (Inset Neumorphic Track) */}
                    <div
                        className="w-40 h-1.5 bg-[#2c221e]/5 rounded-full border border-[#dfcbaf]/20 overflow-hidden p-[1px] mx-auto"
                        style={{ boxShadow: "inset 2px 2px 4px #d9d1c6, inset -2px -2px 4px #ffffff" }}
                    >
                        <div className="h-full bg-gradient-to-r from-[#2c221e] to-rose-700 rounded-full w-full animate-[loadingBar_2s_ease-in-out_infinite] origin-left" />
                    </div>

                </div>

            </div>

            {/* Tailwind Keyframe CSS Injector */}
            <style jsx global>{`
                @keyframes loadingBar {
                    0% { transform: scaleX(0); transform-origin: left; }
                    45% { transform: scaleX(1); transform-origin: left; }
                    50% { transform: scaleX(1); transform-origin: right; }
                    100% { transform: scaleX(0); transform-origin: right; }
                }
            `}</style>
        </div>
    );
}