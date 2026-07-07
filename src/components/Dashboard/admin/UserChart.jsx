"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function UserChart({ analytics }) {

    const data = [
        {
            name: "Employer",
            value: analytics.employers,
        },
        {
            name: "Seeker",
            value: analytics.seekers,
        },
    ];

    const COLORS = ["#3b82f6", "#10b981"];

    const total = analytics.employers + analytics.seekers;

    return (
        <div className="bg-white/50 backdrop-blur-md rounded-3xl border border-[#ebe3d8] shadow-md p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <div>
                    <h2 className="text-xl font-bold text-[#2c221e]">
                        User Distribution
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Employers vs Job Seekers
                    </p>
                </div>

                <div className="bg-[#f8f4ee] px-4 py-2 rounded-xl">
                    <h3 className="text-2xl font-bold text-[#2c221e]">
                        {total}
                    </h3>
                    <p className="text-xs text-gray-500">
                        Total Users
                    </p>
                </div>

            </div>

            {/* Chart */}
            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={105}
                        paddingAngle={5}
                        strokeWidth={2}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow:
                                "0 8px 25px rgba(0,0,0,0.1)",
                        }}
                    />

                </PieChart>

            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex justify-center gap-8 mt-4">

                {data.map((item, index) => (

                    <div
                        key={index}
                        className="flex items-center gap-3"
                    >

                        <span
                            className="w-4 h-4 rounded-full"
                            style={{
                                backgroundColor: COLORS[index],
                            }}
                        ></span>

                        <div>

                            <p className="font-medium text-[#2c221e]">
                                {item.name}
                            </p>

                            <p className="text-sm text-gray-500">
                                {item.value} (
                                {total
                                    ? (
                                        (item.value / total) *
                                        100
                                    ).toFixed(0)
                                    : 0}
                                %)
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}