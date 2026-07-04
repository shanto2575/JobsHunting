import DashboardHeader from '@/app/(dashboard)/DashboardHeader'
import AppliedJobsCard from '@/components/Dashboard/seeker/AppliedJobsCard'
import { AppliedJobs } from '@/lib/api/seeker/data'
import { getUser } from '@/lib/session'
import React from 'react'

const appliedJobs = async () => {
    const user = await getUser()
    // console.log(user)
    const applied = await AppliedJobs(user?.email)
    console.log(applied)
    return (
        <div>
            <DashboardHeader title='Applied Jobs' subtitle='This is your Applied jobs'/>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applied?.result?.map((job) => (
                    <AppliedJobsCard key={job._id} job={job} />
                ))}
            </div>
        </div>
    )
}

export default appliedJobs