"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FormButton from "@/components/FormButton";
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
    const [isCompleted, setIsCompleted] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Initial Check & Logging
    useEffect(() => {
        logVisit(`/lessons/${lesson.id}`);

        // If already completed, set state immediately
        if (completedLessons.includes(lesson.id)) {
            // eslint-disable-next-line
            setIsCompleted(true);
            setTimeLeft(0);
        }
    }, [lesson.id, logVisit, completedLessons]);

    // Timer Logic
    useEffect(() => {
        if (isCompleted) return;

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    setIsCompleted(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isCompleted, lesson.id]);

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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in-up">
                    <span className="text-6xl block mb-4">{lesson.icon}</span>
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
                        {!isCompleted && (
                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-lg font-mono text-sm flex items-center gap-2 animate-pulse">
                                <span>⏳</span>
                                <span>กรุณาดูวิดีโอ: {formatTime(timeLeft)}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm">
                        <div className="text-slate-600">
                            {isCompleted ? (
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
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span>📌</span> ภาพรวม
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                {lesson.content.overview}
                            </p>
                        </div>
                        {lesson.content.overviewImageUrl && (
                            <div className="shrink-0">
                                <div className="w-[180px] h-[180px] rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                                    <img
                                        src={lesson.content.overviewImageUrl}
                                        alt="Overview diagram"
                                        className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => window.open(lesson.content.overviewImageUrl, '_blank')}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
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

                {/* Google Form Embedded + Sheet Button */}
                <div className="glass-card rounded-2xl p-4 sm:p-8 mb-8 animate-fade-in-up overflow-hidden relative">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
                        <span>📝</span> แบบฝึกหัดที่ {lesson.id}
                    </h2>

                    {/* Lock Overlay */}
                    {!isCompleted && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center rounded-xl border border-slate-200 text-center p-4">
                            <span className="text-3xl mb-2">🔒</span>
                            <p className="text-slate-800 font-bold">เนื้อหาถูกล็อก</p>
                            <p className="text-slate-600 text-xs">กรุณาดูวิดีโอหรือศึกษาเนื้อหาให้ครบ {formatTime(timeLeft)} นาที</p>
                        </div>
                    )}

                    <div className="w-full flex justify-center bg-white rounded-xl overflow-hidden shadow-inner mb-6">
                        <iframe 
                            src={getUrl(`lesson_${lesson.id}_formUrl`, lesson.formUrl).replace(/viewform.*$/, "viewform?embedded=true")}
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

                    <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center text-center pb-4">
                        {isCompleted ? (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-slate-800 mb-2">
                                    🎉 ส่งคำตอบแบบฝึกหัดเสร็จแล้วใช่ไหม?
                                </h2>
                                <p className="text-slate-600 text-sm mb-6">
                                    {nextLesson
                                        ? `กดปุ่มด้านล่างเพื่อไปเรียนบทที่ ${nextLesson.id} ต่อได้เลยครับ`
                                        : "ยอดเยี่ยมมาก! กดปุ่มด้านล่างเพื่อไปทำแบบทดสอบหลังเรียน"
                                    }
                                </p>
                                <button
                                    onClick={handleGoToNext}
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-10 py-4 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg shadow-lg"
                                >
                                    <span>
                                        {nextLesson
                                            ? `🔓 ไปบทที่ ${nextLesson.id}`
                                            : "🔓 ไปแบบทดสอบหลังเรียน"
                                        }
                                    </span>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-slate-800 mb-2">
                                    🔒 ศึกษาเนื้อหาเพื่อปลดล็อก
                                </h2>
                                <p className="text-slate-600 text-sm">
                                    กรุณาศึกษาเนื้อหาให้ครบ เหลือเวลา <span className="font-bold text-red-500">{formatTime(timeLeft)}</span> นาที
                                </p>
                            </div>
                        )}
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
