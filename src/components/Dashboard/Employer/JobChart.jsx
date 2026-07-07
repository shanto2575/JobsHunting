"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
} from "recharts";

export default function JobChart({ analytics }) {

    const colors = [
        "#8B5CF6",
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#EC4899",
        "#14B8A6",
    ];

    return (
        <div className="bg-white/50 rounded-3xl border border-[#ece6dd] shadow-sm p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <div>
                    <h2 className="text-xl font-bold text-[#2c221e]">
                        Applications Per Job
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Number of applicants received for each job.
                    </p>
                </div>

                <div className="bg-[#f8f4ee] px-4 py-2 rounded-xl">
                    <p className="text-xs text-gray-500">
                        Total Jobs
                    </p>

                    <h3 className="text-xl font-bold text-[#2c221e]">
                        {analytics.applicationsPerJob.length}
                    </h3>
                </div>

            </div>

            <ResponsiveContainer
                width="100%"
                height={340}
            >

                <BarChart
                    data={analytics.applicationsPerJob}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 20,
                    }}
                >

                    <CartesianGrid
                        stroke="#f1f1f1"
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="title"
                        tick={{
                            fill: "#6b7280",
                            fontSize: 12,
                        }}
                    />

                    <YAxis
                        tick={{
                            fill: "#6b7280",
                            fontSize: 12,
                        }}
                    />

                    <Tooltip
                        cursor={{
                            fill: "#f9fafb",
                        }}
                        contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow:
                                "0 8px 20px rgba(0,0,0,.08)",
                        }}
                    />

                    <Bar
                        dataKey="applicants"
                        radius={[10, 10, 0, 0]}
                    >

                        {analytics.applicationsPerJob.map(
                            (entry, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        colors[
                                            index % colors.length
                                        ]
                                    }
                                />
                            )
                        )}

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}