import Image from "next/image";
import Link from "next/link";
import {
    Crown,
    Briefcase,
    Mail,
    ShieldCheck,
    FileText,
    Sparkles
} from "lucide-react";
import { getUser } from "@/lib/session";
import { EmployProfile } from "@/lib/api/employer/data";
import { EditsProfile } from "../EditsProfile";

export default async function DashboardOverviewCard() {
    const user = await getUser();
    // console.log(user)
    const data = await EmployProfile(user?.email);
    const isPro = data.result.plan === "pro";
    // console.log(data)

    return (
        /* Outer Card: Theme based bg [#f4ece1] & soft blended shadows matching the warm palette */
        <div className="w-full rounded-[2.5rem] bg-[#f4ece1] p-6 md:p-8 shadow-[12px_12px_30px_rgba(207,200,191,0.4),-12px_-12px_30px_rgba(255,255,255,0.1)] border border-[#ebdcc9]/40 transition-all duration-300 hover:shadow-[16px_16px_35px_rgba(207,200,191,0.5),-16px_-16px_35px_rgba(255,255,255,0.1)]">

            {/* Top Section: Profile Info & Action */}
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between pb-6 border-b border-[#ebdcc9]/50">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full">

                    {/* Profile Image with Theme Inset Frame */}
                    <div className="relative group shrink-0">
                        <div className={`absolute inset-0 rounded-2xl blur-sm opacity-20 transition-opacity group-hover:opacity-40 ${isPro ? "bg-gradient-to-tr from-amber-400 to-yellow-600" : "bg-[#2c221e]"}`} />
                        <div className={`relative p-1.5 rounded-2xl bg-[#f4ece1] shadow-[3px_3px_6px_rgba(207,200,191,0.4),-3px_-3px_6px_#ffffff] border border-[#ebdcc9]/30`}>
                            <Image
                                src={user?.image?.startsWith("http") ? user.image : "/user.jpg"}
                                width={110}
                                height={110}
                                alt="Profile"
                                className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                            />
                        </div>
                    </div>

                    {/* User Info & Badges */}
                    <div className="space-y-3 flex-1">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-3xl font-black text-[#2c221e] tracking-tight flex items-center gap-2 flex-wrap">
                                {user?.name || "User Name"}
                                {isPro && <Sparkles size={20} className="text-amber-500 animate-pulse" />}
                            </h2>
                            <p className="flex items-center gap-2 text-sm font-medium text-[#2c221e]/70">
                                <Mail size={14} className="text-[#2c221e]/50" />
                                {user?.email}
                            </p>
                        </div>

                        {/* Status Badges with Theme Contrast */}
                        <div className="flex flex-wrap gap-2.5">
                            {/* Role Badge - Dark Brown Theme */}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2c221e] text-[#ebdcc9] text-xs font-black uppercase tracking-wider shadow-[2px_2px_5px_rgba(44,34,30,0.15)]">
                                <Briefcase size={13} />
                                {user?.role || "Member"}
                            </span>

                            {/* Plan Badge - Light Cream/Gold Theme */}
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider ${isPro
                                ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-[2px_2px_5px_rgba(245,158,11,0.2)]"
                                : "bg-[#f4ece1] text-[#2c221e] shadow-[2px_2px_5px_rgba(207,200,191,0.4),-2px_-2px_5px_#ffffff] border border-[#ebdcc9]/40"
                                }`}>
                                <Crown size={13} />
                                {user?.plan || "Free"} Plan
                            </span>
                        </div>
                    </div>
                </div>

                {/* Edit Profile Button - Soft Neumorphic Action */}
                <div>
                    <EditsProfile user={user} />
                </div>
            </div>

            {/* Middle Section: Stats Cards styled with Cream/Brown tones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                {/* Jobs Published */}
                <div className="group rounded-2xl bg-[#f4ece1] p-5 border border-[#ebdcc9]/40 shadow-[4px_4px_10px_rgba(207,200,191,0.3),-4px_-4px_10px_#ffffff] transition-all duration-200">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-[#2c221e]/60">Jobs Published</span>
                        <div className="p-2.5 bg-[#f4ece1] text-[#2c221e] rounded-xl shadow-[inset_2px_2px_4px_rgba(207,200,191,0.4),inset_-2px_-2px_4px_#ffffff] group-hover:scale-105 transition-transform">
                            <FileText size={18} />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-[#2c221e]">
                        {data?.result.totalPublish || 0}
                    </p>
                </div>

                {/* Total Applications */}
                <div className="group rounded-2xl bg-[#f4ece1] p-5 border border-[#ebdcc9]/40 shadow-[4px_4px_10px_rgba(207,200,191,0.3),-4px_-4px_10px_#ffffff] transition-all duration-200">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-[#2c221e]/60">Total Applications</span>
                        <div className="p-2.5 bg-[#f4ece1] text-[#2c221e] rounded-xl shadow-[inset_2px_2px_4px_rgba(207,200,191,0.4),inset_-2px_-2px_4px_#ffffff] group-hover:scale-105 transition-transform">
                            <Briefcase size={18} />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-[#2c221e]">
                        {data?.result.totalApplicants || 0}
                    </p>
                </div>
            </div>

            {/* Bottom Section: Dynamic Plan Promotion with Core Theme Colors */}
            <div className="mt-8 overflow-hidden rounded-2xl shadow-[4px_4px_12px_rgba(207,200,191,0.3),-4px_-4px_12px_#ffffff] border border-[#ebdcc9]/40">
                {!isPro ? (
                    /* Free Plan UI: Dark Brown Solid Background with Cream Text Accent */
                    <div className="p-6 bg-[#2c221e] text-[#ebdcc9] relative">
                        <div className="absolute -right-8 -bottom-8 opacity-5 text-white pointer-events-none">
                            <Crown size={140} />
                        </div>
                        <div className="relative space-y-4">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-white/10 text-[#dfcbaf]">Recommended Upgrade</span>
                                <h3 className="text-xl font-black mt-2 tracking-tight">Free Plan Active</h3>
                            </div>
                            <p className="text-sm text-[#ebdcc9]/80 max-w-xl leading-relaxed font-medium">
                                Upgrade to <span className="text-amber-400 font-bold">Pro Membership</span> to unlock premium job visibility, advanced recruitment analytics, unlimited job postings, and standalone highlighted listings.
                            </p>
                            <form action={'/api/checkout_sessions'} method="POST">
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-[#2c221e] font-black text-xs uppercase tracking-wider shadow-[3px_3px_8px_rgba(44,34,30,0.15)] transition-all duration-200 hover:scale-[1.01]">
                                    <Crown size={14} />
                                    Upgrade to Pro
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    /* Pro Plan UI: Dark Brown Base with Deep Velvet and Subtle Amber Accents */
                    <div className="p-6 bg-gradient-to-br from-[#2c221e] via-[#352a25] to-[#2c221e] text-white relative">
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-yellow-600/5 rounded-full blur-2xl pointer-events-none" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-amber-400">
                                    <ShieldCheck size={20} className="drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                                    <h3 className="text-lg font-black uppercase tracking-wider bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
                                        Premium Pro Member
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-300 max-w-xl leading-relaxed font-medium">
                                    You have full elite access. Enjoy premium reach, advanced applicant management tools, unlimited access, and featured job listings.
                                </p>
                            </div>
                            <div className="shrink-0 flex items-center justify-center sm:justify-end">
                                <div className="px-4 py-2 rounded-xl bg-white/5 border border-amber-500/30 text-amber-400 font-black text-xs uppercase tracking-widest">
                                    Elite Status
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}