"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface LessonLockedProps {
    lessonId: number;
}

export default function LessonLocked({ lessonId }: LessonLockedProps) {
    const { completedLessons, hasCompletedPretest, loading } = useAuth();
    const router = useRouter();

    const isUnlocked = hasCompletedPretest ? (lessonId === 1 || completedLessons.includes(lessonId - 1)) : false;

    useEffect(() => {
        // Wait for Auth context to finish loading from localStorage
        if (loading) return;

        if (!isUnlocked) {
            router.replace("/");
        }
    }, [isUnlocked, router, loading]);

    // This component only renders to perform the redirect check
    // The actual content is rendered by LessonContent
    return null;
}
