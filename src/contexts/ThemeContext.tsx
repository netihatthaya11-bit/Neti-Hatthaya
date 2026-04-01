"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("system");
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load from localStorage or system preference
        const stored = localStorage.getItem("ac_theme") as Theme | null;
        if (stored) {
            setThemeState(stored);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        
        const applyTheme = (currentTheme: Theme) => {
            root.classList.remove("light", "dark");
            
            if (currentTheme === "system") {
                const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (systemDark) {
                    root.classList.add("dark");
                    setIsDark(true);
                } else {
                    root.classList.add("light");
                    setIsDark(false);
                }
            } else {
                root.classList.add(currentTheme);
                setIsDark(currentTheme === "dark");
            }
        };

        applyTheme(theme);
    }, [theme, mounted]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("ac_theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
