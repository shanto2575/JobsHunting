import DashboardHeader from '@/app/(dashboard)/DashboardHeader'
import AdminDashboardOverviewCard from '@/components/Dashboard/admin/AdminProfile'
import DashboardOverviewCard from '@/components/Dashboard/Employer/EmployerProfile'
import React from 'react'

const ProfilePage = () => {
    return (
        <div>
            <DashboardHeader title="Profile" subtitle="Manage your employer profile" />
            {/* <DashboardOverviewCard /> */}
            <AdminDashboardOverviewCard/>
        </div>

    )
}

export default ProfilePage