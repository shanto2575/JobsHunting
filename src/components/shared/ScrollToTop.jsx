"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!showButton) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#2c221e] text-[#ebdcc9] shadow-xl border border-[#dfcbaf]/30 hover:bg-[#3b2f2a] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
        >
            <ChevronUp size={24} />
        </button>
    );
}