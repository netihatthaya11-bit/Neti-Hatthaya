"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import FormButton from "@/components/FormButton";
import { useAuth } from "@/contexts/AuthContext";
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
                    markLessonComplete(lesson.id);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isCompleted, lesson.id, markLessonComplete]);

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
                            const embedUrl = getEmbedUrl(lesson.videoUrl);
                            const isYouTube = lesson.videoUrl.includes("youtube.com") || lesson.videoUrl.includes("youtu.be");
                            const isMurf = lesson.videoUrl.includes("murf.ai");

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
                                    src={lesson.videoUrl}
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
                                <div className="flex-1 w-full flex flex-col items-center md:items-start md:flex-none md:w-auto md:flex-1">
                                    <h3 className={`text-lg font-bold text-slate-800 mb-3 ${lesson.id === 1 ? 'text-center md:text-left w-full' : ''}`}>
                                        {topic.title}
                                    </h3>
                                    {topic.imageUrl && (
                                        <div className={`my-3 ${lesson.id === 1 ? 'flex justify-center w-full' : ''}`}>
                                            <div className="w-[180px] h-[180px] rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                                                <img
                                                    src={topic.imageUrl}
                                                    alt={topic.title}
                                                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                                    onClick={() => window.open(topic.imageUrl, '_blank')}
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

                {/* Google Form / Sheet Buttons */}
                <div className="glass-card rounded-2xl p-8 mb-8 animate-fade-in-up">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span>📎</span> แบบฝึกหัด & เอกสาร
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 relative">
                        {/* Lock Overlay */}
                        {!isCompleted && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center rounded-xl border border-slate-200 text-center p-4">
                                <span className="text-3xl mb-2">🔒</span>
                                <p className="text-slate-800 font-bold">เนื้อหาถูกล็อก</p>
                                <p className="text-slate-600 text-xs">กรุณาดูวิดีโอหรือศึกษาเนื้อหาให้ครบ {formatTime(timeLeft)} นาที</p>
                            </div>
                        )}

                        <FormButton
                            label={`แบบฝึกหัดที่ ${lesson.id}`}
                            url={lesson.formUrl}
                            icon="form"
                            variant="primary"
                        />
                        <FormButton
                            label="ดูคะแนน / เอกสาร"
                            url={lesson.sheetUrl}
                            icon="sheet"
                            variant="secondary"
                        />
                        {lesson.uploadUrl && (
                            <FormButton
                                label="ส่งวิดีโอปฏิบัติ"
                                url={lesson.uploadUrl}
                                icon="upload"
                                variant="upload"
                            />
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

                    {nextLesson ? (
                        <Link
                            href={`/lessons/${nextLesson.id}`}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                        >
                            บทที่ {nextLesson.id} →
                        </Link>
                    ) : (
                        <div className="relative">
                            {!isCompleted && (
                                <div className="absolute inset-0 bg-white/80 z-20 cursor-not-allowed rounded-xl"></div>
                            )}
                            <Link
                                href="/posttest"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                            >
                                แบบทดสอบหลังเรียน →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
