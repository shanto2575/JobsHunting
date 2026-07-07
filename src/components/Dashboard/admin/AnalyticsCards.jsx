import {
    Users,
    Briefcase,
    ShieldBan,
    FileText,
} from "lucide-react";

export default function AnalyticsCards({ analytics }) {
    const cards = [
        {
            title: "Total Users",
            value: analytics.totalUsers,
            icon: Users,
            iconColor: "text-blue-600",
            iconBg: "bg-blue-500/10 border-blue-200/30",
        },
        {
            title: "Total Jobs",
            value: analytics.totalJobs,
            icon: Briefcase,
            iconColor: "text-emerald-600",
            iconBg: "bg-emerald-500/10 border-emerald-200/30",
        },
        {
            title: "Applications",
            value: analytics.totalApplications,
            icon: FileText,
            iconColor: "text-amber-600",
            iconBg: "bg-amber-500/10 border-amber-200/30",
        },
        {
            title: "Blocked Users",
            value: analytics.blockedUsers,
            icon: ShieldBan,
            iconColor: "text-rose-600",
            iconBg: "bg-rose-500/10 border-rose-200/30",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card, i) => {
                const Icon = card.icon;

                return (
                    <div
                        key={i}
                        className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#dfcbaf]/60 p-6 shadow-[0_12px_40px_-15px_rgba(44,34,30,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(44,34,30,0.1)] hover:border-[#dfcbaf] transition-all duration-300 group"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[#2c221e]/50 text-xs font-bold uppercase tracking-wider">
                                    {card.title}
                                </p>
                                <h2 className="text-3xl font-extrabold mt-3 text-[#2c221e] tracking-tight group-hover:scale-[1.02] transition-transform duration-300">
                                    {card.value?.toLocaleString() || 0}
                                </h2>
                            </div>

                            <div className={`w-12 h-12 rounded-2xl border ${card.iconBg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                                <Icon size={20} className={`${card.iconColor}`} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}