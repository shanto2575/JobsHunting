import AnalyticsCards from "@/components/Dashboard/admin/AnalyticsCards";
import JobChart from "@/components/Dashboard/admin/JobCharts";
import UserChart from "@/components/Dashboard/admin/UserChart";
import { AdminAnalytics } from "@/lib/api/admin/data";


export default async function AnalyticsPage() {
    const analytics = await AdminAnalytics();

    return (
        <div className="p-6 space-y-8">

            <div>
                <h1 className="text-3xl font-bold text-[#2c221e]">
                    Admin Analytics
                </h1>

                <p className="text-gray-500 mt-1">
                    Platform overview and statistics.
                </p>
            </div>

            <AnalyticsCards analytics={analytics} />

            <div className="grid lg:grid-cols-2 gap-6">

                <UserChart analytics={analytics} />

                <JobChart analytics={analytics} />

            </div>

        </div>
    );
}