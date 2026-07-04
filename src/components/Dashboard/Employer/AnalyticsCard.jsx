"use client";

import {
    Briefcase,
    Users,
    CheckCircle,
    XCircle
} from "lucide-react";

export default function AnalyticsCard({ analytics }) {

    const cards = [

        {
            title: "Total Jobs",
            value: analytics.totalJobs,
            icon: Briefcase
        },

        {
            title: "Applicants",
            value: analytics.totalApplicants,
            icon: Users
        },

        {
            title: "Hired",
            value: analytics.hired,
            icon: CheckCircle
        },

        {
            title: "Closed Jobs",
            value: analytics.closedJobs,
            icon: XCircle
        }

    ];

    return (

        <div className="grid md:grid-cols-4 gap-5">

            {

                cards.map((card, index) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={index}
                            className="rounded-2xl border bg-white/50 p-6 shadow-sm"
                        >

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-gray-500">

                                        {card.title}

                                    </p>

                                    <h1 className="text-3xl font-bold">

                                        {card.value}

                                    </h1>

                                </div>

                                <Icon className="text-[#2c221e]" />

                            </div>

                        </div>

                    )

                })

            }

        </div>

    )

}