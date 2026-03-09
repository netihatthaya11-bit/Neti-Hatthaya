"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface LessonLockedProps {
    lessonId: number;
}

export default function LessonLocked({ lessonId }: LessonLockedProps) {
    const { completedLessons } = useAuth();
    const router = useRouter();

    const isUnlocked = lessonId === 1 || completedLessons.includes(lessonId - 1);

    useEffect(() => {
        if (!isUnlocked) {
            router.replace("/");
        }
    }, [isUnlocked, router]);

    // This component only renders to perform the redirect check
    // The actual content is rendered by LessonContent
    return null;
}
