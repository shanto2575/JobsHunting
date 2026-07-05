"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { showToast } from "@/Util/toast";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const route = useRouter()
    const themeBg = "#ebdcc9";
    const textDark = "#2c221e";
    const textMuted = "#4a3b35";

    const inputClass = "w-full h-12 px-4 text-sm font-semibold rounded-xl bg-white/40 border-[1.5px] border-[rgba(74,59,53,0.18)] text-[#2c221e] placeholder:text-[#4a3b35]/40 outline-none transition-all duration-200 hover:border-[rgba(74,59,53,0.35)] focus:border-[#2c221e] focus:bg-white";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const onSubmit = async (e) => {
    //     const { data, error } = await authClient.signIn.email({
    //         email:e.email,
    //         password:e.password,
    //         callbackURL: "/"
    //     })
    //     if(data){
    //         showToast.success('LogIn Successful')
    //         route.push('/')
    //     }
    //     if(error){
    //         showToast.error(error.message)
    //     }
    // };

    const onSubmit = async (e) => {

        const statusRes = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-status/${e.email}`
        );

        const statusData = await statusRes.json();

        if (statusData.status === "blocked") {
            return showToast.error("Your account has been blocked.");
        }

        const { data, error } = await authClient.signIn.email({
            email: e.email,
            password: e.password,
            callbackURL: "/",
        });

        if (error) {
            return showToast.error(error.message);
        }

        showToast.success("Login Successful");
        route.push("/");
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div
            className="min-h-screen flex flex-col lg:flex-row selection:bg-[#2c221e]/10 overflow-x-hidden"
            style={{ backgroundColor: themeBg }}
        >
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-20 relative overflow-hidden">
                <div className="max-w-md my-auto space-y-5">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl font-extrabold leading-[1.15] tracking-tight text-[#2c221e]"
                    >
                        Find Your <br />
                        <span className="opacity-85 font-serif italic font-normal">Dream Job Today</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="text-base leading-relaxed font-medium opacity-80"
                        style={{ color: textMuted }}
                    >
                        Connect with top companies and explore thousands of opportunities tailored exactly to your skills.
                    </motion.p>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-xs font-semibold"
                    style={{ color: textMuted }}
                >
                    &copy; {new Date().getFullYear()} JobsHunting. Premium Platform.
                </motion.p>
            </div>

            <div className="flex-1 w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md p-8 md:p-10 rounded-3xl border"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        borderColor: "rgba(74, 59, 53, 0.12)",
                        boxShadow: "0 20px 40px -15px rgba(44, 34, 30, 0.05)"
                    }}
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="mb-8 text-center"
                    >
                        <h2 className="text-2xl font-black tracking-tight" style={{ color: textDark }}>
                            Welcome Back
                        </h2>

                        <p className="text-sm mt-2 font-medium opacity-80" style={{ color: textMuted }}>
                            Sign in to continue your journey
                        </p>
                    </motion.div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <motion.div variants={fadeUp} initial="hidden" animate="visible">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className={inputClass}
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-600 text-xs mt-1.5 font-semibold px-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </motion.div>

                        <motion.div variants={fadeUp} initial="hidden" animate="visible">
                            <input
                                type="password"
                                placeholder="Password"
                                className={inputClass}
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-600 text-xs mt-1.5 font-semibold px-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </motion.div>

                        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="pt-2">
                            <motion.button
                                whileHover={{ scale: 1.01, opacity: 0.95 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                className="w-full h-12 rounded-xl font-bold text-sm shadow-sm transition-all duration-150"
                                style={{ backgroundColor: textDark, color: themeBg }}
                            >
                                Sign In
                            </motion.button>
                        </motion.div>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-[#4a3b35]/15"></div>
                        <span className="text-xs font-bold opacity-40 tracking-widest" style={{ color: textMuted }}>OR</span>
                        <div className="flex-1 h-px bg-[#4a3b35]/15"></div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 bg-white/40 transition-all border-[1.5px]"
                        style={{ borderColor: "rgba(74, 59, 53, 0.18)", color: textDark }}
                    >
                        <FcGoogle size={18} />
                        Continue with Google
                    </motion.button>

                    <p className="text-center text-xs font-semibold mt-6 opacity-90" style={{ color: textMuted }}>
                        Don’t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-bold underline underline-offset-4 hover:opacity-80 transition-opacity"
                            style={{ color: textDark }}
                        >
                            Sign Up
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}