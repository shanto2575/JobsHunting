import DashboardHeader from '@/app/(dashboard)/DashboardHeader'
import DashboardOverviewCard from '@/components/Dashboard/Employer/EmployerProfile'
import React from 'react'

const ProfilePage = () => {
    return (
        <div>
            <DashboardHeader title="Profile" subtitle="Manage your employer profile" />
            <DashboardOverviewCard />
        </div>

    )
}

export default ProfilePage