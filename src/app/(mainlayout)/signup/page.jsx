"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { showToast } from "@/Util/toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const route = useRouter();
    const themeBg = "#ebdcc9";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (e) => {
        const { data, error } = await authClient.signUp.email({
            email: e.email,
            password: e.password,
            name: e.name,
            image: e.image,
            role: e.role,
            callbackURL: "/" 
        });
        
        if (data) {
            showToast.success('SignUp Successful');
            route.push('/');
        }
        if (error) {
            showToast.error(error.message);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.1 }
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
        },
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center selection:bg-[#2c221e]/20 p-4 sm:p-6 relative overflow-hidden" style={{ backgroundColor: themeBg }}>
            
            {/* Ultra-Soft Ambient Lighting Orbs */}
            <div className="absolute top-[-15%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-white/50 blur-[150px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-[-15%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-[#dfcbaf]/70 blur-[130px] pointer-events-none animate-pulse-slow" />

            {/* Master Neumorphic Editorial Vessel */}
            <div className="w-full max-w-6xl mx-auto min-h-[820px] bg-[#ebdcc9] rounded-[48px] shadow-[30px_30px_60px_#c3b69e,-30px_-30px_60px_0.1] flex flex-col lg:flex-row overflow-hidden relative z-10 p-3 border border-white/30">
                
                {/* Left Section: Avant-Garde Minimal Branding */}
                <div className="hidden lg:flex flex-col justify-between w-5/12 p-20 rounded-[40px] bg-gradient-to-b from-white/25 via-white/5 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="max-w-xs my-auto space-y-8 relative z-10">
                        <div className="space-y-4">
                            <motion.span 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 0.4 }}
                                transition={{ duration: 0.6 }}
                                className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2c221e]"
                            >
                                Executive Network
                            </motion.span>
                            
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                                className="text-5xl font-light leading-[1.15] tracking-tight text-[#2c221e]"
                            >
                                Start your <br />
                                <span className="font-serif italic font-normal text-[#2c221e]/70 bg-gradient-to-r from-[#2c221e] to-[#4a3b35] bg-clip-text text-transparent">career journey</span>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.55 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xs leading-relaxed font-semibold text-[#2c221e] tracking-wide"
                        >
                            Create your corporate profile to unlock premium enterprise opportunities and tailored executive roles.
                        </motion.p>
                    </div>

                    <div className="flex items-center gap-2.5 text-[9px] font-black tracking-[0.25em] uppercase text-[#2c221e]/40">
                        <span>JobsHunting</span>
                        <span className="w-1 h-1 rounded-full bg-[#2c221e]/30"></span>
                        <span>Premium Studio</span>
                    </div>
                </div>

                {/* Right Section: Hyper-Styled Form Field Architecture */}
                <div className="flex-1 flex items-center justify-center p-8 sm:p-14 lg:p-20 relative">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full max-w-sm space-y-7"
                    >
                        {/* Header */}
                        <motion.div variants={fadeUp} className="space-y-2 text-center lg:text-left">
                            <h2 className="text-4xl font-black tracking-tight text-[#2c221e]">
                                Create Account
                            </h2>
                            <p className="text-xs font-bold text-[#2c221e]/45 tracking-wide">
                                Join the network and start exploring matching listings
                            </p>
                        </motion.div>

                        {/* Interactive Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            
                            {/* Full Name */}
                            <motion.div variants={fadeUp} className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#2c221e]/50 mb-2 px-1 group-focus-within:text-[#2c221e] transition-colors duration-300">
                                    Full Name
                                </label>
                                <div className="relative rounded-2xl bg-[#ebdcc9] shadow-[inset_5px_5px_10px_#c3b69e,inset_-5px_-5px_10px_#ffffff] p-[1px] transition-all duration-300 group-focus-within:shadow-[inset_3px_3px_6px_#c3b69e,inset_-3px_-3px_6px_#ffffff]">
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full h-13 px-5 text-xs font-bold rounded-2xl bg-transparent border-none text-[#2c221e] placeholder:text-[#2c221e]/25 outline-none transition-all duration-300"
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    <div className="absolute bottom-0 inset-x-5 h-[2px] bg-gradient-to-r from-transparent via-[#2c221e]/20 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                                </div>
                                {errors.name && (
                                    <span className="text-red-700 font-bold text-[11px] block mt-1.5 px-1 tracking-wide">
                                        {errors.name.message}
                                    </span>
                                )}
                            </motion.div>

                            {/* Email Address */}
                            <motion.div variants={fadeUp} className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#2c221e]/50 mb-2 px-1 group-focus-within:text-[#2c221e] transition-colors duration-300">
                                    Email Address
                                </label>
                                <div className="relative rounded-2xl bg-[#ebdcc9] shadow-[inset_5px_5px_10px_#c3b69e,inset_-5px_-5px_10px_#ffffff] p-[1px] transition-all duration-300 group-focus-within:shadow-[inset_3px_3px_6px_#c3b69e,inset_-3px_-3px_6px_#ffffff]">
                                    <input
                                        type="email"
                                        placeholder="name@domain.com"
                                        className="w-full h-13 px-5 text-xs font-bold rounded-2xl bg-transparent border-none text-[#2c221e] placeholder:text-[#2c221e]/25 outline-none transition-all duration-300"
                                        {...register("email", { required: "Email is required" })}
                                    />
                                    <div className="absolute bottom-0 inset-x-5 h-[2px] bg-gradient-to-r from-transparent via-[#2c221e]/20 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                                </div>
                                {errors.email && (
                                    <span className="text-red-700 font-bold text-[11px] block mt-1.5 px-1 tracking-wide">
                                        {errors.email.message}
                                    </span>
                                )}
                            </motion.div>

                            {/* Password */}
                            <motion.div variants={fadeUp} className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#2c221e]/50 mb-2 px-1 group-focus-within:text-[#2c221e] transition-colors duration-300">
                                    Password
                                </label>
                                <div className="relative rounded-2xl bg-[#ebdcc9] shadow-[inset_5px_5px_10px_#c3b69e,inset_-5px_-5px_10px_#ffffff] p-[1px] transition-all duration-300 group-focus-within:shadow-[inset_3px_3px_6px_#c3b69e,inset_-3px_-3px_6px_#ffffff]">
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full h-13 px-5 text-xs font-bold rounded-2xl bg-transparent border-none text-[#2c221e] placeholder:text-[#2c221e]/25 outline-none transition-all duration-300"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 6, message: "Minimum 6 characters" },
                                        })}
                                    />
                                    <div className="absolute bottom-0 inset-x-5 h-[2px] bg-gradient-to-r from-transparent via-[#2c221e]/20 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                                </div>
                                {errors.password && (
                                    <span className="text-red-700 font-bold text-[11px] block mt-1.5 px-1 tracking-wide">
                                        {errors.password.message}
                                    </span>
                                )}
                            </motion.div>

                            {/* Profile Image URL */}
                            <motion.div variants={fadeUp} className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#2c221e]/50 mb-2 px-1 group-focus-within:text-[#2c221e] transition-colors duration-300">
                                    Profile Image URL (Optional)
                                </label>
                                <div className="relative rounded-2xl bg-[#ebdcc9] shadow-[inset_5px_5px_10px_#c3b69e,inset_-5px_-5px_10px_#ffffff] p-[1px] transition-all duration-300 group-focus-within:shadow-[inset_3px_3px_6px_#c3b69e,inset_-3px_-3px_6px_#ffffff]">
                                    <input
                                        type="text"
                                        placeholder="https://example.com/avatar.jpg"
                                        className="w-full h-13 px-5 text-xs font-bold rounded-2xl bg-transparent border-none text-[#2c221e] placeholder:text-[#2c221e]/25 outline-none transition-all duration-300"
                                        {...register("image")}
                                    />
                                    <div className="absolute bottom-0 inset-x-5 h-[2px] bg-gradient-to-r from-transparent via-[#2c221e]/20 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                                </div>
                            </motion.div>

                            {/* Account Type Selection */}
                            <motion.div variants={fadeUp} className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#2c221e]/50 mb-2 px-1 group-focus-within:text-[#2c221e] transition-colors duration-300">
                                    Select Account Type
                                </label>
                                <div className="relative rounded-2xl bg-[#ebdcc9] shadow-[inset_5px_5px_10px_#c3b69e,inset_-5px_-5px_10px_#ffffff] p-[1px] transition-all duration-300 group-focus-within:shadow-[inset_3px_3px_6px_#c3b69e,inset_-3px_-3px_6px_#ffffff]">
                                    <select
                                        className="w-full h-13 px-5 text-xs font-bold rounded-2xl bg-transparent border-none text-[#2c221e] outline-none appearance-none transition-all duration-300 cursor-pointer"
                                        style={{ backgroundPosition: "calc(100% - 20px) center" }}
                                        {...register("role", { required: "Role is required" })}
                                    >
                                        <option value="" className="text-[#2c221e]/40 bg-[#ebdcc9]">Select Role</option>
                                        <option value="seeker" className="bg-[#ebdcc9]">Job Seeker</option>
                                        <option value="employer" className="bg-[#ebdcc9]">Employer</option>
                                    </select>
                                    <div className="absolute bottom-0 inset-x-5 h-[2px] bg-gradient-to-r from-transparent via-[#2c221e]/20 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                                </div>
                                {errors.role && (
                                    <span className="text-red-700 font-bold text-[11px] block mt-1.5 px-1 tracking-wide">
                                        {errors.role.message}
                                    </span>
                                )}
                            </motion.div>

                            {/* Solid Convex Submit Button */}
                            <motion.div variants={fadeUp} className="pt-3">
                                <motion.button
                                    whileHover={{ y: -1.5, scale: 1.005 }}
                                    whileTap={{ scale: 0.985 }}
                                    type="submit"
                                    className="relative w-full h-13 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-[#ebdcc9] bg-gradient-to-r from-[#2c221e] to-[#3a2e29] shadow-[8px_8px_20px_rgba(44,34,30,0.22),-4px_-4px_15px_rgba(255,255,255,0.5)] transition-all duration-300 overflow-hidden group/btn"
                                >
                                    <span className="relative z-10">Create Account</span>
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                </motion.button>
                            </motion.div>
                        </form>

                        {/* Grid Splitter */}
                        <motion.div variants={fadeUp} className="flex items-center gap-4 py-1">
                            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#2c221e]/15 to-transparent"></div>
                            <span className="text-[9px] font-black opacity-35 tracking-[0.3em] text-[#2c221e]">OR</span>
                            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#2c221e]/15 to-transparent"></div>
                        </motion.div>

                        {/* Extruded Google Button */}
                        <motion.button
                            variants={fadeUp}
                            whileHover={{ y: -1, shadow: "[6px_6px_12px_#c3b69e,-6px_-6px_12px_#ffffff]" }}
                            whileTap={{ scale: 0.985 }}
                            className="w-full h-13 rounded-2xl font-black text-xs flex items-center justify-center gap-3.5 bg-[#ebdcc9] border border-white/20 text-[#2c221e] shadow-[8px_8px_16px_#c3b69e,-8px_-8px_16px_#ffffff] transition-all duration-300 active:shadow-[inset_4px_4px_8px_#c3b69e,inset_-4px_-4px_8px_#ffffff]"
                        >
                            <FcGoogle size={20} className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]" />
                            <span className="tracking-[0.15em] uppercase text-[10px]">Continue with Google</span>
                        </motion.button>

                        {/* Footer Link */}
                        <motion.p variants={fadeUp} className="text-center text-xs font-bold text-[#2c221e]/45 pt-1">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-black text-[#2c221e] underline underline-offset-4 decoration-[#2c221e]/30 hover:text-[#2c221e]/80 transition-colors"
                            >
                                Sign In
                            </Link>
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}