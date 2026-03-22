"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import FormButton from "@/components/FormButton";
import { courseInfo } from "@/data/lessonsData";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLinkSettings } from "@/contexts/LinkSettingsContext";

export default function PosttestPage() {
    const { logVisit, completedLessons } = useAuth();
    const { getUrl } = useLinkSettings();
    const router = useRouter();

    const allCompleted = [1, 2, 3, 4].every((id) => completedLessons.includes(id));

    useEffect(() => {
        if (!allCompleted) {
            router.replace("/");
        }
    }, [allCompleted, router]);

    useEffect(() => {
        if (allCompleted) {
            logVisit("/posttest");
        }
    }, [logVisit, allCompleted]);

    if (!allCompleted) {
        return null;
    }

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
                            <span>ใช้เวลาประมาณ 20-30 นาที</span>
                        </li>
                    </ul>
                </div>

                {/* Checklist Card */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up stagger-2">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span>✅</span> คุณได้ศึกษาครบทุกบทแล้ว
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
                                className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200"
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-sm text-slate-700">{item.text}</span>
                                <span className="ml-auto text-emerald-600 font-bold">✓</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons & Embedded Form */}
                <div className="glass-card rounded-2xl p-4 sm:p-8 mb-8 animate-fade-in-up stagger-3 overflow-hidden">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
                        <span>📝</span> ทำแบบทดสอบหลังเรียน
                    </h2>

                    <div className="w-full flex justify-center bg-white rounded-xl overflow-hidden shadow-inner mb-6">
                        <iframe 
                            src="https://docs.google.com/forms/d/e/1FAIpQLSepznUvGXMmZXzktA0oQ-s20SOiWxvkch2BNUX7hZCKcb5TTw/viewform?embedded=true" 
                            width="100%" 
                            height="2000" 
                            frameBorder="0" 
                            marginHeight={0} 
                            marginWidth={0}
                            className="w-full max-w-3xl min-h-[80vh]"
                        >
                            กำลังโหลด…
                        </iframe>
                    </div>

                    <div className="flex justify-center">
                        <FormButton
                            label="ทดสอบเสร็จแล้ว กดดูผลคะแนน"
                            url={getUrl("posttest_sheetUrl", courseInfo.posttestSheetUrl)}
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
