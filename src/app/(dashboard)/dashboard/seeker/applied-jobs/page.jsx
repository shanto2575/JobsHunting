import DashboardHeader from '@/app/(dashboard)/DashboardHeader'
import NotFound from '@/app/(mainlayout)/jobs/[id]/not-found'
import AppliedJobsCard from '@/components/Dashboard/seeker/AppliedJobsCard'
import NoAppliedJobs from '@/components/Dashboard/seeker/NoAppliedJobs'
import { AppliedJobs } from '@/lib/api/seeker/data'
import { getUser } from '@/lib/session'
import React from 'react'

const appliedJobs = async () => {
    const user = await getUser()
    // console.log(user)
    const applied = await AppliedJobs(user?.email)
    // console.log(applied)
    if (!applied?.result || applied.result.length === 0) {
        return <NoAppliedJobs />;
    }

    return (
        <div>
            <DashboardHeader title='Applied Jobs' subtitle='This is your Applied jobs' />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applied?.result?.map((job) => (
                    <AppliedJobsCard key={job._id} job={job} />
                ))}
            </div>
        </div>
    )
}

export default appliedJobs