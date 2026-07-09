"use client";

import { useState, useEffect } from "react";
import { Button, Modal, Surface } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { UpdatedJobs } from "@/lib/api/employer/action";
import { authClient } from "@/lib/auth-client";
import { showToast } from "@/Util/toast";
import { useRouter } from "next/navigation";

export function EmployerEditJobs({ job }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const { data: session } = authClient.useSession();
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: job?.title || "",
            company: job?.company || "",
            salary: job?.salary || "",
            location: job?.location || "",
            type: job?.type || "",
            experience: job?.experience || "",
            category: job?.category || "",
            description: job?.description || "",
            deadline: job?.deadline || "",
        }
    });

    useEffect(() => {
        if (job) {
            reset(job);
        }
    }, [job, reset]);

    const onSubmit = async (data) => {
        try {
            const result = await UpdatedJobs(data, job._id);

            if (result.success) {
                showToast.success('Updated Successfully');
                setIsOpen(false);
                router.refresh();
            } else {
                showToast.error(result.message);
            }
        } catch (error) {
            console.log('error', error);
            showToast.error('Something Went Wrong');
        }
    };

    // Soft 0.1 Intensity Neumorphic Input Style (Inset Shadow)
    const inputStyle =
        "w-full h-12 px-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_3px_3px_6px_rgba(207,200,191,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] focus:outline-none placeholder-[#2c221e]/30 transition-all";

    const labelStyle =
        "flex flex-col gap-2 text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1";

    const errorStyle = "text-xs font-bold text-red-600 mt-0.5 pl-1";

    return (
        <div className="w-full flex-1">
            {/* Main Trigger Button */}
            <Button
                onClick={() => setIsOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#2c221e] py-3 text-xs uppercase tracking-wider font-black text-[#ebdcc9] transition-all duration-300 shadow-[4px_4px_10px_rgba(44,34,30,0.1),-4px_-4px_10px_#ffffff] hover:opacity-90 active:scale-[0.98] px-6 h-12"
            >
                <Pencil size={14} strokeWidth={2.5} />
                Edit
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop className="bg-[#2c221e]/20 backdrop-blur-sm">
                    <Modal.Container placement="auto">
                        {/* Soft Neumorphic Modal Box (Shadow intensity ~ 0.1) */}
                        <Modal.Dialog className="sm:max-w-5xl bg-[#f4ece1] text-[#2c221e] rounded-[2.5rem] p-4 max-h-[90vh] overflow-y-auto shadow-[15px_15px_40px_rgba(207,200,191,0.4),-15px_-15px_40px_rgba(255,255,255,0.1)] border border-[#ebdcc9]/40">
                            
                            <Modal.CloseTrigger className="w-9 h-9 rounded-xl bg-[#f4ece1] hover:bg-[#2c221e]/5 text-[#2c221e] shadow-[2px_2px_5px_rgba(207,200,191,0.4),-2px_-2px_5px_#ffffff] active:scale-95 transition-all top-4 right-4" />

                            {/* Modal Header */}
                            <Modal.Header className="flex flex-col gap-1 pt-6 px-6 border-b border-[#ebdcc9]/40 mb-6 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-2xl bg-[#f4ece1] text-[#2c221e] flex justify-center items-center shadow-[3px_3px_6px_rgba(207,200,191,0.4),-3px_-3px_6px_#ffffff]">
                                        <Pencil size={16} />
                                    </div>
                                    <div>
                                        <Modal.Heading className="text-2xl font-black tracking-tight text-[#2c221e]">
                                            Edit Position
                                        </Modal.Heading>
                                        <p className="text-xs font-bold text-[#2c221e]/60 uppercase tracking-widest mt-0.5">
                                            Modify the job details below.
                                        </p>
                                    </div>
                                </div>
                            </Modal.Header>

                            {/* Modal Body / Form */}
                            <Modal.Body className="py-1 px-6">
                                <Surface variant="default" className="bg-transparent shadow-none border-none p-0">
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
                                            {errors.title && <span className={errorStyle}>{errors.title.message}</span>}
                                        </label>

                                        {/* Company */}
                                        <label className={labelStyle}>
                                            Company
                                            <input
                                                type="text"
                                                placeholder="e.g. Google"
                                                {...register("company", { required: "Company name is required" })}
                                                className={inputStyle}
                                            />
                                            {errors.company && <span className={errorStyle}>{errors.company.message}</span>}
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
                                            {errors.salary && <span className={errorStyle}>{errors.salary.message}</span>}
                                        </label>

                                        {/* Location */}
                                        <label className={labelStyle}>
                                            Location
                                            <input
                                                type="text"
                                                placeholder="e.g. Dhaka"
                                                {...register("location", { required: "Location is required" })}
                                                className={inputStyle}
                                            />
                                            {errors.location && <span className={errorStyle}>{errors.location.message}</span>}
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
                                            {errors.type && <span className={errorStyle}>{errors.type.message}</span>}
                                        </label>

                                        {/* Experience */}
                                        <label className={labelStyle}>
                                            Experience
                                            <input
                                                type="text"
                                                placeholder="e.g. 2 years"
                                                {...register("experience", { required: "Experience is required" })}
                                                className={inputStyle}
                                            />
                                            {errors.experience && <span className={errorStyle}>{errors.experience.message}</span>}
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
                                            {errors.category && <span className={errorStyle}>{errors.category.message}</span>}
                                        </label>

                                        {/* Description */}
                                        <label className={`${labelStyle} md:col-span-2`}>
                                            Description
                                            <textarea
                                                rows={5}
                                                placeholder="Write job details here..."
                                                {...register("description", { required: "Description is required" })}
                                                className="w-full pl-4 pt-3.5 pr-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_3px_3px_6px_rgba(207,200,191,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] focus:outline-none placeholder-[#2c221e]/30 resize-none"
                                            />
                                            {errors.description && <span className={errorStyle}>{errors.description.message}</span>}
                                        </label>

                                        {/* Deadline */}
                                        <label className={`${labelStyle} md:col-span-2`}>
                                            Deadline
                                            <input
                                                type="date"
                                                {...register("deadline", { required: "Deadline is required" })}
                                                className={inputStyle}
                                            />
                                            {errors.deadline && <span className={errorStyle}>{errors.deadline.message}</span>}
                                        </label>

                                        {/* Actions Footer Inside Form */}
                                        <div className="md:col-span-2 pt-4 pb-2 flex justify-end gap-4 border-t border-[#ebdcc9]/40 mt-4">
                                            <Button
                                                type="button"
                                                onClick={() => setIsOpen(false)}
                                                className="h-12 px-6 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-xs font-black uppercase tracking-wider shadow-[3px_3px_6px_rgba(207,200,191,0.4),-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_5px_rgba(207,200,191,0.4),inset_-3px_-3px_5px_#ffffff] active:scale-95 transition-all duration-200"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="h-12 px-8 rounded-2xl bg-[#2c221e] text-[#ebdcc9] text-xs font-black uppercase tracking-wider shadow-[3px_3px_8px_rgba(44,34,30,0.15),-3px_-3px_8px_#ffffff] hover:opacity-95 active:scale-95 transition-all duration-200"
                                            >
                                                Save Changes
                                            </Button>
                                        </div>
                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
}