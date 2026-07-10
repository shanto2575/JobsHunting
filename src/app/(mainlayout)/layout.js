import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import ScrollToTop from '@/components/shared/ScrollToTop'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const MainLayout = ({ children }) => {
    return (
        <div
            className="relative min-h-screen flex flex-col antialiased selection:bg-[#2c221e]/10 selection:text-[#2c221e]"
            style={{
                backgroundColor: '#ebdcc9',
                color: '#2c221e'
            }}
        >
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" />
            
            <div className="w-full fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>

            <main className="relative z-10 flex-grow w-full pt-24">
                {children}
            </main>

            <div className="relative z-20">
                <Footer />
            </div>
            <ScrollToTop />
            <div>
                <Toaster />
            </div>
        </div>
    )
}

export default MainLayout