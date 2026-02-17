"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "หน้าแรก", icon: "🏠" },
    { href: "/pretest", label: "ก่อนเรียน", icon: "📝" },
    { href: "/lessons/1", label: "บทที่ 1", icon: "📖" },
    { href: "/lessons/2", label: "บทที่ 2", icon: "📖" },
    { href: "/lessons/3", label: "บทที่ 3", icon: "📖" },
    { href: "/lessons/4", label: "บทที่ 4", icon: "📖" },
    { href: "/posttest", label: "หลังเรียน", icon: "📝" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const pathname = usePathname();

    // Don't show navbar on login page
    if (pathname === "/login") return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl group-hover:animate-float">❄️</span>
                        <span className="font-bold text-lg gradient-text hidden sm:inline">
                            งานปรับอากาศรถยนต์
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${isActive
                                        ? "bg-white text-primary shadow-lg font-bold transform scale-105"
                                        : "text-slate-200 hover:bg-white/10 hover:text-white font-medium"
                                        }`}
                                >
                                    <span className="text-xl">{link.icon}</span>
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Profile & Mobile Menu Button */}
                    <div className="flex items-center gap-3">
                        {user && (
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-primary/10 transition-colors"
                                title="ดูโปรไฟล์"
                            >
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs text-white font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <span className="text-xs font-medium text-slate-700 hidden sm:inline">
                                    {user.name}
                                </span>
                            </Link>
                        )}

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-xl hover:bg-primary/10 transition-colors"
                        >
                            <svg
                                className="w-6 h-6 text-slate-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10">
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive
                                        ? "bg-white text-primary shadow-lg font-bold"
                                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <span className="text-xl">{link.icon}</span>
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}
