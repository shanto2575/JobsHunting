"use client";

export default function DashboardHeader({
    title,
    subtitle,
    action,
}) {
    return (
        <div className="w-full rounded-3xl border border-[#dfcbaf] bg-gradient-to-r from-[#2c221e] via-[#43342d] to-[#5c483c] text-white backdrop-blur-xl px-6 py-5 shadow-[0_20px_40px_-15px_rgba(44,34,30,0.08)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-4">

            {/* Left Content */}
            <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight ">
                    {title}
                </h1>
                <p className="mt-2 text-sm md:text-base font-medium  opacity-80">
                    {subtitle}
                </p>
            </div>

            {/* Right Action */}
            {action && <div>{action}</div>}
        </div>
    );
}