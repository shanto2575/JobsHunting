"use client";

import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid

} from "recharts";

export default function JobChart({ analytics }) {

    return (

        <div className="bg-white/50 rounded-2xl shadow p-5">

            <h2 className="font-bold mb-5">

                Applications Per Job

            </h2>

            <BarChart

                width={450}

                height={300}

                data={analytics.applicationsPerJob}

            >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="title" />

                <YAxis />

                <Tooltip />

                <Bar

                    dataKey="applicants"

                    fill="#2c221e"

                />

            </BarChart>

        </div>

    )

}