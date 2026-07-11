"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock3, Link2, MapPin, FileText } from "lucide-react";
import { showToast } from "@/Util/toast";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/lib/baseUrl";

export default function InterviewModal({
    open,
    setOpen,
    applicant,
    jobId,
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        type: "Online",
        meetingLink: "",
        address: "",
        note: "",
    });

    useEffect(() => {
        if (!open) {
            setFormData({
                date: "",
                time: "",
                type: "Online",
                meetingLink: "",
                address: "",
                note: "",
            });
        }
    }, [open]);

    if (!open || !applicant) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        if (!formData.date || !formData.time) {
            return showToast.error(
                "Interview date and time are required."
            );
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${baseUrl}/api/employer/applicants/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        jobId,
                        userId: applicant.userId,
                        status: "Interview",
                        interview: formData,
                    }),
                }
            );

            const result = await res.json();

            if (result.success) {
                showToast.success("Interview scheduled successfully.");
                setOpen(false);
                router.refresh();
            } else {
                showToast.error(result.message || 'Failed Interview Scheduled');
            }
        } catch (error) {
            console.log(error);
            showToast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#2c221e]/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">

            {/* Neumorphic Modal Main Container */}
            <div className="w-full max-w-2xl rounded-[2.5rem] bg-[#f4ece1] p-8 shadow-[20px_20px_60px_#cfc8bf,-20px_-20px_60px_0.1] border border-[#ebdcc9]/40 overflow-hidden">

                {/* Header Section */}
                <div className="flex justify-between items-center pb-6 mb-6 border-b border-[#ebdcc9]">
                    <div>
                        <h2 className="text-2xl font-black text-[#2c221e] tracking-tight">
                            Schedule Interview
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
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Date Input */}
                        <div>
                            <label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1">
                                Interview Date
                            </label>
                            <div className="relative mt-2">
                                <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-[#2c221e]/40" />
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Time Input */}
                        <div>
                            <label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1">
                                Interview Time
                            </label>
                            <div className="relative mt-2">
                                <Clock3 className="absolute left-4 top-3.5 w-5 h-5 text-[#2c221e]/40" />
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Interview Type Selection */}
                    <div>
                        <label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1">
                            Interview Type
                        </label>
                        <div className="relative mt-2">
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-bold border border-[#ebdcc9]/20 shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] focus:outline-none appearance-none cursor-pointer"
                            >
                                <option value="Online">Online Interview</option>
                                <option value="Offline">Offline / In-Person</option>
                            </select>
                        </div>
                    </div>

                    {/* Conditional Fields based on Type */}
                    {formData.type === "Online" ? (
                        <div>
                            <label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1">
                                Meeting Link
                            </label>
                            <div className="relative mt-2">
                                <Link2 className="absolute left-4 top-3.5 w-5 h-5 text-[#2c221e]/40" />
                                <input
                                    type="text"
                                    name="meetingLink"
                                    placeholder="Google Meet, Zoom, or Teams Link"
                                    value={formData.meetingLink}
                                    onChange={handleChange}
                                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] focus:outline-none placeholder-[#2c221e]/30"
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1">
                                Office Address
                            </label>
                            <div className="relative mt-2">
                                <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-[#2c221e]/40" />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter physical location or office address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[#f4ece1] text-[#2c221e] text-sm font-medium border border-[#ebdcc9]/20 shadow-[inset_4px_4px_8px_#cfc8bf,inset_-4px_-4px_8px_#ffffff] focus:outline-none placeholder-[#2c221e]/30"
                                />
                            </div>
                        </div>
                    )}

                    {/* Additional Note */}
                    <div>
                        <label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/80 pl-1">
                            Additional Instructions / Notes
                        </label>
                        <div className="relative mt-2">
                            <FileText className="absolute left-4 top-4 w-5 h-5 text-[#2c221e]/40" />
                            <textarea
                                rows={4}
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                placeholder="Add special instructions for the candidate..."
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

                    {/* Submit Button (Dark Accent) */}
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-8 h-12 rounded-2xl bg-[#2c221e] text-[#ebdcc9] text-xs font-black uppercase tracking-wider shadow-[4px_4px_10px_rgba(44,34,30,0.2),-4px_-4px_10px_#ffffff] hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all duration-200"
                    >
                        {loading ? "Scheduling..." : "Schedule Interview"}
                    </button>
                </div>

            </div>
        </div>
    );
}