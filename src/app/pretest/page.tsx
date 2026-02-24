"use client";

import Link from "next/link";
import FormButton from "@/components/FormButton";
import { courseInfo } from "@/data/lessonsData";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function PretestPage() {
    const { logVisit } = useAuth();

    useEffect(() => {
        logVisit("/pretest");
    }, [logVisit]);

    return (
        <div className="gradient-cool min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <span className="text-6xl block mb-4">📋</span>
                    <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
                        แบบทดสอบก่อนเรียน
                    </h1>
                    <p className="text-slate-600 max-w-lg mx-auto">
                        ทดสอบความรู้พื้นฐานเกี่ยวกับระบบปรับอากาศรถยนต์ก่อนเข้าสู่บทเรียน
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
                            <span>แบบทดสอบนี้เป็นแบบทดสอบ <strong>ก่อนเรียน</strong> เพื่อวัดความรู้พื้นฐาน</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary mt-0.5">•</span>
                            <span>กรุณาทำแบบทดสอบด้วยตนเอง ไม่ต้องเปิดดูเฉลย</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary mt-0.5">•</span>
                            <span>ผลคะแนนจะถูกบันทึกเพื่อเปรียบเทียบกับแบบทดสอบหลังเรียน</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary mt-0.5">•</span>
                            <span>ใช้เวลาประมาณ 20-30 นาที</span>
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up stagger-2">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span>🚀</span> เริ่มทำแบบทดสอบ
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <FormButton
                            label="ทำแบบทดสอบก่อนเรียน"
                            url={courseInfo.pretestFormUrl}
                            icon="form"
                            variant="primary"
                        />
                        <FormButton
                            label="ดูผลคะแนน"
                            url={courseInfo.pretestSheetUrl}
                            icon="sheet"
                            variant="secondary"
                        />
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center animate-fade-in-up stagger-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium"
                    >
                        ← กลับหน้าแรก
                    </Link>
                    <Link
                        href="/lessons/1"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                    >
                        เข้าสู่บทเรียน →
                    </Link>
                </div>
            </div>
        </div>
    );
}
