"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    studentId: string;
    room: string;
}

interface VisitLog {
    path: string;
    timestamp: string;
}

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    logVisit: (path: string) => void;
    visitLogs: VisitLog[];
    completedLessons: number[];
    markLessonComplete: (lessonId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [visitLogs, setVisitLogs] = useState<VisitLog[]>([]);
    const [completedLessons, setCompletedLessons] = useState<number[]>([]);
    const router = useRouter();

    // Load user and logs from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("ac_course_user");
        const storedLogs = localStorage.getItem("ac_course_logs");
        const storedCompleted = localStorage.getItem("ac_course_completed");

        if (storedUser) {
            // eslint-disable-next-line
            setUser(JSON.parse(storedUser));
        }
        if (storedLogs) {
            setVisitLogs(JSON.parse(storedLogs));
        }
        if (storedCompleted) {
            setCompletedLessons(JSON.parse(storedCompleted));
        }
    }, []);

    const login = useCallback((newUser: User) => {
        setUser(newUser);
        localStorage.setItem("ac_course_user", JSON.stringify(newUser));
        router.push("/");
    }, [router]);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("ac_course_user");
        router.push("/login");
    }, [router]);

    const logVisit = useCallback((path: string) => {
        if (!user) return;

        const newLog = {
            path,
            timestamp: new Date().toISOString(),
        };

        setVisitLogs((prevLogs) => {
            const updatedLogs = [...prevLogs, newLog];
            localStorage.setItem("ac_course_logs", JSON.stringify(updatedLogs));
            return updatedLogs;
        });
    }, [user]);

    const markLessonComplete = useCallback((lessonId: number) => {
        setCompletedLessons((prev) => {
            if (!prev.includes(lessonId)) {
                const updatedCompleted = [...prev, lessonId];
                localStorage.setItem("ac_course_completed", JSON.stringify(updatedCompleted));
                return updatedCompleted;
            }
            return prev;
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, logVisit, visitLogs, completedLessons, markLessonComplete }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
