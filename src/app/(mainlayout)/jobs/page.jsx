import AllJobsPage from '@/components/AllJobsPage'
import { AllJobs } from '@/lib/api/seeker/data'
import React from 'react'

const JobsMainPage =async () => {
const jobs=await AllJobs()
// console.log(jobs)
    return (
        <div className='w-full'>
            <AllJobsPage job={jobs?.result || []}/>
        </div>
    )
}

export default JobsMainPage