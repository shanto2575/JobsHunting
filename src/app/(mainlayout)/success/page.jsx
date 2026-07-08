import { subscription } from "@/lib/api/payment";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
    CheckCircle2,
    Crown,
    ArrowRight,
    Home,
    Sparkles,
} from "lucide-react";
import { getUser } from "@/lib/session";

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;
    const user=await getUser()
    const role=user?.role;


    if (!session_id) {
        throw new Error("Please provide a valid session_id (`cs_test_...`)");
    }

    const {
        status,
        metadata,
        customer_details: { email: customerEmail },
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"],
    });

    if (status === "open") {
        return redirect("/");
    }

    if (status === "complete") {
        await subscription({
            ...metadata,
            sessionId: session_id,
        });

        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff9ed] via-[#fff5d8] to-[#fef1c7] px-4">

                <div className="w-full max-w-2xl rounded-[32px] bg-white shadow-2xl border border-yellow-200 overflow-hidden">

                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 p-10 text-center">

                        <div className="absolute top-6 left-6">
                            <Sparkles className="text-white" size={28} />
                        </div>

                        <div className="absolute top-6 right-6">
                            <Crown className="text-white" size={28} />
                        </div>

                        <div className="flex justify-center">

                            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl">

                                <CheckCircle2
                                    size={60}
                                    className="text-green-500"
                                />

                            </div>

                        </div>

                        <h1 className="text-4xl font-black text-[#2c221e] mt-6">
                            Payment Successful 🎉
                        </h1>

                        <p className="mt-3 text-[#4b3b21] font-medium">
                            Congratulations! Your payment has been completed
                            successfully.
                        </p>

                    </div>

                    {/* Body */}

                    <div className="p-10 space-y-8">

                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">

                            <h3 className="text-lg font-bold text-[#2c221e] mb-3">
                                Payment Details
                            </h3>

                            <div className="space-y-3 text-sm">

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Status
                                    </span>

                                    <span className="font-bold text-green-600">
                                        Completed
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Plan
                                    </span>

                                    <span className="font-bold text-yellow-700 flex items-center gap-2">

                                        <Crown size={16} />

                                        Premium

                                    </span>

                                </div>

                                <div className="flex justify-between gap-5">

                                    <span className="text-gray-500">
                                        Confirmation Email
                                    </span>

                                    <span className="font-semibold text-right break-all">
                                        {customerEmail}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">

                            <p className="text-green-700 font-medium">
                                Thank you for upgrading to our Premium Plan.
                                Your subscription is now active.
                            </p>

                        </div>

                        <div className="flex flex-col md:flex-row gap-4">

                            <Link
                                href={`/dashboard/${role}`}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl transition"
                            >

                                Go to Profile

                                <ArrowRight size={18} />

                            </Link>

                            <Link
                                href="/"
                                className="flex-1 flex items-center justify-center gap-2 border border-yellow-300 hover:bg-yellow-50 text-[#2c221e] font-bold py-4 rounded-xl transition"
                            >

                                <Home size={18} />

                                Back Home

                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}