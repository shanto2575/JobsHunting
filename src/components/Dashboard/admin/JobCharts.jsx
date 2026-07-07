"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
} from "recharts";
import { BriefcaseBusiness } from "lucide-react";

export default function JobChart({ analytics }) {

    const data = [
        {
            name: "Approved",
            value: analytics.approvedJobs,
            color: "#22c55e",
        },
        {
            name: "Pending",
            value: analytics.pendingJobs,
            color: "#f59e0b",
        },
        {
            name: "Rejected",
            value: analytics.rejectedJobs,
            color: "#ef4444",
        },
    ];

    return (
        <div className="bg-white/50 rounded-3xl border border-[#ece3d8] shadow-sm p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <div>
                    <h2 className="text-xl font-bold text-[#2c221e]">
                        Job Status
                    </h2>

                    <p className="text-sm text-gray-500">
                        Overview of all job approvals
                    </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                    <BriefcaseBusiness
                        className="text-violet-600"
                        size={22}
                    />
                </div>

            </div>

            {/* Chart */}

            <ResponsiveContainer
                width="100%"
                height={330}
            >

                <BarChart
                    data={data}
                    barCategoryGap={35}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f3f4f6"
                    />

                    <XAxis
                        dataKey="name"
                        tick={{
                            fill: "#6b7280",
                            fontSize: 13,
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fill: "#6b7280",
                            fontSize: 13,
                        }}
                    />

                    <Tooltip
                        cursor={{
                            fill: "#f8fafc",
                        }}
                        contentStyle={{
                            borderRadius: "14px",
                            border: "1px solid #e5e7eb",
                            boxShadow:
                                "0 8px 24px rgba(0,0,0,.08)",
                        }}
                    />

                    <Bar
                        dataKey="value"
                        radius={[10, 10, 0, 0]}
                    >
                        {data.map((item, index) => (
                            <Cell
                                key={index}
                                fill={item.color}
                            />
                        ))}
                    </Bar>

                </BarChart>

            </ResponsiveContainer>

            {/* Bottom Summary */}

            <div className="grid grid-cols-3 gap-4 mt-6">

                <div className="rounded-xl bg-green-50 border border-green-100 p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">
                        {analytics.approvedJobs}
                    </p>
                    <p className="text-xs text-gray-500">
                        Approved
                    </p>
                </div>

                <div className="rounded-xl bg-yellow-50 border border-yellow-100 p-3 text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                        {analytics.pendingJobs}
                    </p>
                    <p className="text-xs text-gray-500">
                        Pending
                    </p>
                </div>

                <div className="rounded-xl bg-red-50 border border-red-100 p-3 text-center">
                    <p className="text-2xl font-bold text-red-600">
                        {analytics.rejectedJobs}
                    </p>
                    <p className="text-xs text-gray-500">
                        Rejected
                    </p>
                </div>

            </div>

        </div>
    );
}