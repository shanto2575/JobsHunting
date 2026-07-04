"use client";

import {

    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell

} from "recharts";

export default function ApplicantsChart({ analytics }) {

    const data = [

        {
            name: "Pending",
            value: analytics.pending
        },

        {
            name: "Shortlisted",
            value: analytics.shortlisted
        },

        {
            name: "Interview",
            value: analytics.interview
        },

        {
            name: "Hired",
            value: analytics.hired
        },

        {
            name: "Rejected",
            value: analytics.rejected
        }

    ];

    const colors = [
        "#facc15",
        "#3b82f6",
        "#8b5cf6",
        "#22c55e",
        "#ef4444"
    ];

    return (

        <div className="bg-white/50 rounded-2xl shadow p-5">

            <h2 className="font-bold mb-5">

                Applicants Status

            </h2>

            <PieChart width={400} height={300}>

                <Pie

                    data={data}

                    cx="50%"

                    cy="50%"

                    outerRadius={90}

                    dataKey="value"

                >

                    {

                        data.map((entry, index) => (

                            <Cell

                                key={index}

                                fill={colors[index]}

                            />

                        ))

                    }

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </div>

    )

}