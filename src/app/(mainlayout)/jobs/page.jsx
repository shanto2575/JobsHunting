import AllJobsPage from '@/components/AllJobsPage'
import { AllJobs } from '@/lib/api/seeker/data'
import React from 'react'

const JobsMainPage = async ({ searchParams }) => {
    const params = await searchParams;
    const jobs = await AllJobs(params);
    // console.log(jobs)
    return (
        <div className='w-full bg-[#f4ece1]'>
            <AllJobsPage job={jobs?.result || []} pagination={jobs.pagination}/>
        </div>
    )
}

export default JobsMainPage