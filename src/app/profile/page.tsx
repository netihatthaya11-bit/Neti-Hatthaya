"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
    const { user, visitLogs, logout } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !user) {
        return null;
    }

    // Create a map of English/path names to Thai names for display
    const getPageName = (path: string) => {
        if (path === "/") return "หน้าแรก";
        if (path === "/pretest") return "แบบทดสอบก่อนเรียน";
        if (path === "/posttest") return "แบบทดสอบหลังเรียน";
        if (path.startsWith("/lessons/")) {
            const id = path.split("/").pop();
            return `บทเรียนที่ ${id}`;
        }
        return path;
    };

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

                {/* Activity Log */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up stagger-2">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span>🕒</span> ประวัติการเข้าใช้งาน
                    </h2>

                    <div className="space-y-4">
                        {visitLogs.length === 0 ? (
                            <p className="text-center text-slate-400 py-8">
                                ยังไม่มีประวัติการใช้งาน
                            </p>
                        ) : (
                            visitLogs.slice().reverse().map((log, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                                    <span className="text-slate-700 font-medium">
                                        {getPageName(log.path)}
                                    </span>
                                    <span className="text-slate-400 text-xs">
                                        {new Date(log.timestamp).toLocaleString("th-TH")}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Certificate */}
                <div className="glass-card rounded-2xl p-8 animate-fade-in-up stagger-1 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-orange-500/30">
                        🏆
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">
                        เกียรติบัตรของคุณ
                    </h2>
                    <p className="text-slate-600 mb-8 max-w-md mx-auto">
                        ขอแสดงความยินดี! คุณสามารถดาวน์โหลดเกียรติบัตรเพื่อรับรองการผ่านการอบรมในหลักสูตรนี้ได้ที่นี่
                    </p>
                    <Link
                        href="https://drive.google.com/drive/folders/1pezw57miG3LU817G0_8UrtHJDCzhra5P?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all font-semibold text-lg"
                    >
                        <span>📜</span> กดดูและดาวน์โหลดเกียรติบัตร
                    </Link>
                </div>
            </div>
        </div>
    );
}
