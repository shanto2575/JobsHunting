import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const MainLayout = ({ children }) => {
    return (
        <div
            className="relative  min-h-screen flex flex-col antialiased selection:bg-[#2c221e]/10 selection:text-[#2c221e]"
            style={{
                backgroundColor: '#ebdcc9',
                color: '#2c221e'
            }}
        >
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" />
            <div className="relative z-20 mt-3 bg-[#ebdcc9]/90 backdrop-blur-md">
                <Navbar />
            </div>
            <main className="relative z-10 flex-grow w-full   ">
                {children}
            </main>
            <div className="relative z-20 ">
                <Footer />
            </div>
            <div>
                <Toaster />
            </div>
        </div>
    )
}

export default MainLayout