"use client";

import { AddJobs } from "@/lib/api/employer/action";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/ImageUpload";
import { serverMutation } from "@/lib/server";
import { showToast } from "@/Util/toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function PostsJob() {
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const user = session?.user;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        const image = await imageUpload(data?.image[0])
        // console.log(image,'image')
        // console.log(data,'data')
        try {
            const Jobs = {
                ...data,
                image: image.url,
                userEmail: user.email,
                userId: user?._id,
                applicants: [],
                status: "active",
                createdAt: new Date()
            }
            const result = await AddJobs(Jobs)
            // console.log(result)
            if (result.insertedId) {
                showToast.success('Jobs Post Successfully')
                setTimeout(() => {
                    router.replace('/dashboard/employer/posted-jobs')
                }, 1000)
            } else {
                showToast.error("Failed To Create Job");
            }
        } catch (error) {
            console.log(error)
            showToast.error('Something went wrong')
        }
    };

    const inputStyle =
        "w-full rounded-xl border border-[#dfcbaf] bg-white/50 px-4 py-3 text-sm outline-none focus:border-[#2c221e] transition-all";

    const labelStyle =
        "flex flex-col gap-2 text-sm font-semibold text-[#2c221e]";

    return (
        <div className="w-full max-w-6xl mx-auto rounded-3xl border border-[#dfcbaf] bg-white/20 backdrop-blur-xl p-8 shadow-[0_20px_40px_-15px_rgba(44,34,30,0.08)]">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-black text-[#2c221e]">
                    Post a New Job
                </h2>
                <p className="text-sm text-[#4a3b35] mt-2">
                    Fill in the details below to publish your job.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2  gap-5 ">

                {/* Job Title */}
                <label className={labelStyle}>
                    Job Title
                    <input
                        type="text"
                        placeholder="Frontend Developer"
                        {...register("title", { required: "Job title is required" })}
                        className={inputStyle}
                    />
                </label>

                {/* Company */}
                <label className={labelStyle}>
                    Company
                    <input
                        type="text"
                        placeholder="Google"
                        {...register("company", { required: "Company name is required" })}
                        className={inputStyle}
                    />
                </label>

                {/* Salary */}
                <label className={labelStyle}>
                    Salary
                    <input
                        type="number"
                        placeholder="50000"
                        {...register("salary", { required: "Salary is required" })}
                        className={inputStyle}
                    />
                </label>

                {/* Location */}
                <label className={labelStyle}>
                    Location
                    <input
                        type="text"
                        placeholder="Dhaka"
                        {...register("location", { required: "Location is required" })}
                        className={inputStyle}
                    />
                </label>

                {/* Job Type */}
                <label className={labelStyle}>
                    Job Type
                    <select
                        {...register("type", { required: "Job type is required" })}
                        className={inputStyle}
                    >
                        <option value="">Select Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Remote">Remote</option>
                        <option value="Internship">Internship</option>
                    </select>
                </label>

                {/* Experience */}
                <label className={labelStyle}>
                    Experience
                    <input
                        type="text"
                        placeholder="2 years"
                        {...register("experience", {
                            required: "Experience is required",
                        })}
                        className={inputStyle}
                    />
                </label>

                {/* Category */}
                <label className={`${labelStyle} md:col-span-2`}>
                    Category
                    <input
                        type="text"
                        placeholder="Frontend Development"
                        {...register("category", {
                            required: "Category is required",
                        })}
                        className={inputStyle}
                    />
                </label>
                {/* Description */}
                <label className={`${labelStyle} md:col-span-2`}>
                    Description
                    <textarea
                        rows={6}
                        placeholder="Write job details..."
                        {...register("description", {
                            required: "Description is required",
                        })}
                        className={`${inputStyle} resize-none`}
                    />
                </label>

                {/* Deadline */}
                <label className={`${labelStyle} md:col-span-2`}>
                    Deadline
                    <input
                        type="date"
                        {...register("deadline", {
                            required: "Deadline is required",
                        })}
                        className={inputStyle}
                    />
                </label>
                {/* Job Image / Company Logo */}
                <label className={`${labelStyle} md:col-span-2`}>
                    Company Logo
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", {
                            required: "Company logo is required",
                        })}
                        className="block w-full rounded-xl border border-[#dfcbaf] bg-white/50 px-4 py-3 text-sm text-[#2c221e] outline-none cursor-pointer
                    file:mr-4 file:rounded-lg file:border-0 file:bg-[#2c221e]
                    file:px-4 file:py-2 file:text-[#ebdcc9] file:font-medium"
                    />
                </label>

                {/* Submit Button */}
                <div className="md:col-span-2 pt-2">
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-[#2c221e] text-[#ebdcc9] py-3 font-semibold hover:opacity-90 transition-all"
                    >
                        Publish Job
                    </button>
                </div>
            </form>
        </div>
    );
}