"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface LessonLockedProps {
    lessonId: number;
}

export default function LessonLocked({ lessonId }: LessonLockedProps) {
    const { completedLessons, hasCompletedPretest } = useAuth();
    const router = useRouter();

    const isUnlocked = hasCompletedPretest ? (lessonId === 1 || completedLessons.includes(lessonId - 1)) : false;

    useEffect(() => {
        if (!isUnlocked) {
            router.replace("/");
        }
    }, [isUnlocked, router]);

    // This component only renders to perform the redirect check
    // The actual content is rendered by LessonContent
    return null;
}
