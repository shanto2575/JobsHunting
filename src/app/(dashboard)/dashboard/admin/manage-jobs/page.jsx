import JobsTable from "@/components/Dashboard/admin/JobsTable";
import JobStatsCards from "@/components/Dashboard/admin/JobStatsCards";
import { AllJobs } from "@/lib/api/admin/data";

const ManageJobsPage = async () => {
    const jobs = await AllJobs();

    return (
        <div className="p-6 space-y-8">

            <div>
                <h1 className="text-3xl font-black text-[#2c221e]">
                    Manage Jobs
                </h1>

                <p className="text-gray-500 mt-2">
                    View, approve, reject and manage all job postings.
                </p>
            </div>

            <JobStatsCards jobs={jobs} />

            <JobsTable jobs={jobs} />

        </div>
    );
};

export default ManageJobsPage;