"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { Check, Sparkles, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Pricing() {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const user = session?.user;

    const isPro = user?.role === "pro" || user?.plan === "pro";

    const handleProPlanClick = (e) => {
        if (!user) {
            e.preventDefault();
            router.push("/signup?callbackUrl=/pricing");
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="w-full bg-[#f4ece1] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-20">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#2c221e]">
                        Upgrade Your <br />
                        <span className="text-rose-700 font-serif italic font-normal lowercase tracking-normal">
                            career velocity
                        </span>
                    </h2>
                    <p className="mt-4 text-sm font-bold text-[#2c221e]/60 max-w-md mx-auto">
                        Choose the perfect blueprint for your next milestone. No hidden fees.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                >

                    {/* Free Plan */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={!isPro ? { y: -5 } : {}}
                        className="bg-white/40 backdrop-blur-md rounded-[2rem] border border-[#ebdcc9] p-8 flex flex-col justify-between shadow-[4px_4px_16px_rgba(44,34,30,0.02),-4px_-4px_16px_#ffffff] h-[520px]"
                    >
                        <div>
                            <div className="text-xs font-black tracking-widest uppercase text-[#2c221e]/50 mb-2">
                                Standard Access
                            </div>
                            <h3 className="text-2xl font-black text-[#2c221e]">Free Plan</h3>
                            <div className="mt-4 flex items-baseline text-[#2c221e]">
                                <span className="text-4xl font-black tracking-tight">$0</span>
                                <span className="ml-1 text-sm font-bold opacity-60">/ forever</span>
                            </div>

                            <ul className="mt-8 space-y-4">
                                <li className="flex items-start gap-3 text-sm font-semibold text-[#2c221e]/80">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#2c221e]/10 flex items-center justify-center shrink-0">
                                        <Check size={12} className="text-[#2c221e]" strokeWidth={3} />
                                    </div>
                                    <span>Apply up to 5 Jobs</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-semibold text-[#2c221e]/80">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#2c221e]/10 flex items-center justify-center shrink-0">
                                        <Check size={12} className="text-[#2c221e]" strokeWidth={3} />
                                    </div>
                                    <span>Save & Bookmark Jobs</span>
                                </li>
                            </ul>
                        </div>

                        <button 
                            disabled
                            className="w-full mt-8 py-3.5 rounded-xl border border-[#2c221e] bg-transparent text-[#2c221e] font-black text-xs uppercase tracking-widest transition-all duration-200 hover:bg-[#2c221e] hover:text-[#ebdcc9] active:scale-95 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#2c221e] disabled:cursor-not-allowed"
                        >
                            { "Your current plan"}
                        </button>
                    </motion.div>

                    {/* Pro Monthly (Center Card - Highlighted, Raised & Slightly Larger) */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={!isPro ? { y: -15 } : { y: -10 }}
                        className="relative bg-[#2c221e] text-[#ebdcc9] rounded-[2rem] p-9 flex flex-col justify-between shadow-[0_25px_50px_rgba(44,34,30,0.18)] border border-[#2c221e] md:scale-105 md:-translate-y-4 z-10 h-[560px] overflow-hidden"
                    >
                        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-700 text-white text-[9px] font-black tracking-widest uppercase mb-4 shadow-sm">
                                <Sparkles size={10} className="fill-white" />
                                Recommended
                            </div>

                            <h3 className="text-2xl font-black">Pro Monthly</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-black tracking-tight">$5</span>
                                <span className="ml-1 text-sm font-bold opacity-60">/ month</span>
                            </div>

                            <ul className="mt-8 space-y-4">
                                {[
                                    "Unlimited Job Applications",
                                    "AI-Powered Resume Review",
                                    "Priority Candidate Listing",
                                    "Smart Interview Reminders"
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-[#ebdcc9]/95">
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-rose-700/20 flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-rose-500" strokeWidth={3} />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <form action={'/api/checkout_sessions?type=monthly'} method="POST" onSubmit={handleProPlanClick}>
                            <button
                                type="submit"
                                disabled={isPro}
                                className="w-full mt-8 py-4 rounded-xl bg-rose-700 text-white font-black text-xs uppercase tracking-widest transition-all duration-200 hover:bg-rose-800 active:scale-95 shadow-[0_4px_12px_rgba(190,24,74,0.3)] disabled:bg-emerald-700 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isPro ? (
                                    <>
                                        <UserCheck size={14} />
                                        Active Pro Member
                                    </>
                                ) : (
                                    "Upgrade Monthly"
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Pro Yearly */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={!isPro ? { y: -5 } : {}}
                        className="bg-white/40 backdrop-blur-md rounded-[2rem] border border-[#ebdcc9] p-8 flex flex-col justify-between shadow-[4px_4px_16px_rgba(44,34,30,0.02),-4px_-4px_16px_#ffffff] h-[520px]"
                    >
                        <div>
                            <div className="text-xs font-black tracking-widest uppercase text-[#2c221e]/50 mb-2">
                                Premium Access
                            </div>
                            <h3 className="text-2xl font-black text-[#2c221e]">Pro Yearly</h3>
                            <div className="mt-4 flex items-baseline text-[#2c221e]">
                                <span className="text-4xl font-black tracking-tight">$45</span>
                                <span className="ml-1 text-sm font-bold opacity-60">/ year</span>
                            </div>
                            <div className="mt-1 text-[10px] font-bold text-rose-700">
                                Save 25% instantly
                            </div>

                            <ul className="mt-8 space-y-4">
                                {[
                                    "Everything in Pro Monthly",
                                    "Unlimited Job Applications",
                                    "AI-Powered Resume Review",
                                    "Priority Candidate Listing"
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-[#2c221e]/80">
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-[#2c221e]/10 flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-[#2c221e]" strokeWidth={3} />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <form action={'/api/checkout_sessions?type=yearly'} method="POST" onSubmit={handleProPlanClick}>
                            <button
                                type="submit"
                                disabled={isPro}
                                className="w-full mt-8 py-3.5 rounded-xl border border-[#2c221e] bg-transparent text-[#2c221e] font-black text-xs uppercase tracking-widest transition-all duration-200 hover:bg-[#2c221e] hover:text-[#ebdcc9] active:scale-95 disabled:bg-emerald-700/10 disabled:text-emerald-800 disabled:border-emerald-700/20 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isPro ? (
                                    <>
                                        <UserCheck size={14} />
                                        You are a Pro Member
                                    </>
                                ) : (
                                    "Upgrade Yearly"
                                )}
                            </button>
                        </form>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}