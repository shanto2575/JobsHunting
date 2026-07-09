"use client";

import { AddJobs } from "@/lib/api/employer/action";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/ImageUpload";
import { serverMutation } from "@/lib/server";
import { showToast } from "@/Util/toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function PostsJob() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const image = await imageUpload(data?.image[0]);
        try {
            const Jobs = {
                ...data,
                image: image.url,
                userEmail: user.email,
                userId: user?._id,
                applicants: [],
                status: "pending",
                createdAt: new Date()
            };
            const result = await AddJobs(Jobs);
            if (result.insertedId) {
                showToast.success('Jobs Post Successfully');
                setTimeout(() => {
                    router.replace('/dashboard/employer/posted-jobs');
                }, 1000);
            } else {
                showToast.error("Free users can post only 3 jobs. Upgrade to Pro for unlimited job posting.");
            }
        } catch (error) {
            console.log(error);
            showToast.error('Something went wrong');
        }
    };

    // Neumorphic Input & Label Styles
    const inputStyle =
        "w-full h-12 px-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] focus:outline-none placeholder-[#2c221e]/30 transition-all";

    const labelStyle =
        "flex flex-col gap-2 text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1";

    return (
        <div className="w-full max-w-6xl mx-auto rounded-[2.5rem] bg-[#f4ece1] p-8 md:p-10 shadow-[20px_20px_60px_#cfc8bf,-20px_-20px_60px_0.1] border border-[#ebdcc9]/40">
            
            {/* Header */}
            <div className="mb-8 pb-6 border-b border-[#ebdcc9]">
                <h2 className="text-2xl font-black text-[#2c221e] tracking-tight">
                    Post a New Job
                </h2>
                <p className="text-xs font-bold text-[#2c221e]/60 uppercase tracking-widest mt-1">
                    Fill in the details below to publish your job.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Job Title */}
                <label className={labelStyle}>
                    Job Title
                    <input
                        type="text"
                        placeholder="e.g. Frontend Developer"
                        {...register("title", { required: "Job title is required" })}
                        className={inputStyle}
                    />
                </label>

                {/* Company */}
                <label className={labelStyle}>
                    Company Name
                    <input
                        type="text"
                        placeholder="e.g. Google"
                        {...register("company", { required: "Company name is required" })}
                        className={inputStyle}
                    />
                </label>

                {/* Salary */}
                <label className={labelStyle}>
                    Salary
                    <input
                        type="number"
                        placeholder="e.g. 50000"
                        {...register("salary", { required: "Salary is required" })}
                        className={inputStyle}
                    />
                </label>

                {/* Location */}
                <label className={labelStyle}>
                    Location
                    <input
                        type="text"
                        placeholder="e.g. Dhaka, Bangladesh"
                        {...register("location", { required: "Location is required" })}
                        className={inputStyle}
                    />
                </label>

                {/* Job Type */}
                <label className={labelStyle}>
                    Job Type
                    <select
                        {...register("type", { required: "Job type is required" })}
                        className={`${inputStyle} appearance-none cursor-pointer`}
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
                    Experience Required
                    <input
                        type="text"
                        placeholder="e.g. 2 years"
                        {...register("experience", { required: "Experience is required" })}
                        className={inputStyle}
                    />
                </label>

                {/* Category */}
                <label className={`${labelStyle} md:col-span-2`}>
                    Category
                    <input
                        type="text"
                        placeholder="e.g. Frontend Development"
                        {...register("category", { required: "Category is required" })}
                        className={inputStyle}
                    />
                </label>

                {/* Description */}
                <label className={`${labelStyle} md:col-span-2`}>
                    Description
                    <textarea
                        rows={6}
                        placeholder="Write detailed job roles and responsibilities..."
                        {...register("description", { required: "Description is required" })}
                        className="w-full pl-4 pt-3.5 pr-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] focus:outline-none placeholder-[#2c221e]/30 resize-none"
                    />
                </label>

                {/* Deadline */}
                <label className={`${labelStyle} md:col-span-2`}>
                    Application Deadline
                    <input
                        type="date"
                        {...register("deadline", { required: "Deadline is required" })}
                        className={inputStyle}
                    />
                </label>

                {/* Job Image / Company Logo */}
                <label className={`${labelStyle} md:col-span-2`}>
                    Company Logo
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", { required: "Company logo is required" })}
                        className="block w-full rounded-2xl border border-[#ebdcc9]/20 bg-[#f4ece1] text-sm text-[#2c221e]/40 outline-none cursor-pointer shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] file:mr-4 file:rounded-xl file:border-0 file:bg-[#2c221e] file:px-5 file:py-3 file:text-[#ebdcc9] file:font-black file:text-xs file:uppercase file:tracking-wider file:cursor-pointer hover:file:opacity-90 file:transition-all"
                    />
                </label>

                {/* Submit Button */}
                <div className="md:col-span-2 pt-4">
                    <button
                        type="submit"
                        className="w-full h-12 rounded-2xl bg-[#2c221e] text-[#ebdcc9] text-xs font-black uppercase tracking-wider shadow-[4px_4px_12px_rgba(44,34,30,0.2),-4px_-4px_12px_#ffffff] hover:opacity-95 active:scale-[0.99] transition-all duration-200"
                    >
                        Publish Job
                    </button>
                </div>
            </form>
        </div>
    );
}