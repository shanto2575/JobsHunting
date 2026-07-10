'use client';

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
            icon: <Shield className="w-5 h-5 text-rose-500" />,
            desc: "Access to system analytics, user management, prompt moderation, payment histories, and system configurations.",
            email: "admin@gmail.com",
            password: "12345678",
        },
        {
            title: "CREATOR USER",
            icon: <Sparkles className="w-5 h-5 text-rose-500" />,
            desc: "Access to creator analytics, adding new AI prompts, editing owned listings, and tracking prompt views.",
            email: "employ@gmail.com",
            password: "12345678",
        },
        {
            title: "STANDARD USER",
            icon: <User className="w-5 h-5 text-rose-500" />,
            desc: "Access to search prompts, copy prompts to clipboard, save to collections, leave reviews, and purchase premium access.",
            email: "seeker@gmail.com",
            password: "12345678",
        },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-16 text-[#2c221e]">
            {/* Header Section */}
            <div className="text-center space-y-3 mb-16">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
                    Demo <span className="text-rose-500 font-serif italic font-normal lowercase tracking-normal">Accounts</span>
                </h2>
                <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#2c221e]/60 max-w-xl mx-auto leading-relaxed">
                    Explore Alverse from different user perspectives. Copy credentials below and head over to the sign in page.
                </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {accounts.map((acc, index) => (
                    <div
                        key={index}
                        className="bg-[#ebdcc9] rounded-[2.5rem] p-7 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1"
                        style={{
                            boxShadow: "12px 12px 24px #c9bcab, -12px -12px 24px #fffdf7"
                        }}
                    >
                        <div className="space-y-6">
                            {/* Neumorphic Icon Container */}
                            <div 
                                className="w-12 h-12 rounded-2xl bg-[#ebdcc9] flex items-center justify-center transition-all duration-300"
                                style={{
                                    boxShadow: "inset 4px 4px 8px #c9bcab, inset -4px -4px 8px #fffdf7"
                                }}
                            >
                                {acc.icon}
                            </div>

                            {/* Badge & Description */}
                            <div className="space-y-3">
                                <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#2c221e] bg-[#ebdcc9] px-3 py-1.5 rounded-xl"
                                    style={{
                                        boxShadow: "3px 3px 6px #c9bcab, -3px -3px 6px #fffdf7"
                                    }}
                                >
                                    {acc.title}
                                </span>
                                <p className="text-xs md:text-sm text-[#2c221e]/70 font-medium leading-relaxed min-h-[72px] pt-2">
                                    {acc.desc}
                                </p>
                            </div>

                            {/* Credentials Fields */}
                            <div className="space-y-4 pt-2">
                                {/* Email Field */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-[#2c221e]/50 pl-1">Email</label>
                                    <div 
                                        className="flex items-center justify-between bg-[#ebdcc9] rounded-xl px-4 py-3 text-xs font-mono text-[#2c221e]"
                                        style={{
                                            boxShadow: "inset 5px 5px 10px #c9bcab, inset -5px -5px 10px #fffdf7"
                                        }}
                                    >
                                        <span className="truncate pr-2 font-bold">{acc.email}</span>
                                        <button
                                            onClick={() => handleCopy(acc.email)}
                                            className="text-[#2c221e]/50 hover:text-[#2c221e] transition-colors shrink-0 p-1"
                                            title="Copy Email"
                                        >
                                            {copiedText === acc.email ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-[#2c221e]/50 pl-1">Password</label>
                                    <div 
                                        className="flex items-center justify-between bg-[#ebdcc9] rounded-xl px-4 py-3 text-xs font-mono text-[#2c221e]"
                                        style={{
                                            boxShadow: "inset 5px 5px 10px #c9bcab, inset -5px -5px 10px #fffdf7"
                                        }}
                                    >
                                        <span className="font-bold">{acc.password}</span>
                                        <button
                                            onClick={() => handleCopy(acc.password)}
                                            className="text-[#2c221e]/50 hover:text-[#2c221e] transition-colors shrink-0 p-1"
                                            title="Copy Password"
                                        >
                                            {copiedText === acc.password ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="pt-8">
                            <Link
                                href={`/login?email=${encodeURIComponent(acc.email)}&password=${encodeURIComponent(acc.password)}`}
                                className="w-full flex items-center justify-center gap-2 bg-[#2c221e] hover:bg-[#3d2f2a] text-[#ebdcc9] py-3.5 rounded-xl font-black uppercase tracking-wider text-xs shadow-md transition-all duration-200 transform active:scale-[0.98] group"
                            >
                                <span>Go to Login</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-rose-400" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}