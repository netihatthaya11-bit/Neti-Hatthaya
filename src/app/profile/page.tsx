"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
    const { user, logout, sessions } = useAuth();
    const [mounted, setMounted] = useState(false);

    const formatDateTime = (isoString: string | null) => {
        if (!isoString) return "ไม่ได้บันทึก";
        const date = new Date(isoString);
        return date.toLocaleString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !user) {
        return null;
    }

    return (
        <div className="gradient-cool min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl shadow-lg border-4 border-white">
                        🧑‍🎓
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">
                            {user.name}
                        </h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-600">
                            <span className="bg-white/50 px-3 py-1 rounded-full text-sm">
                                🆔 {user.studentId}
                            </span>
                            <span className="bg-white/50 px-3 py-1 rounded-full text-sm">
                                🏫 ห้อง {user.room}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="px-6 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium border border-red-100"
                    >
                        ออกจากระบบ
                    </button>
                </div>

                {/* Session History */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up stagger-1">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                            ⏱️
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">ประวัติการเข้าใช้งาน (30 วันล่าสุด)</h2>
                    </div>
                    {sessions && sessions.length > 0 ? (
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {[...sessions].reverse().map((session, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/60 p-4 rounded-xl border-l-4 border-l-blue-500 shadow-sm border-t border-r border-b border-slate-100">
                                    <div className="mb-3 sm:mb-0">
                                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 
                                            เวลาเข้าสู่ระบบ
                                        </div>
                                        <p className="font-semibold text-slate-800">{formatDateTime(session.loginAt)}</p>
                                    </div>
                                    <div className="sm:text-right">
                                        <div className="flex items-center sm:justify-end gap-2 text-sm text-slate-500 mb-1">
                                            <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                            เวลาออกจากระบบ
                                        </div>
                                        <p className="font-semibold text-slate-800">{formatDateTime(session.logoutAt)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-600 text-center py-4 bg-white/40 rounded-xl">ยังไม่มีประวัติการเข้าใช้งานก่อนหน้านี้</p>
                    )}
                </div>

            </div>
        </div>
    );
}
