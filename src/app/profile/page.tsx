"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { lessons } from "@/data/lessonsData";

export default function ProfilePage() {
    const { user, logout, sessions, completedLessons } = useAuth();
    const [mounted, setMounted] = useState(false);

    const completedCount = completedLessons ? completedLessons.length : 0;
    const totalLessons = lessons.length;
    const progressPercent = Math.round((completedCount / totalLessons) * 100);

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
                            <span className="glass px-4 py-1.5 rounded-full text-sm font-medium">
                                🆔 {user.studentId}
                            </span>
                            <span className="glass px-4 py-1.5 rounded-full text-sm font-medium">
                                🏫 ห้อง {user.room}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="px-6 py-2 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition-colors font-bold border border-red-500/20"
                    >
                        ออกจากระบบ
                    </button>
                </div>

                {/* Badges & Achievements */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up stagger-1">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center text-2xl border border-amber-500/30">
                            🏆
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">เหรียญตรา & ความสำเร็จ</h2>
                    </div>

                    {/* Progress Overview */}
                    <div className="glass rounded-2xl p-6 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-slate-600 font-bold">ความคืบหน้าการเรียน</span>
                            <span className="text-lg font-bold text-primary">{completedCount}/{totalLessons} บทเรียน</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                            <div 
                                className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Badges Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Bronze */}
                        <div className={`relative rounded-2xl p-6 text-center border transition-all duration-500 ${
                            completedCount >= 1 
                                ? "bg-gradient-to-b from-amber-500/20 to-orange-500/20 border-amber-500/40 shadow-lg shadow-amber-500/10" 
                                : "glass opacity-60 grayscale"
                        }`}>
                            {completedCount >= 1 && (
                                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">✓</div>
                            )}
                            <div className={`text-5xl mb-3 ${completedCount >= 1 ? "animate-bounce" : ""}`} style={{ animationDuration: '3s' }}>🥉</div>
                            <h3 className="text-lg font-bold text-slate-800 mb-1">ผู้เริ่มต้น</h3>
                            <p className="text-xs text-slate-500 mb-3">เริ่มเรียนบทแรกสำเร็จ</p>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                completedCount >= 1 ? "bg-amber-500/20 text-amber-600" : "glass text-slate-500"
                            }`}>
                                {completedCount >= 1 ? "ปลดล็อกแล้ว!" : "เรียน 1 บท"}
                            </span>
                        </div>

                        {/* Silver */}
                        <div className={`relative rounded-2xl p-6 text-center border transition-all duration-500 ${
                            completedCount >= 2 
                                ? "bg-gradient-to-b from-slate-400/20 to-slate-300/20 border-slate-400/40 shadow-lg shadow-slate-500/10" 
                                : "glass opacity-60 grayscale"
                        }`}>
                            {completedCount >= 2 && (
                                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">✓</div>
                            )}
                            <div className={`text-5xl mb-3 ${completedCount >= 2 ? "animate-bounce" : ""}`} style={{ animationDuration: '3s' }}>🥈</div>
                            <h3 className="text-lg font-bold text-slate-800 mb-1">ช่างฝึกหัด</h3>
                            <p className="text-xs text-slate-500 mb-3">เรียนจบครึ่งหนึ่ง (50%)</p>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                completedCount >= 2 ? "bg-slate-500/20 text-slate-600" : "glass text-slate-500"
                            }`}>
                                {completedCount >= 2 ? "ปลดล็อกแล้ว!" : `เรียนอีก ${2 - completedCount} บท`}
                            </span>
                        </div>

                        {/* Gold */}
                        <div className={`relative rounded-2xl p-6 text-center border transition-all duration-500 ${
                            completedCount >= totalLessons
                                ? "bg-gradient-to-b from-yellow-400/20 to-amber-500/30 border-yellow-500/50 shadow-lg shadow-yellow-500/20" 
                                : "glass opacity-60 grayscale"
                        }`}>
                            {completedCount >= totalLessons && (
                                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">✓</div>
                            )}
                            <div className={`text-5xl mb-3 ${completedCount >= totalLessons ? "animate-bounce" : ""}`} style={{ animationDuration: '3s' }}>🥇</div>
                            <h3 className="text-lg font-bold text-slate-800 mb-1">ช่างแอร์มือโปร</h3>
                            <p className="text-xs text-slate-500 mb-3">เรียนจบครบทุกบท (100%)</p>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                completedCount >= totalLessons ? "bg-yellow-500/20 text-yellow-600" : "glass text-slate-500"
                            }`}>
                                {completedCount >= totalLessons ? "🌟 ช่างแอร์มือโปร!" : `เรียนอีก ${totalLessons - completedCount} บท`}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Session History */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up stagger-1">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl border border-blue-500/30">
                            ⏱️
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">ประวัติการเข้าใช้งาน (30 วันล่าสุด)</h2>
                    </div>
                    {sessions && sessions.length > 0 ? (
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {[...sessions].reverse().map((session, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between glass p-4 rounded-xl border-l-4 border-l-blue-500 shadow-sm transition-transform hover:scale-[1.02]">
                                    <div className="mb-3 sm:mb-0">
                                        <div className="flex items-center gap-2 text-sm text-slate-500 font-bold mb-1">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 
                                            เวลาเข้าสู่ระบบ
                                        </div>
                                        <p className="font-bold text-slate-800">{formatDateTime(session.loginAt)}</p>
                                    </div>
                                    <div className="sm:text-right">
                                        <div className="flex items-center sm:justify-end gap-2 text-sm text-slate-500 font-bold mb-1">
                                            <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                            เวลาออกจากระบบ
                                        </div>
                                        <p className="font-bold text-slate-800">{formatDateTime(session.logoutAt)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-600 font-bold text-center py-6 glass rounded-xl">ยังไม่มีประวัติการเข้าใช้งานก่อนหน้านี้</p>
                    )}
                </div>

            </div>
        </div>
    );
}
