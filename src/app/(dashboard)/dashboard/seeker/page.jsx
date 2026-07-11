import React from "react";
import DashboardHeader from "../../DashboardHeader";
import DashboardOverviewCard from "@/components/Dashboard/seeker/SeekerProfile";
import { getSeekerProfile } from "@/lib/api/seeker/data";
import { getUser } from "@/lib/session";

const EmployerMainPage = async () => {
    const user = await getUser();

    const profile = await getSeekerProfile(user.email);

    return (
        <div>
            <DashboardHeader
                title="Profile"
                subtitle="Manage your profile"
            />

            <DashboardOverviewCard
                user={user}
                profile={profile}
            />
        </div>
    );
};

export default EmployerMainPage;