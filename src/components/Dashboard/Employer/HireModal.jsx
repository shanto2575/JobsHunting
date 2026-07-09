"use client";

import { useState } from "react";
import { X, Calendar, Clock, DollarSign, MapPin, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { showToast } from "@/Util/toast";

export default function HireModal({
    open,
    setOpen,
    applicant,
    jobId,
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        joiningDate: "",
        joiningTime: "",
        salary: "",
        location: "",
        note: "",
    });

    if (!open || !applicant) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        if (!formData.joiningDate || !formData.salary) {
            return showToast.error("Please fill required fields");
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/employer/applicants/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        jobId,
                        userId: applicant.userId,
                        status: "Hired",
                        hiring: formData,
                    }),
                }
            );

            const result = await res.json();

            if (result.success) {
                showToast.success("Candidate hired successfully");
                setOpen(false);
                router.refresh();
            }
        } catch (err) {
            showToast.error("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-[#2c221e]/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">

            {/* Neumorphic Modal Main Container */}
            <div className="w-full max-w-xl rounded-[2.5rem] bg-[#f4ece1] p-8 shadow-[20px_20px_60px_#cfc8bf,-20px_-20px_60px_0.1] border border-[#ebdcc9]/40 overflow-hidden">

                {/* Header Section */}
                <div className="flex justify-between items-center pb-6 mb-6 border-b border-[#ebdcc9]">
                    <div>
                        <h2 className="text-2xl font-black text-[#2c221e] tracking-tight">
                            Hiring Details
                        </h2>
                        <p className="text-xs font-bold text-[#2c221e]/60 uppercase tracking-widest mt-1">
                            Candidate: {applicant.name}
                        </p>
                    </div>

                    {/* Neumorphic Close Button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="w-11 h-11 rounded-2xl bg-[#f4ece1] text-[#2c221e] flex justify-center items-center shadow-[4px_4px_10px_#cfc8bf,-4px_-4px_10px_#ffffff] hover:shadow-[inset_4px_4px_6px_#cfc8bf,inset_-4px_-4px_6px_#ffffff] active:scale-95 transition-all duration-200"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">

                    {/* Joining Date & Time Grid */}
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1">
                                Joining Date *
                            </label>
                            <div className="relative mt-2">
                                <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-[#2c221e]/40" />
                                <input
                                    type="date"
                                    name="joiningDate"
                                    value={formData.joiningDate}
                                    onChange={handleChange}
                                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1">
                                Joining Time
                            </label>
                            <div className="relative mt-2">
                                <Clock className="absolute left-4 top-3.5 w-5 h-5 text-[#2c221e]/40" />
                                <input
                                    type="time"
                                    name="joiningTime"
                                    value={formData.joiningTime}
                                    onChange={handleChange}
                                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Offered Salary */}
                    <div>
                        <label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1">
                            Offered Salary *
                        </label>
                        <div className="relative mt-2">
                            <DollarSign className="absolute left-4 top-3.5 w-5 h-5 text-[#2c221e]/40" />
                            <input
                                type="text"
                                name="salary"
                                placeholder="e.g. $5,000 / month"
                                value={formData.salary}
                                onChange={handleChange}
                                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] focus:outline-none placeholder-[#2c221e]/30"
                            />
                        </div>
                    </div>

                    {/* Joining Office Location */}
                    <div>
                        <label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1">
                            Joining Office / Location
                        </label>
                        <div className="relative mt-2">
                            <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-[#2c221e]/40" />
                            <input
                                type="text"
                                name="location"
                                placeholder="Headquarters, Remote, etc."
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] focus:outline-none placeholder-[#2c221e]/30"
                            />
                        </div>
                    </div>

                    {/* Additional Note */}
                    <div>
                        <label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1">
                            Additional Note
                        </label>
                        <div className="relative mt-2">
                            <FileText className="absolute left-4 top-4 w-5 h-5 text-[#2c221e]/40" />
                            <textarea
                                rows={4}
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                placeholder="Add any special onboarding instructions..."
                                className="w-full pl-12 pt-3.5 pr-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] focus:outline-none placeholder-[#2c221e]/30 resize-none"
                            />
                        </div>
                    </div>

                </div>

                {/* Footer Buttons Section */}
                <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-[#ebdcc9]">
                    {/* Cancel Button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="px-6 h-12 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-xs font-black uppercase tracking-wider shadow-[4px_4px_10px_#cfc8bf,-4px_-4px_10px_#ffffff] hover:shadow-[inset_4px_4px_6px_#cfc8bf,inset_-4px_-4px_6px_#ffffff] active:scale-95 transition-all duration-200"
                    >
                        Cancel
                    </button>

                    {/* Hire Button */}
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-8 h-12 rounded-2xl bg-[#2c221e] text-[#ebdcc9] text-xs font-black uppercase tracking-wider shadow-[4px_4px_10px_rgba(44,34,30,0.2),-4px_-4px_10px_#ffffff] hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all duration-200"
                    >
                        {loading ? "Saving..." : "Hire Candidate"}
                    </button>
                </div>

            </div>
        </div>
    );
}