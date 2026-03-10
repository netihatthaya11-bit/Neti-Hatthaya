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
import { supabase } from "@/lib/supabase";

interface User {
    id: string; // UUID from Supabase
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
    login: (studentId: string) => Promise<{ success: boolean; error?: string }>;
    register: (userData: { name: string; studentId: string; room: string }) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    logVisit: (path: string) => void;
    visitLogs: VisitLog[];
    completedLessons: number[];
    markLessonComplete: (lessonId: number) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [visitLogs, setVisitLogs] = useState<VisitLog[]>([]);
    const [completedLessons, setCompletedLessons] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Load user from localStorage on mount, then sync with Supabase
    useEffect(() => {
        const storedUser = localStorage.getItem("ac_course_user");

        if (storedUser) {
            const parsed = JSON.parse(storedUser) as User;
            setUser(parsed);

            if (parsed.id) {
                fetchUserData(parsed.id);
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUserData = async (userId: string) => {
        try {
            if (!supabase) return;

            const { data: logs } = await supabase
                .from("visit_logs")
                .select("path, visited_at")
                .eq("student_id", userId)
                .order("visited_at", { ascending: true });

            if (logs) {
                setVisitLogs(
                    logs.map((log) => ({
                        path: log.path,
                        timestamp: log.visited_at,
                    }))
                );
            }

            const { data: completed } = await supabase
                .from("completed_lessons")
                .select("lesson_id")
                .eq("student_id", userId);

            if (completed) {
                setCompletedLessons(completed.map((c) => c.lesson_id));
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Login — ค้นหานักเรียนด้วยรหัสนักเรียน
    const login = useCallback(
        async (studentId: string): Promise<{ success: boolean; error?: string }> => {
            try {
                if (!supabase) throw new Error("Supabase client not initialized");

                const { data: existing, error } = await supabase
                    .from("students")
                    .select("*")
                    .eq("student_id", studentId)
                    .single();

                if (error || !existing) {
                    return { success: false, error: "ไม่พบรหัสนักเรียนนี้ในระบบ กรุณาสมัครสมาชิกก่อน" };
                }

                const dbUser: User = {
                    id: existing.id,
                    name: existing.name,
                    studentId: existing.student_id,
                    room: existing.room,
                };

                setUser(dbUser);
                localStorage.setItem("ac_course_user", JSON.stringify(dbUser));
                await fetchUserData(dbUser.id);
                router.push("/");
                return { success: true };
            } catch (error) {
                console.error("Login error:", error);
                return { success: false, error: "เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง" };
            }
        },
        [router]
    );

    // Register — สร้างบัญชีนักเรียนใหม่
    const register = useCallback(
        async (userData: { name: string; studentId: string; room: string }): Promise<{ success: boolean; error?: string }> => {
            try {
                if (!supabase) throw new Error("Supabase client not initialized");

                // ตรวจสอบว่ารหัสนักเรียนซ้ำหรือไม่
                const { data: existing } = await supabase
                    .from("students")
                    .select("id")
                    .eq("student_id", userData.studentId)
                    .single();

                if (existing) {
                    return { success: false, error: "รหัสนักเรียนนี้ถูกใช้งานแล้ว กรุณาเข้าสู่ระบบแทน" };
                }

                // สร้างนักเรียนใหม่
                const { data: newStudent, error } = await supabase
                    .from("students")
                    .insert({
                        name: userData.name,
                        student_id: userData.studentId,
                        room: userData.room,
                    })
                    .select()
                    .single();

                if (error) throw error;

                const dbUser: User = {
                    id: newStudent.id,
                    name: newStudent.name,
                    studentId: newStudent.student_id,
                    room: newStudent.room,
                };

                setUser(dbUser);
                localStorage.setItem("ac_course_user", JSON.stringify(dbUser));
                router.push("/");
                return { success: true };
            } catch (error) {
                console.error("Register error:", error);
                return { success: false, error: "เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองใหม่อีกครั้ง" };
            }
        },
        [router]
    );

    const logout = useCallback(() => {
        setUser(null);
        setVisitLogs([]);
        setCompletedLessons([]);
        localStorage.removeItem("ac_course_user");
        localStorage.removeItem("ac_course_logs");
        localStorage.removeItem("ac_course_completed");
        router.push("/login");
    }, [router]);

    const logVisit = useCallback(
        (path: string) => {
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

            if (user.id && supabase) {
                supabase
                    .from("visit_logs")
                    .insert({ student_id: user.id, path })
                    .then(({ error }) => {
                        if (error) console.error("Error logging visit:", error);
                    });
            }
        },
        [user]
    );

    const markLessonComplete = useCallback(
        (lessonId: number) => {
            setCompletedLessons((prev) => {
                if (!prev.includes(lessonId)) {
                    const updatedCompleted = [...prev, lessonId];
                    localStorage.setItem(
                        "ac_course_completed",
                        JSON.stringify(updatedCompleted)
                    );

                    if (user?.id && supabase) {
                        supabase
                            .from("completed_lessons")
                            .insert({ student_id: user.id, lesson_id: lessonId })
                            .then(({ error }) => {
                                if (error)
                                    console.error("Error marking lesson complete:", error);
                            });
                    }

                    return updatedCompleted;
                }
                return prev;
            });
        },
        [user]
    );

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                logVisit,
                visitLogs,
                completedLessons,
                markLessonComplete,
                loading,
            }}
        >
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
