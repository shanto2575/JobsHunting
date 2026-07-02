import DashboardHeader from '@/app/(dashboard)/DashboardHeader'
import PostedJobsCard from '@/components/Dashboard/Employer/PostedJobsCard'
import { EmployerPostedJobs } from '@/lib/api/employer/data'
import { getUser } from '@/lib/session'
import Link from 'next/link'
import React from 'react'
import { FaCalendarPlus } from 'react-icons/fa'

const PostedJobs = async () => {
    const user = await getUser();
    // console.log(user,'ps')
    const PostedJobs = await EmployerPostedJobs(user?.email)
    // console.log(PostedJobs)
    return (
        <div>
            <DashboardHeader
                title="Posted Jobs"
                subtitle="Manage all your published jobs, applicants and job performance."
                action={
                    <Link
                        href="/dashboard/employer/post-job"
                        className="inline-flex items-center rounded-xl bg-[#2c221e] px-5 py-3 text-sm font-semibold text-[#ebdcc9] hover:opacity-90 transition gap-2"
                    >
                        <FaCalendarPlus />Post New Job
                    </Link>
                }
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {PostedJobs?.data?.length > 0 ? (
                    PostedJobs.data.map((job) => (
                        <PostedJobsCard key={job._id} job={job} />
                    ))
                ) : (
                    <div className="col-span-full flex items-center justify-center rounded-3xl border border-[#dfcbaf] bg-white/30 py-20">
                        <p className="text-[#4a3b35] font-semibold">
                            No jobs posted yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostedJobs