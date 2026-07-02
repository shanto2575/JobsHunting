import DashboardProfileCard from '@/components/Dashboard/Employer/EmployerProfile'
import React from 'react'
import DashboardHeader from '../../DashboardHeader'

const EmployerMainPage = () => {
    return (
        <div>
            <DashboardHeader title="Profile" subtitle="Manage your employer profile" />
            <DashboardProfileCard/>
        </div>
    )
}

export default EmployerMainPage