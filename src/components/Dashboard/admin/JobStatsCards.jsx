import {
    BriefcaseBusiness,
    Clock3,
    BadgeCheck,
    XCircle,
} from "lucide-react";

export default function JobStatsCards({ jobs }) {

    const totalJobs = jobs.length;

    const pendingJobs = jobs.filter(
        (job) => job.status === "pending"
    ).length;

    const approvedJobs = jobs.filter(
        (job) => job.status === "approved"
    ).length;

    const rejectedJobs = jobs.filter(
        (job) => job.status === "rejected"
    ).length;

    const cards = [
        {
            title: "Total Jobs",
            value: totalJobs,
            icon: BriefcaseBusiness,
            bg: "bg-blue-50",
            text: "text-blue-700",
        },
        {
            title: "Pending Jobs",
            value: pendingJobs,
            icon: Clock3,
            bg: "bg-yellow-50",
            text: "text-yellow-700",
        },
        {
            title: "Approved Jobs",
            value: approvedJobs,
            icon: BadgeCheck,
            bg: "bg-green-50",
            text: "text-green-700",
        },
        {
            title: "Rejected Jobs",
            value: rejectedJobs,
            icon: XCircle,
            bg: "bg-red-50",
            text: "text-red-700",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card, index) => {

                const Icon = card.icon;

                return (

                    <div
                        key={index}
                        className="bg-white/60 rounded-3xl border border-[#ebe3d7] shadow-sm p-6 hover:shadow-md transition"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    {card.title}
                                </p>

                                <h2 className="text-4xl font-black text-[#2c221e] mt-3">
                                    {card.value}
                                </h2>

                            </div>

                            <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.bg}`}
                            >
                                <Icon
                                    className={card.text}
                                    size={28}
                                />
                            </div>

                        </div>

                    </div>

                );

            })}

        </div>
    );
}