"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FormButton from "@/components/FormButton";
import ConfettiEffect from "@/components/ConfettiEffect";
import { playSuccessSound } from "@/utils/soundEffects";
import { useAuth } from "@/contexts/AuthContext";
import { useLinkSettings } from "@/contexts/LinkSettingsContext";
import { Lesson } from "@/data/lessonsData";

interface LessonContentProps {
    lesson: Lesson;
    prevLesson?: Lesson;
    nextLesson?: Lesson;
}

export default function LessonContent({
    lesson,
    prevLesson,
    nextLesson,
}: LessonContentProps) {
    const { logVisit, completedLessons, markLessonComplete } = useAuth();
    const { getUrl } = useLinkSettings();
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(lesson.minDuration);
    const [isTimerDone, setIsTimerDone] = useState(false);
    const [isTestingPhase, setIsTestingPhase] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isFocused, setIsFocused] = useState(true);
    const [showFocusWarning, setShowFocusWarning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const isAlreadyPassed = completedLessons.includes(lesson.id);

    // Initial Check & Logging
    useEffect(() => {
        logVisit(`/lessons/${lesson.id}`);

        // If already completed previously, set state immediately
        if (isAlreadyPassed) {
            setIsTimerDone(true);
            setTimeLeft(0);
        }
    }, [lesson.id, logVisit, isAlreadyPassed]);

    // Timer Logic
    useEffect(() => {
        if (isAlreadyPassed || isTimerDone || !isFocused) return;

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    setIsTimerDone(true);
                    setShowConfetti(true);
                    playSuccessSound(); // Play the success ding!
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isAlreadyPassed, isTimerDone, isFocused]);

    // Focus Mode Logic (Anti-Cheat)
    useEffect(() => {
        if (isAlreadyPassed || isTimerDone) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsFocused(false);
                setShowFocusWarning(true);
            }
        };

        const handleBlur = () => {
            setIsFocused(false);
            setShowFocusWarning(true);
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
        };
    }, [isAlreadyPassed, isTimerDone]);

    const handleResumeFocus = () => {
        setShowFocusWarning(false);
        setIsFocused(true);
    };

    const handleStartTest = () => {
        setIsTestingPhase(true);
    };

    // Handle "ไปบทถัดไป" button click
    const handleGoToNext = () => {
        markLessonComplete(lesson.id);
        if (nextLesson) {
            router.push(`/lessons/${nextLesson.id}`);
        } else {
            router.push("/posttest");
        }
    };

    // Format time (mm:ss)
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    return (
        <div className="gradient-cool min-h-screen py-12">
            {/* Confetti Effect */}
            <ConfettiEffect 
                show={showConfetti} 
                message="🎉 ปลดล็อกสำเร็จ!" 
                subMessage={`คุณสามารถทำแบบฝึกหัดบทที่ ${lesson.id} ได้แล้ว!`}
            />

            {/* Focus Mode Warning Overlay */}
            {showFocusWarning && !isTimerDone && !isAlreadyPassed && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in-up">
                    <div className="glass-card rounded-3xl p-8 max-w-md w-full shadow-2xl border border-rose-500/30 text-center relative overflow-hidden transform animate-scale-in">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-rose-500/20 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-orange-500/20 blur-2xl"></div>

                        <div className="relative z-10">
                            <div className="w-20 h-20 mx-auto bg-rose-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-rose-500/20 animate-wiggle">
                                🛑
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">
                                ระบบหยุดเวลาชั่วคราว
                            </h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                ตรวจพบการพับหน้าจอหรือสลับแอปพลิเคชันอื่น กรุณาเปิดหน้าจอนี้ค้างไว้เพื่อเรียนต่อให้จบและปลดล็อกแบบฝึกหัด
                            </p>
                            
                            <button
                                onClick={handleResumeFocus}
                                className="inline-flex items-center justify-center w-full gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold px-6 py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-lg shadow-rose-500/25"
                            >
                                🎯 ฉันกลับมาเรียนต่อแล้ว
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Exam Phase Alert Overlay (If Taking Test) */}
                {isTestingPhase && !isAlreadyPassed && (
                    <div className="glass-card rounded-2xl p-6 mb-8 mt-4 text-center border border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg animate-fade-in-down">
                        <div className="text-4xl mb-3 animate-bounce">🤫</div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">เข้าสู่โหมดการทำแบบฝึกหัด</h2>
                        <p className="text-slate-600 mb-0">เนื้อหาทั้งหมดถูกซ่อนชั่วคราว ระบบจะแสดงเนื้อหาให้สามารถทบทวนได้อีกครั้งหลังจากส่งคำตอบเรียบร้อยแล้ว</p>
                    </div>
                )}

                {/* Hide Content condition wrapper */}
                <div className={`${(isTestingPhase && !isAlreadyPassed) ? "hidden" : "block"} transition-all duration-500`}>
                    {/* Header */}
                <div className="text-center mb-8 animate-fade-in-up">
                    <span className="text-6xl sm:text-[80px] leading-tight block mb-4 sm:mb-6 animate-float-rotate">
                        {lesson.icon}
                    </span>
                    <div className="inline-block mb-3">
                        <span
                            className={`bg-gradient-to-r ${lesson.color} text-white text-sm font-bold px-4 py-1.5 rounded-full`}
                        >
                            บทที่ {lesson.id}
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
                        {lesson.title}
                    </h1>
                    <p className="text-slate-600 max-w-lg mx-auto">
                        {lesson.description}
                    </p>
                </div>

                {/* Video Player */}
                <div className="glass-card rounded-2xl p-4 mb-8 animate-fade-in-up shadow-lg">
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/10 relative">
                        {(() => {
                            const getEmbedUrl = (url: string) => {
                                if (url.includes("youtube.com/watch?v=")) {
                                    return url.replace("watch?v=", "embed/");
                                }
                                if (url.includes("youtu.be/")) {
                                    return url.replace("youtu.be/", "www.youtube.com/embed/");
                                }
                                return url;
                            };
                            const videoUrl = getUrl(`lesson_${lesson.id}_videoUrl`, lesson.videoUrl);
                            const embedUrl = getEmbedUrl(videoUrl);
                            const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
                            const isMurf = videoUrl.includes("murf.ai");

                            return isYouTube ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={embedUrl}
                                    title={lesson.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0"
                                ></iframe>
                            ) : isMurf ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={videoUrl}
                                    title={lesson.title}
                                    frameBorder="0"
                                    allow="autoplay"
                                    allowFullScreen
                                    className="absolute inset-0"
                                ></iframe>
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-500">
                                    <p>Video Placeholder: {lesson.videoUrl}</p>
                                </div>
                            );
                        })()}

                        {/* Timer Overlay (if not completed) */}
                        {!isTimerDone && !isAlreadyPassed && (
                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-lg font-mono text-sm flex items-center gap-2 animate-pulse">
                                <span>⏳</span>
                                <span>กรุณาดูวิดีโอ: {formatTime(timeLeft)}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm">
                        <div className="text-slate-600">
                            {isTimerDone || isAlreadyPassed ? (
                                <span className="text-green-600 font-bold flex items-center gap-1">
                                    ✓ เรียนครบตามเวลาแล้ว
                                </span>
                            ) : (
                                <span className="text-amber-600 font-bold">
                                    ⚠️ กรุณาศึกษาเนื้อหาให้ครบตามเวลาที่กำหนด
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up stagger-1">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span>📌</span> ภาพรวม
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        {lesson.content.overview}
                    </p>
                    {lesson.content.overviewImageUrl && (
                        <div className="flex justify-center w-full">
                            <div className="rounded-xl overflow-hidden shadow-md bg-white border border-slate-100 flex items-center justify-center p-4 max-w-[400px]">
                                <img
                                    src={lesson.content.overviewImageUrl}
                                    alt="Overview diagram"
                                    className="w-full h-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                                    onClick={() => window.open(lesson.content.overviewImageUrl, '_blank')}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Topics */}
                <div className="space-y-6 mb-8">
                    {lesson.content.topics.map((topic, index) => (
                        <div
                            key={index}
                            className={`glass-card rounded-2xl p-8 animate-fade-in-up stagger-${index + 2
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${lesson.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                                >
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-800 mb-3">
                                        {topic.title}
                                    </h3>
                                    
                                    {topic.imageUrl && (
                                        <div className="-ml-[56px] w-[calc(100%+56px)] flex justify-center my-6">
                                            <div className="w-[200px] h-[200px] rounded-xl overflow-hidden shadow-md bg-white border border-slate-100 flex items-center justify-center p-2">
                                                <img
                                                    src={topic.imageUrl}
                                                    alt={topic.title}
                                                    className="max-w-full max-h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                                                    onClick={() => window.open(topic.imageUrl!, '_blank')}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        {topic.detail}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Key Points */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span>⚡</span> จุดสำคัญที่ต้องจำ
                    </h2>
                    <div className="space-y-3">
                        {lesson.content.keyPoints.map((point, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-3 rounded-xl bg-primary/5"
                            >
                                <span className="text-primary font-bold text-sm mt-0.5">
                                    ✓
                                </span>
                                <span className="text-slate-700 text-sm">{point}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* End of Hideable Content Wrapper */}
                </div>

                {/* Google Form Embedded + Sheet Button */}
                <div className="glass-card rounded-2xl p-4 sm:p-8 mb-8 animate-fade-in-up overflow-hidden relative" id="test-section">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
                        <span>📝</span> แบบฝึกหัดที่ {lesson.id}
                    </h2>

                    {/* Lock Overlay OR Start Test Phase */}
                    {(!isAlreadyPassed && !isTestingPhase) && (
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md z-20 flex flex-col items-center justify-center rounded-xl p-4 transition-all duration-500 group">
                            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full border-b-8 border-amber-400 text-center transform group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-amber-400 animate-pulse"></div>
                                
                                {!isTimerDone ? (
                                    <>
                                        <span className="text-6xl mb-4 block animate-bounce" style={{ animationDuration: '2s' }}>⏳</span>
                                        <h3 className="text-xl font-bold text-slate-800 mb-3">
                                            ยังไม่สามารถทำแบบฝึกหัดได้
                                        </h3>
                                        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                            คุณต้องศึกษาเนื้อหาและดูวิดีโอให้ครบตามเวลาที่กำหนด เพื่อปลดล็อกแบบฝึกหัดนี้
                                        </p>
                                        <div className="bg-amber-50 text-amber-700 py-3 px-6 rounded-xl font-mono text-2xl font-bold border border-amber-200 inline-block shadow-inner animate-pulse">
                                            {formatTime(timeLeft)}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-6xl mb-4 block animate-bounce">🎓</span>
                                        <h3 className="text-xl font-bold text-slate-800 mb-3">
                                            ได้เวลาทำแบบประเมิน!
                                        </h3>
                                        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                            คุณพักเบรกดูบทเรียนได้ครบแล้ว กรุณากดปุ่มด้านล่างเพื่อเริ่มทำข้อสอบ (เนื้อหาบทเรียนด้านบนจะถูกซ่อนไว้)
                                        </p>
                                        <button 
                                            onClick={handleStartTest}
                                            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-6 py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                                        >
                                            👉 เริ่มทำแบบฝึกหัด!
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="w-full flex justify-center bg-white rounded-xl overflow-hidden shadow-inner mb-6">
                        <iframe 
                            src={getUrl(`lesson_${lesson.id}_formUrl`, lesson.formUrl).replace(/viewform.*$/, "viewform?embedded=true")}
                            width="100%" 
                            height="1000" 
                            frameBorder="0" 
                            marginHeight={0} 
                            marginWidth={0}
                            className="w-full max-w-3xl min-h-[60vh] md:min-h-[800px]"
                        >
                            กำลังโหลด…
                        </iframe>
                    </div>

                    <div className="mt-4 flex justify-center text-center">
                        {(isAlreadyPassed || isTestingPhase) ? (
                            <div className="w-full">
                                <button
                                    onClick={handleGoToNext}
                                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-10 py-5 w-full max-w-xl rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg shadow-lg border border-teal-400"
                                >
                                    <span>
                                        {nextLesson
                                            ? `✅ ส่งคำตอบแล้ว? คลิกเพื่อไปเรียนบทถัดไป`
                                            : "✅ ส่งคำตอบแล้ว? คลิกไปทำแบบทดสอบหลังเรียน"
                                        }
                                    </span>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center animate-fade-in-up">
                    {prevLesson ? (
                        <Link
                            href={`/lessons/${prevLesson.id}`}
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium"
                        >
                            ← บทที่ {prevLesson.id}
                        </Link>
                    ) : (
                        <Link
                            href="/pretest"
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium"
                        >
                            ← แบบทดสอบก่อนเรียน
                        </Link>
                    )}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium"
                    >
                        🏠 หน้าแรก
                    </Link>
                </div>
            </div>
        </div>
    );
}
