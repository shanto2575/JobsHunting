import ApplicantsTable from "@/components/Dashboard/Employer/ApplicantsTable";
import { employerApplicants } from "@/lib/api/employer/data";
import { Building2 } from "lucide-react";

export default async function ApplicantsPage({ params }) {
    const { id } = await params;
    const data = await employerApplicants(id);
    // console.log(data)


    return (
        <div className="p-6  space-y-8">
            <div className="bg-gradient-to-r from-[#ebdcc9]/40 to-transparent p-6 rounded-2xl border border-[#dfcbaf]/30">
                <h2 className="text-2xl md:text-3xl font-black text-[#2c221e] tracking-tight">
                    {data.title}
                </h2>
                <div className="flex items-center gap-2 text-[#4a3b35]/80 font-semibold text-sm mt-2">
                    <Building2 size={16} className="text-[#2c221e]" />
                    <span>{data.company}</span>
                </div>
            </div>

            <ApplicantsTable
                applicants={data.applicants}
                jobId={data.jobId}
            />
        </div>
    );
}