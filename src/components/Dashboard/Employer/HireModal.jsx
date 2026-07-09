"use client";

import { useState } from "react";
import { X } from "lucide-react";
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
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-3xl w-full max-w-xl">

                <div className="flex justify-between items-center p-6 border-b">

                    <h2 className="text-2xl font-bold">
                        Hiring Details
                    </h2>

                    <button onClick={() => setOpen(false)}>
                        <X />
                    </button>

                </div>

                <div className="p-6 space-y-4">

                    <input
                        type="date"
                        name="joiningDate"
                        onChange={handleChange}
                        className="border w-full rounded-xl p-3"
                    />

                    <input
                        type="time"
                        name="joiningTime"
                        onChange={handleChange}
                        className="border w-full rounded-xl p-3"
                    />

                    <input
                        type="text"
                        name="salary"
                        placeholder="Offered Salary"
                        onChange={handleChange}
                        className="border w-full rounded-xl p-3"
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Joining Office"
                        onChange={handleChange}
                        className="border w-full rounded-xl p-3"
                    />

                    <textarea
                        rows="4"
                        name="note"
                        placeholder="Additional Note"
                        onChange={handleChange}
                        className="border w-full rounded-xl p-3"
                    />

                </div>

                <div className="p-6 border-t flex justify-end">

                    <button
                        onClick={handleSave}
                        className="bg-[#2c221e] text-white px-8 py-3 rounded-xl"
                    >
                        {loading ? "Saving..." : "Hire Candidate"}
                    </button>

                </div>

            </div>

        </div>
    );
}