import { EmployerAnalytics } from "@/lib/api/employer/data";
import { getUser } from "@/lib/session";
import AnalyticsCard from "@/components/Dashboard/Employer/AnalyticsCard";
import ApplicantsChart from "@/components/Dashboard/Employer/ApplicantsChart";
import JobChart from "@/components/Dashboard/Employer/JobChart";
import { BarChart3, TrendingUp } from "lucide-react";

export default async function AnalyticsPage() {
    const user = await getUser();

    const analytics = await EmployerAnalytics(user.email);

    return (
        <div className="space-y-8 p-6">

            {/* Header */}
            <div className="bg-gradient-to-r from-[#2c221e] to-[#5a473d] rounded-3xl p-8 text-white shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <BarChart3 className="w-9 h-9 text-[#ebdcc9]" />
                            <h1 className="text-3xl font-black">
                                Employer Analytics
                            </h1>
                        </div>

                        <p className="text-[#ebdcc9] max-w-2xl">
                            Monitor your job postings, applicant activity, and
                            hiring progress with real-time analytics and
                            insights.
                        </p>
                    </div>

                    <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-white/10">
                        <TrendingUp className="w-10 h-10 text-[#ebdcc9]" />
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <AnalyticsCard analytics={analytics} />

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
                <ApplicantsChart analytics={analytics} />
                <JobChart analytics={analytics} />
            </div>

        </div>
    );
}