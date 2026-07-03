import React from 'react'
import DashboardHeader from '../../DashboardHeader'
import DashboardOverviewCard from '@/components/Dashboard/seeker/SeekerProfile'

const EmployerMainPage = () => {
    return (
        <div>
            <DashboardHeader title="Profile" subtitle="Manage your employer profile" />
            <DashboardOverviewCard/>
        </div>
    )
}

export default EmployerMainPage