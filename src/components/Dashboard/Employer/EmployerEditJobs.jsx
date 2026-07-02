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
    const router=useRouter()

    const { data: session } = authClient.useSession()
    // console.log(session)
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
    // console.log(job)

    const onSubmit = async (data) => {
        try {
            const result = await UpdatedJobs(data, job._id)

            if(result.success){
                showToast.success('UpDated Successfull')
                setIsOpen(false);
                router.refresh()
            }else{
                showToast.error(result.message)
            }
        } catch (error) {
            console.log('errer',error)
            showToast.error('Something Went Wrong')
        }
    };



    const inputStyle =
        "w-full rounded-xl border border-[#dfcbaf] bg-white/50 px-4 py-3 text-sm outline-none focus:border-[#2c221e] transition-all text-[#2c221e]";

    const labelStyle =
        "flex flex-col gap-2 text-sm font-semibold text-[#2c221e]";

    const errorStyle = "text-xs font-bold text-red-600 mt-0.5";

    return (
        <div className="w-full flex-1">
            <Button
                onClick={() => setIsOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2c221e] py-3 text-xs uppercase tracking-wider font-bold text-[#ebdcc9] transition-all duration-300 hover:bg-[#4a3b35] active:scale-[0.98] px-6 shadow-sm h-auto"
            >
                <Pencil size={14} strokeWidth={2.5} />
                Edit
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop className="bg-[#2c221e]/40 backdrop-blur-md">
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-5xl border border-[#dfcbaf] bg-[#ebdcc9] text-[#2c221e] rounded-3xl p-2 max-h-[90vh] overflow-y-auto">
                            <Modal.CloseTrigger className="hover:bg-[#2c221e]/10 text-[#2c221e]" />

                            <Modal.Header className="flex flex-col gap-1 pt-6 px-6 border-none">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 rounded-xl bg-[#2c221e] text-[#ebdcc9]">
                                        <Pencil size={18} />
                                    </div>
                                    <div>
                                        <Modal.Heading className="text-xl font-black tracking-tight text-[#2c221e]">
                                            Edit Position
                                        </Modal.Heading>
                                        <p className="text-xs font-semibold text-[#4a3b35]/70 mt-0.5 normal-case">
                                            Modify the job details below.
                                        </p>
                                    </div>
                                </div>
                            </Modal.Header>

                            <Modal.Body className="py-2 px-6">
                                <Surface variant="default" className="bg-transparent shadow-none border-none p-0">
                                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">

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
                                                className={inputStyle}
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
                                                className={`${inputStyle} resize-none`}
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

                                        {/* Submit Button */}
                                        <div className="md:col-span-2 pt-4 pb-4 flex justify-end gap-3">
                                            <Button
                                                type="button"
                                                onClick={() => setIsOpen(false)}
                                                className="h-12 px-6 rounded-xl font-bold text-xs uppercase tracking-wider border border-[#dfcbaf] text-[#2c221e] bg-transparent hover:bg-[#2c221e]/5 transition"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="h-12 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#2c221e] text-[#ebdcc9] hover:bg-[#4a3b35] shadow-sm transition"
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