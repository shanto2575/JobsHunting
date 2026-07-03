"use client";

import { authClient } from "@/lib/auth-client";
import { showToast } from "@/Util/toast";
import { ShieldAlert, Send } from "lucide-react";

export default function ApplyJobCard({ job }) {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    console.log(user)

    const handleApply = async () => {

        showToast.success("Application Submitted Successfully");
    };

    return (
        <div className="sticky top-24 rounded-[2rem] border border-[#dfcbaf] bg-white/60 backdrop-blur-xl p-6 shadow-lg">
            <h3 className="text-2xl font-black text-[#2c221e] mb-4">
                Quick Apply
            </h3>

            {user?.role === "seeker" ? (
                <>
                    <p className="text-sm text-[#4a3b35] leading-relaxed mb-6">
                        Ready to join <strong>{job.company}</strong>? Submit your
                        application now.
                    </p>

                    <button
                        onClick={handleApply}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#2c221e] py-4 text-[#ebdcc9] font-bold hover:opacity-90 transition"
                    >
                        <Send size={18} />
                        Apply Now
                    </button>
                </>
            ) : (
                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-5 text-center">
                    <ShieldAlert className="mx-auto mb-3 text-rose-600" size={28} />
                    <p className="text-sm font-semibold text-rose-700">
                        Employers cannot apply for jobs.
                    </p>
                </div>
            )}
        </div>
    );
}