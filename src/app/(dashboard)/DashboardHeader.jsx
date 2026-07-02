"use client";

export default function DashboardHeader({
    title,
    subtitle,
    action,
}) {
    return (
        <div className="w-full rounded-3xl border border-[#dfcbaf] bg-white/30 backdrop-blur-xl px-6 py-5 shadow-[0_20px_40px_-15px_rgba(44,34,30,0.08)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-4">

            {/* Left Content */}
            <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#2c221e]">
                    {title}
                </h1>
                <p className="mt-2 text-sm md:text-base font-medium text-[#4a3b35] opacity-80">
                    {subtitle}
                </p>
            </div>

            {/* Right Action */}
            {action && <div>{action}</div>}
        </div>
    );
}