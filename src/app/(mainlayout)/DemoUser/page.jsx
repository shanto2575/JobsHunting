'use client'
import { Shield, Sparkles, User, Copy, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DemoAccounts() {
    const [copiedText, setCopiedText] = useState("");

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(""), 2000);
    };

    const accounts = [
        {
            title: "ADMIN USER",
            icon: <Shield className="w-5 h-5 text-[#dfcbaf]" />,
            desc: "Access to system analytics, user management, prompt moderation, payment histories, and system configurations.",
            email: "admin@gmail.com",
            password: "12345678",
            borderColor: "hover:border-[#4a3b35]",
        },
        {
            title: "CREATOR USER",
            icon: <Sparkles className="w-5 h-5 text-[#dfcbaf]" />,
            desc: "Access to creator analytics, adding new AI prompts, editing owned listings, and tracking prompt views.",
            email: "employ@gmail.com",
            password: "12345678",
            borderColor: "hover:border-[#dfcbaf]",
        },
        {
            title: "STANDARD USER",
            icon: <User className="w-5 h-5 text-[#dfcbaf]" />,
            desc: "Access to search prompts, copy prompts to clipboard, save to collections, leave reviews, and purchase premium access.",
            email: "seeker@gmail.com",
            password: "12345678",
            borderColor: "hover:border-[#2c221e]",
        },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-16 text-[#2c221e]">
            {/* Header Section */}
            <div className="text-center space-y-3 mb-12">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                    Demo <span className="text-[#4a3b35] underline decoration-[#dfcbaf]">Accounts</span>
                </h2>
                <p className="text-sm md:text-base text-[#2c221e]/70 max-w-xl mx-auto leading-relaxed">
                    Explore Alverse from different user perspectives. Copy credentials below and head over to the sign in page.
                </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {accounts.map((acc, index) => (
                    <div
                        key={index}
                        className={`bg-[#ebdcc9]/30 border border-[#dfcbaf] rounded-3xl p-6 flex flex-col justify-between shadow-sm backdrop-blur-sm transition-all duration-300 ${acc.borderColor} hover:shadow-md`}
                    >
                        <div className="space-y-5">
                            {/* Icon Container */}
                            <div className="w-10 h-10 rounded-xl bg-[#2c221e] flex items-center justify-center shadow-sm">
                                {acc.icon}
                            </div>

                            {/* Badge & Description */}
                            <div className="space-y-3">
                                <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-[#2c221e] text-[#ebdcc9] px-2.5 py-1 rounded-md">
                                    {acc.title}
                                </span>
                                <p className="text-xs md:text-sm text-[#2c221e]/80 leading-relaxed min-h-[72px]">
                                    {acc.desc}
                                </p>
                            </div>

                            {/* Credentials Fields */}
                            <div className="space-y-3 pt-2">
                                {/* Email Field */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#2c221e]/60">Email</label>
                                    <div className="flex items-center justify-between bg-[#ebdcc9]/50 border border-[#dfcbaf] rounded-xl px-3 py-2 text-xs font-mono">
                                        <span className="truncate pr-2">{acc.email}</span>
                                        <button
                                            onClick={() => handleCopy(acc.email)}
                                            className="text-[#2c221e]/60 hover:text-[#2c221e] transition-colors shrink-0"
                                            title="Copy Email"
                                        >
                                            {copiedText === acc.email ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#2c221e]/60">Password</label>
                                    <div className="flex items-center justify-between bg-[#ebdcc9]/50 border border-[#dfcbaf] rounded-xl px-3 py-2 text-xs font-mono">
                                        <span>{acc.password}</span>
                                        <button
                                            onClick={() => handleCopy(acc.password)}
                                            className="text-[#2c221e]/60 hover:text-[#2c221e] transition-colors shrink-0"
                                            title="Copy Password"
                                        >
                                            {copiedText === acc.password ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="pt-6">
                            <Link
                                href={`/login?email=${encodeURIComponent(acc.email)}&password=${encodeURIComponent(acc.password)}`}
                                className="w-full flex items-center justify-center gap-2 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-sm transition-all duration-200 transform active:scale-[0.98]"
                            >
                                <span>Go to Login</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}