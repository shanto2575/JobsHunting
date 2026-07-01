"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { showToast } from "@/Util/toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const route=useRouter()
    const themeBg = "#ebdcc9";
    const textDark = "#2c221e";
    const textMuted = "#4a3b35";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const inputClass =
        "w-full h-12 px-4 text-sm font-semibold rounded-xl bg-white/40 border-[1.5px] border-[rgba(74,59,53,0.18)] text-[#2c221e] placeholder:text-[#4a3b35]/40 outline-none transition-all duration-200 hover:border-[rgba(74,59,53,0.35)] focus:border-[#2c221e] focus:bg-white";

    const errorClass = "text-red-500 text-xs mt-1";


    const onSubmit = async (e) => {
        const { data, error } = await authClient.signUp.email({
            email:e.email,
            password:e.password,
            name:e.name,
            image:e.image,
            role:e.role,
            callbackURL: "/" 
        })
        if(data){
            showToast.success('SignUp Successful')
            route.push('/')

        }
        if(error){
            showToast.error(error.message)
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col lg:flex-row"
            style={{ backgroundColor: themeBg }}
        >
            {/* Left */}
            <div className="hidden lg:flex flex-col justify-center w-1/2 p-20">
                <h1 className="text-5xl font-bold" style={{ color: textDark }}>
                    Start Your Career Journey
                </h1>

                <p className="mt-5" style={{ color: textMuted }}>
                    Create your account and unlock premium opportunities.
                </p>
            </div>

            {/* Right */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md p-8 rounded-3xl bg-white/40 border">
                    <div className="mb-8 text-center">
                        <h2
                            className="text-2xl font-black"
                            style={{ color: textDark }}
                        >
                            Create Account
                        </h2>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className={inputClass}
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                            {errors.name && (
                                <p className={errorClass}>{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className={inputClass}
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                            {errors.email && (
                                <p className={errorClass}>{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className={inputClass}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className={errorClass}>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Image */}
                        <div>
                            <input
                                type="text"
                                placeholder="Profile Image URL"
                                className={inputClass}
                                {...register("image")}
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <select
                                className={inputClass}
                                {...register("role", {
                                    required: "Role is required",
                                })}
                            >
                                <option value="">Select Role</option>
                                <option value="job_seeker">Job Seeker</option>
                                <option value="employer">Employer</option>
                            </select>

                            {errors.role && (
                                <p className={errorClass}>{errors.role.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            className="w-full h-12 rounded-xl font-bold text-sm"
                            style={{
                                backgroundColor: textDark,
                                color: themeBg,
                            }}
                        >
                            Create Account
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-xs">OR</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Google */}
                    <button
                        className="w-full h-12 rounded-xl border flex items-center justify-center gap-2"
                    >
                        <FcGoogle />
                        Continue with Google
                    </button>

                    {/* Footer */}
                    <p className="text-center text-xs mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="font-bold underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}