import DashboardSideBar from "@/components/Dashboard/DashboardSideBar";
import React from "react";
import { Toaster } from "react-hot-toast";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden bg-[#ebdcc9] text-[#2c221e]">

            {/* Sidebar (desktop + mobile drawer handled inside) */}
            <div className="shrink-0">
                <DashboardSideBar/>
            </div>

            {/* Main content */}
            <main className="flex-1 h-screen overflow-y-auto w-full p-4 md:p-6 pt-16 lg:pt-6">
                {children}
            </main>

            <Toaster />
        </div>
    );
};

export default DashboardLayout;