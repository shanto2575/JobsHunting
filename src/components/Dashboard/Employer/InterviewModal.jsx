"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock3, Link2, MapPin, FileText } from "lucide-react";
import { showToast } from "@/Util/toast";
import { useRouter } from "next/navigation";

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
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/employer/applicants/status`,
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
                showToast.error(result.message);
            }
        } catch (error) {
            console.log(error);
            showToast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">

            <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden">

                <div className="flex justify-between items-center px-8 py-5 border-b">

                    <div>
                        <h2 className="text-2xl font-black">
                            Schedule Interview
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {applicant.name}
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex justify-center items-center"
                    >
                        <X />
                    </button>
                </div>

                <div className="p-8 space-y-5">

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>
                            <label className="font-semibold text-sm">
                                Interview Date
                            </label>

                            <div className="relative mt-2">
                                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl pl-11 pr-4 h-12"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-semibold text-sm">
                                Interview Time
                            </label>

                            <div className="relative mt-2">
                                <Clock3 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl pl-11 pr-4 h-12"
                                />
                            </div>
                        </div>
                    </div>

                    <div>

                        <label className="font-semibold text-sm">
                            Interview Type
                        </label>

                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full mt-2 border rounded-xl h-12 px-4"
                        >
                            <option>Online</option>
                            <option>Offline</option>
                        </select>

                    </div>

                    {formData.type === "Online" ? (
                        <div>

                            <label className="font-semibold text-sm">
                                Meeting Link
                            </label>

                            <div className="relative mt-2">

                                <Link2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                                <input
                                    type="text"
                                    name="meetingLink"
                                    placeholder="Google Meet / Zoom Link"
                                    value={formData.meetingLink}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl pl-11 pr-4 h-12"
                                />

                            </div>

                        </div>
                    ) : (
                        <div>

                            <label className="font-semibold text-sm">
                                Office Address
                            </label>

                            <div className="relative mt-2">

                                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Office Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl pl-11 pr-4 h-12"
                                />

                            </div>

                        </div>
                    )}

                    <div>

                        <label className="font-semibold text-sm">
                            Additional Note
                        </label>

                        <div className="relative mt-2">

                            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

                            <textarea
                                rows={4}
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                placeholder="Any instructions..."
                                className="w-full border rounded-xl pl-11 pt-3 pr-4"
                            />

                        </div>

                    </div>

                </div>

                <div className="border-t px-8 py-5 flex justify-end gap-3">

                    <button
                        onClick={() => setOpen(false)}
                        className="px-6 h-11 rounded-xl border"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-8 h-11 rounded-xl bg-[#2c221e] text-white font-semibold"
                    >
                        {loading ? "Saving..." : "Schedule Interview"}
                    </button>

                </div>

            </div>

        </div>
    );
}