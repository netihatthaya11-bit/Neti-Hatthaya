"use client";

import Link from "next/link";
import FormButton from "@/components/FormButton";
import { courseInfo } from "@/data/lessonsData";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function PosttestPage() {
    const { logVisit } = useAuth();

    useEffect(() => {
        logVisit("/posttest");
    }, [logVisit]);

    return (
        <div className="gradient-cool min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <span className="text-6xl block mb-4">🏆</span>
                    <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
                        แบบทดสอบหลังเรียน
                    </h1>
                    <p className="text-slate-600 max-w-lg mx-auto">
                        ทดสอบความรู้ความเข้าใจหลังจากเรียนจบทุกบทเรียน
                    </p>
                </div>

                {/* Info Card */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up stagger-1">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span>📌</span> คำชี้แจง
                    </h2>
                    <ul className="space-y-3 text-slate-600">
                        <li className="flex items-start gap-3">
                            <span className="text-primary mt-0.5">•</span>
                            <span>แบบทดสอบนี้เป็นแบบทดสอบ <strong>หลังเรียน</strong> เพื่อวัดผลการเรียนรู้</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary mt-0.5">•</span>
                            <span>ควรทำหลังจากศึกษาเนื้อหาครบทั้ง 4 บทเรียนแล้ว</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary mt-0.5">•</span>
                            <span>ผลคะแนนจะถูกนำไปเปรียบเทียบกับแบบทดสอบก่อนเรียน</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary mt-0.5">•</span>
                            <span>ใช้เวลาประมาณ 10-15 นาที</span>
                        </li>
                    </ul>
                </div>

                {/* Checklist Card */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up stagger-2">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span>✅</span> ก่อนทำแบบทดสอบ ตรวจสอบว่าคุณได้ศึกษา
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { icon: "❄️", text: "บทที่ 1: หลักการทำความเย็น" },
                            { icon: "🔧", text: "บทที่ 2: ส่วนประกอบระบบ A/C" },
                            { icon: "🧪", text: "บทที่ 3: สารทำความเย็น" },
                            { icon: "🛠️", text: "บทที่ 4: ตรวจสอบ & บำรุงรักษา" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/50"
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-sm text-slate-700">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up stagger-3">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span>🚀</span> เริ่มทำแบบทดสอบ
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <FormButton
                            label="ทำแบบทดสอบหลังเรียน"
                            url={courseInfo.posttestFormUrl}
                            icon="form"
                            variant="primary"
                        />
                        <FormButton
                            label="ดูผลคะแนน"
                            url={courseInfo.posttestSheetUrl}
                            icon="sheet"
                            variant="secondary"
                        />
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center animate-fade-in-up stagger-4">
                    <Link
                        href="/lessons/4"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium"
                    >
                        ← กลับบทที่ 4
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                    >
                        🏠 กลับหน้าแรก
                    </Link>
                </div>
            </div>
        </div>
    );
}
