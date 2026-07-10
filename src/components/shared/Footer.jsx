"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <footer className="w-full bg-[#ebdcc9] text-[#4a3b35] pt-12 pb-8">
            <motion.div
                className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 rounded-[2.5rem] bg-[#ebdcc9]"
                style={{
                    boxShadow: "12px 12px 24px #c9bcab, -12px -12px 24px #fffdf7"
                }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 items-start">

                    {/* Column 1: Brand Info */}
                    <motion.div variants={itemVariants} className="space-y-4 max-w-xs">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="text-2xl font-black tracking-tight uppercase transition duration-300 group flex items-center gap-1">
                                <span className="text-[#2c221e]">
                                    Jobs<span className="text-rose-700 font-serif italic font-normal lowercase tracking-normal">hunting</span>
                                </span>
                                <span className="inline-block text-rose-700 transition-transform duration-300 group-hover:animate-bounce text-base font-normal ml-0.5">
                                    ✦
                                </span>
                            </Link>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed opacity-80 font-medium">
                            Connecting talented professionals with top-tier companies. Build your career, find your dream job, or hire the perfect candidate with ease.
                        </p>
                    </motion.div>

                    {/* Column 2: Platform Links */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-[10px] font-black tracking-[0.2em] uppercase text-[#2c221e]">
                            Platform
                        </h3>
                        <ul className="space-y-3 text-xs sm:text-sm font-semibold opacity-85">
                            {[
                                { text: "Browse Jobs", href: "/jobs" },
                                { text: "Build Profile", href: "/dashboard/seeker/profile" },
                                { text: "Application Tracking", href: "/dashboard/seeker/applications" },
                                { text: "Bookmarked Jobs", href: "/dashboard/seeker/bookmarks" },
                                { text: "Demo User", href: "/DemoUser" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-rose-700 transition-colors duration-200 block">
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Resources Links */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-[10px] font-black tracking-[0.2em] uppercase text-[#2c221e]">
                            Resources
                        </h3>
                        <ul className="space-y-3 text-xs sm:text-sm font-semibold opacity-85">
                            {[
                                { text: "About Us", href: "/about" },
                                { text: "Privacy Policy", href: "/privacy" },
                                { text: "Terms of Service", href: "/terms" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-rose-700 transition-colors duration-200 block">
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 4: Connect & Support */}
                    <motion.div variants={itemVariants} className="space-y-5">
                        <h3 className="text-[10px] font-black tracking-[0.2em] uppercase text-[#2c221e]">
                            Connect
                        </h3>

                        {/* Neumorphic Social Icons Container */}
                        <div className="flex gap-4">
                            {[
                                { icon: <BsTwitterX size={14} />, href: "https://twitter.com" },
                                { icon: <FaGithub size={15} />, href: "https://github.com" },
                                { icon: <FaLinkedin size={15} />, href: "https://linkedin.com" },
                                { icon: <FaFacebookF size={14} />, href: "https://facebook.com" }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 bg-[#ebdcc9] text-[#2c221e] hover:text-rose-700"
                                    style={{
                                        boxShadow: "5px 5px 10px #c9bcab, -5px -5px 10px #fffdf7"
                                    }}
                                    whileHover={{ y: -2 }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>

                        {/* Neumorphic Support Box */}
                        <div 
                            className="p-3.5 rounded-2xl bg-[#ebdcc9] space-y-1"
                            style={{
                                boxShadow: "inset 4px 4px 8px #c9bcab, inset -4px -4px 8px #fffdf7"
                            }}
                        >
                            <span className="text-[9px] font-black tracking-widest uppercase opacity-60 block">
                                Questions? Support at:
                            </span>
                            <a
                                href="mailto:Help@jobshunting.com"
                                className="text-xs sm:text-sm font-black text-[#2c221e] hover:text-rose-700 transition-colors duration-200 block"
                            >
                                Help@jobshunting.com
                            </a>
                        </div>
                    </motion.div>

                </div>

                {/* Center Bottom Copyright Section */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 pt-6 text-center text-xs font-semibold opacity-80"
                    style={{
                        borderTop: "1px solid rgba(44, 34, 30, 0.08)"
                    }}
                >
                    <p>
                        &copy; {new Date().getFullYear()} JobsHunting. All rights reserved. Created with{" "}
                        <span className="text-rose-700">❤️</span> by{" "}
                        <span className="font-black text-[#2c221e]">Shanto Dev Sharma</span>
                    </p>
                </motion.div>
            </motion.div>
        </footer>
    );
}