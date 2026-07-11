"use client";

import { getSeekerProfile } from "@/lib/api/seeker/data";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { Check, Sparkles, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pricing() {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const user = session?.user;

    const [mounted, setMounted] = useState(false);

    const [plan, setPlan] = useState("free");

    useEffect(() => {
    if (!session?.user?.email) return;

    getSeekerProfile(session.user.email).then((res) => {
        // console.log(res); 

        if (res.success) {
            setPlan(res.plan);
        }
    });
}, [session]);
    const isPro = plan === "pro";
    // console.log(isPro,'pro')

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
        <div className="w-full bg-[#f4ece1] py-16 px-4 sm:px-6 lg:px-8 text-[#2c221e]">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-20 space-y-3">
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
                        Upgrade Your <br />
                        <span className="text-rose-600 font-serif italic font-normal lowercase tracking-normal">
                            career velocity
                        </span>
                    </h2>
                    <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#2c221e]/60 max-w-md mx-auto leading-relaxed">
                        Choose the perfect blueprint for your next milestone. No hidden fees.
                    </p>
                </div>

                {/* Grid Layout */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                >

                    {/* Free Plan - Neumorphic Light */}
                    <motion.div
                        variants={cardVariants}
                        disabled={isPro }
                        className="bg-[#f4ece1] rounded-[2.5rem] p-8 flex flex-col justify-between h-[530px] transition-all duration-300"
                        style={{
                            boxShadow: "12px 12px 24px #d9d1c6, -12px -12px 24px #ffffff"
                        }}
                    >
                        <div>
                            <div className="text-[10px] font-black tracking-widest uppercase text-[#2c221e]/50 mb-2">
                                Standard Access
                            </div>
                            <h3 className="text-2xl font-black text-[#2c221e]">Free Plan</h3>
                            <div className="mt-4 flex items-baseline text-[#2c221e]">
                                <span className="text-4xl font-black tracking-tight">$0</span>
                                <span className="ml-1 text-sm font-bold opacity-60">/ forever</span>
                            </div>

                            <ul className="mt-8 space-y-4">
                                <li className="flex items-start gap-3 text-sm font-semibold text-[#2c221e]/80">
                                    <div
                                        className="w-6 h-6 rounded-xl bg-[#f4ece1] flex items-center justify-center shrink-0"
                                        style={{
                                            boxShadow: "inset 3px 3px 6px #d9d1c6, inset -3px -3px 6px #ffffff"
                                        }}
                                    >
                                        <Check size={12} className="text-[#2c221e]" strokeWidth={3} />
                                    </div>
                                    <span className="mt-0.5">Apply up to 5 Jobs</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-semibold text-[#2c221e]/80">
                                    <div
                                        className="w-6 h-6 rounded-xl bg-[#f4ece1] flex items-center justify-center shrink-0"
                                        style={{
                                            boxShadow: "inset 3px 3px 6px #d9d1c6, inset -3px -3px 6px #ffffff"
                                        }}
                                    >
                                        <Check size={12} className="text-[#2c221e]" strokeWidth={3} />
                                    </div>
                                    <span className="mt-0.5">Save & Bookmark Jobs</span>
                                </li>
                            </ul>
                        </div>

                        <button
                            disabled={true}
                            className="w-full py-3.5 rounded-xl border border-[#2c221e] bg-transparent text-[#2c221e] font-black text-xs uppercase tracking-widest transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Your current plan
                        </button>
                    </motion.div>

                    {/* Pro Monthly - Neumorphic Dark (Highlighted) */}
                    <motion.div
                        variants={cardVariants}
                        disabled={isPro }
                        className="relative bg-[#2c221e] text-[#ebdcc9] rounded-[2.5rem] p-9 flex flex-col justify-between md:scale-105 md:-translate-y-4 z-10 h-[570px] overflow-hidden border border-[rgba(44,34,30,0.1)] transition-all duration-300"
                        style={{
                            boxShadow: "16px 16px 32px rgba(44,34,30,0.3), -12px -12px 28px rgba(255,253,247,0.04)"
                        }}
                    >
                        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

                        <div>
                            <div
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2c221e] text-rose-400 text-[9px] font-black tracking-widest uppercase mb-4"
                                style={{
                                    boxShadow: "3px 3px 6px #1c1613, -3px -3px 6px #3c2e29"
                                }}
                            >
                                <Sparkles size={10} className="fill-rose-400 text-rose-400" />
                                Recommended
                            </div>

                            <h3 className="text-2xl font-black text-white">Pro Monthly</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-black tracking-tight text-white">$5</span>
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
                                        <div
                                            className="w-6 h-6 rounded-xl bg-[#2c221e] flex items-center justify-center shrink-0"
                                            style={{
                                                boxShadow: "inset 2px 2px 4px #1c1613, inset -2px -2px 4px #3c2e29"
                                            }}
                                        >
                                            <Check size={12} className="text-rose-400" strokeWidth={3} />
                                        </div>
                                        <span className="mt-0.5">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <form action={'/api/checkout_sessions?type=monthly'} method="POST" onSubmit={handleProPlanClick}>
                            <button
                                type="submit"
                                disabled={ isPro }
                                className="w-full py-4 rounded-xl bg-rose-700 text-white font-black text-xs uppercase tracking-widest transition-all duration-200 hover:bg-rose-800 active:scale-95 shadow-[0_4px_12px_rgba(190,24,74,0.3)] disabled:bg-emerald-700 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                { isPro ? (
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

                    {/* Pro Yearly - Neumorphic Light */}
                    <motion.div
                        variants={cardVariants}
                        disabled={ isPro}
                        className="bg-[#f4ece1] rounded-[2.5rem] p-8 flex flex-col justify-between h-[530px] transition-all duration-300"
                        style={{
                            boxShadow: "12px 12px 24px #d9d1c6, -12px -12px 24px #ffffff"
                        }}
                    >
                        <div>
                            <div className="text-[10px] font-black tracking-widest uppercase text-[#2c221e]/50 mb-2">
                                Premium Access
                            </div>
                            <h3 className="text-2xl font-black text-[#2c221e]">Pro Yearly</h3>
                            <div className="mt-4 flex items-baseline text-[#2c221e]">
                                <span className="text-4xl font-black tracking-tight">$45</span>
                                <span className="ml-1 text-sm font-bold opacity-60">/ year</span>
                            </div>
                            <div className="mt-2 inline-block px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-rose-600 bg-[#f4ece1] rounded-lg"
                                style={{
                                    boxShadow: "inset 2px 2px 4px #d9d1c6, inset -2px -2px 4px #ffffff"
                                }}
                            >
                                Save 25% instantly
                            </div>

                            <ul className="mt-6 space-y-4">
                                {[
                                    "Everything in Pro Monthly",
                                    "Unlimited Job Applications",
                                    "AI-Powered Resume Review",
                                    "Priority Candidate Listing"
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-[#2c221e]/80">
                                        <div
                                            className="w-6 h-6 rounded-xl bg-[#f4ece1] flex items-center justify-center shrink-0"
                                            style={{
                                                boxShadow: "inset 3px 3px 6px #d9d1c6, inset -3px -3px 6px #ffffff"
                                            }}
                                        >
                                            <Check size={12} className="text-[#2c221e]" strokeWidth={3} />
                                        </div>
                                        <span className="mt-0.5">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <form action={'/api/checkout_sessions?type=yearly'} method="POST" onSubmit={handleProPlanClick}>
                            <button
                                type="submit"
                                disabled={ isPro}
                                className="w-full py-3.5 rounded-xl border border-[#2c221e] bg-transparent text-[#2c221e] font-black text-xs uppercase tracking-widest transition-all duration-200 hover:bg-[#2c221e] hover:text-[#ebdcc9] active:scale-95 disabled:bg-emerald-700/10 disabled:text-emerald-800 disabled:border-emerald-700/20 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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