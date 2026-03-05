import { notFound } from "next/navigation";
import { lessons } from "@/data/lessonsData";
import LessonContent from "@/components/LessonContent";
import LessonLocked from "@/components/LessonLocked";

interface LessonPageProps {
    params: Promise<{ id: string }>;
}

export function generateStaticParams() {
    return lessons.map((lesson) => ({
        id: String(lesson.id),
    }));
}

export default async function LessonPage({ params }: LessonPageProps) {
    const { id } = await params;
    const lessonId = parseInt(id);
    const lesson = lessons.find((l) => l.id === lessonId);

    if (!lesson) {
        notFound();
    }

    const prevLesson = lessons.find((l) => l.id === lessonId - 1);
    const nextLesson = lessons.find((l) => l.id === lessonId + 1);

    return (
        <>
            <LessonLocked lessonId={lessonId} />
            <LessonContent
                lesson={lesson}
                prevLesson={prevLesson}
                nextLesson={nextLesson}
            />
        </>
    );
}
