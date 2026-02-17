import Link from "next/link";
import { Lesson } from "@/data/lessonsData";

interface LessonCardProps {
    lesson: Lesson;
    index: number;
}

export default function LessonCard({ lesson, index }: LessonCardProps) {
    return (
        <Link href={`/lessons/${lesson.id}`}>
            <div
                className={`glass-card rounded-2xl p-6 cursor-pointer animate-fade-in-up stagger-${index + 1
                    }`}
            >
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
