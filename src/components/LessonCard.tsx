"use client";

import Link from "next/link";
import { Lesson } from "@/data/lessonsData";
import { useAuth } from "@/contexts/AuthContext";

interface LessonCardProps {
    lesson: Lesson;
    index: number;
}

export default function LessonCard({ lesson, index }: LessonCardProps) {
    const { completedLessons } = useAuth();

    // บทที่ 1 ปลดล็อกเสมอ, บทอื่นต้องจบบทก่อนหน้า
    const isUnlocked = lesson.id === 1 || completedLessons.includes(lesson.id - 1);
    const isCompleted = completedLessons.includes(lesson.id);

    if (!isUnlocked) {
        // ล็อก — กดไม่ได้
        return (
            <div
                className={`glass-card rounded-2xl p-6 animate-fade-in-up stagger-${index + 1} opacity-50 cursor-not-allowed relative`}
            >
                {/* Lock Overlay */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-2xl">
                    <div className="text-center">
                        <span className="text-4xl block mb-2">🔒</span>
                        <p className="text-slate-600 text-xs font-medium">
                            เรียนบทที่ {lesson.id - 1} ให้จบก่อน
                        </p>
                    </div>
                </div>

                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl grayscale">{lesson.icon}</span>
                    <span className="bg-slate-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                        บทที่ {lesson.id}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-slate-400 mb-2 leading-snug">
                    {lesson.shortTitle}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {lesson.description}
                </p>
            </div>
        );
    }

    return (
        <Link href={`/lessons/${lesson.id}`}>
            <div
                className={`glass-card rounded-2xl p-6 cursor-pointer animate-fade-in-up stagger-${index + 1} relative`}
            >
                {/* Completed Badge */}
                {isCompleted && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
                        ✓ เรียนจบแล้ว
                    </div>
                )}

                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                        {lesson.icon}
                    </span>
                    <span
                        className={`bg-gradient-to-r ${lesson.color} text-white text-xs font-bold px-3 py-1 rounded-full`}
                    >
                        บทที่ {lesson.id}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug">
                    {lesson.shortTitle}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {lesson.description}
                </p>

                {/* Topics count */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <span>{lesson.content.topics.length} หัวข้อ</span>
                    <span className="text-slate-300">|</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                    <span>{lesson.content.keyPoints.length} จุดสำคัญ</span>
                </div>

                {/* Hover Arrow */}
                <div className="mt-4 flex items-center gap-1 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>อ่านเพิ่มเติม</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
