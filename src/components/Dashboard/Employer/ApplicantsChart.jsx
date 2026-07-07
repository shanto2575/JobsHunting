"use client";

import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer
} from "recharts";

export default function ApplicantsChart({ analytics }) {

    const data = [
        { name: "Pending", value: analytics.pending || 0 },
        { name: "Shortlisted", value: analytics.shortlisted || 0 },
        { name: "Interview", value: analytics.interview || 0 },
        { name: "Hired", value: analytics.hired || 0 },
        { name: "Rejected", value: analytics.rejected || 0 }
    ];

    // Premium UI Matching Color Palette
    const colors = [
        "#f59e0b", // Amber/Gold for Pending
        "#3b82f6", // Blue for Shortlisted
        "#8b5cf6", // Purple for Interview
        "#10b981", // Emerald for Hired
        "#f43f5e"  // Rose for Rejected
    ];

    return (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-[#dfcbaf]/50 p-6 shadow-[0_20px_50px_-12px_rgba(44,34,30,0.06)] flex flex-col justify-between h-full">
            
            <div className="mb-4">
                <h2 className="text-[#2c221e] text-xs font-extrabold uppercase tracking-[0.15em]">
                    Applicants Status
                </h2>
                <p className="text-[11px] text-[#2c221e]/50 font-medium mt-1">
                    Recruitment funnel breakdown
                </p>
            </div>

            <div className="w-full flex-1 flex items-center justify-center min-h-[260px]" style={{ direction: 'ltr' }}>
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
                            innerRadius={65}  // Turns the pie chart into a modern donut chart
                            outerRadius={85}
                            paddingAngle={5}  // Adds a sleek gap between slices
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index]}
                                    stroke="rgba(255,255,255,0.8)"
                                    strokeWidth={2}
                                    style={{
                                        filter: `drop-shadow(0px 4px 8px rgba(44, 34, 30, 0.05))`
                                    }}
                                />
                            ))}
                        </Pie>

                        {/* Ultra-clean Premium Glass Tooltip */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(44, 34, 30, 0.95)",
                                backdropFilter: "blur(12px)",
                                border: "none",
                                borderRadius: "14px",
                                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)",
                                padding: "8px 14px"
                            }}
                            itemStyle={{ color: "#ffffff", fontWeight: 600, fontSize: "13px" }}
                        />

                        {/* Modernized Legend */}
                        <Legend 
                            verticalAlign="bottom" 
                            align="center"
                            iconType="circle"
                            iconSize={8}
                            wrapperStyle={{
                                fontSize: "11px",
                                fontWeight: 600,
                                paddingTop: "10px",
                                color: "#2c221e"
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}