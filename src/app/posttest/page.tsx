"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import FormButton from "@/components/FormButton";
import ConfettiEffect from "@/components/ConfettiEffect";
import { courseInfo } from "@/data/lessonsData";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLinkSettings } from "@/contexts/LinkSettingsContext";
import { playSuccessSound } from "@/utils/soundEffects";

export default function PosttestPage() {
    const { logVisit, completedLessons } = useAuth();
    const { getUrl } = useLinkSettings();
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

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

    const handleCompletePosttest = () => {
        setIsModalOpen(true);
        setShowConfetti(true);
        playSuccessSound();
        setTimeout(() => setShowConfetti(false), 8000);
    };

    return (
        <div className="gradient-cool min-h-screen py-12 relative">
            <ConfettiEffect show={showConfetti} message="เรียนจบแล้ว! 🎉" />
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
                            { icon: "❄️", text: "บทที่ 1: ส่วนประกอบของระบบปรับอากาศรถยนต์" },
                            { icon: "🔧", text: "บทที่ 2: หลักการทำงานและวัฏจักรทำความเย็น" },
                            { icon: "🧪", text: "บทที่ 3: สารทำความเย็นและน้ำมันคอมเพรสเซอร์" },
                            { icon: "🛠️", text: "บทที่ 4: การตรวจสอบ บำรุงรักษา และการเติมน้ำยาแอร์" },
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
                            src={getUrl("posttest_formUrl", courseInfo.posttestFormUrl).replace(/viewform.*$/, "viewform?embedded=true")}
                            width="100%" 
                            height="8127" 
                            frameBorder="0" 
                            marginHeight={0} 
                            marginWidth={0}
                            className="w-full max-w-3xl min-h-[80vh]"
                        >
                            กำลังโหลด…
                        </iframe>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <FormButton
                            label="ดูผลคะแนนแบบทดสอบ"
                            url={getUrl("posttest_sheetUrl", courseInfo.posttestSheetUrl)}
                            icon="sheet"
                            variant="secondary"
                        />
                        <button
                            onClick={handleCompletePosttest}
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-10 py-5 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg shadow-lg border border-teal-400 w-full justify-center max-w-sm"
                        >
                            ส่งแบบทดสอบเรียบร้อยแล้ว ✅
                        </button>
                    </div>
                </div>

                {/* Modal Overlay */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in-up">
                        <div className="glass-card rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20 text-center relative overflow-hidden transform animate-scale-in dark:bg-slate-900/95 dark:border-slate-700">
                            {/* Decorative background circle */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/20 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-secondary/20 blur-2xl"></div>

                            <div className="relative z-10">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-orange-500/30 animate-float">
                                    🎓
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                                    ขอแสดงความยินดี!
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    คุณได้เรียนรู้เนื้อหาและทำแบบทดสอบครบถ้วนตามหลักสูตรแล้ว 
                                    <br/><br/>
                                    <strong>เพื่อการพัฒนาสื่อให้ดียิ่งขึ้น รบกวนช่วยประเมินความพึงพอใจสั้นๆ ให้เราหน่อยนะครับ 🙏</strong>
                                </p>
                                
                                <div className="space-y-3">
                                    <a
                                        href="https://docs.google.com/forms/d/e/1FAIpQLSd0U6ybyFqx9TS_wrcjghwRu4jSMojMrPKCk-8aMV3SGF3Kww/viewform"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-6 py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-lg"
                                        onClick={() => playSuccessSound()}
                                    >
                                        📝 ทำแบบประเมินความพึงพอใจ
                                    </a>
                                    
                                    <Link
                                        href="/"
                                        className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        กลับหน้าแรก
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
