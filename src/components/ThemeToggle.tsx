"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import { playPopSound } from "@/utils/soundEffects";

export default function ThemeToggle() {
    const { isDark, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10"></div>; // Placeholder to avoid hydration mismatch
    }

    const toggleTheme = () => {
        playPopSound(); // play tiny pop sound
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-full bg-white/10 glass border border-white/20 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform duration-300"
            aria-label="Toggle Dark Mode"
            title={isDark ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
        >
            <div className={`absolute transform transition-all duration-500 ease-in-out ${isDark ? 'translate-y-[200%] rotate-90 opacity-0' : 'translate-y-0 rotate-0 opacity-100'}`}>
                ☀️
            </div>
            <div className={`absolute transform transition-all duration-500 ease-in-out ${isDark ? 'translate-y-0 rotate-0 opacity-100' : '-translate-y-[200%] -rotate-90 opacity-0'}`}>
                🌙
            </div>
        </button>
    );
}
