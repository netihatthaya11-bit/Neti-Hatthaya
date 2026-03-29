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
    id: string;
    name: string;
    studentId: string;
    room: string;
}

export interface SessionLog {
    loginAt: string;
    logoutAt: string | null;
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
    sessions: SessionLog[];
    completedLessons: number[];
    markLessonComplete: (lessonId: number) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper: ดึงรายชื่อสมาชิกทั้งหมดจาก localStorage
function getAllStudents(): User[] {
    try {
        const data = localStorage.getItem("ac_all_students");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

// Helper: บันทึกรายชื่อสมาชิกทั้งหมด
function saveAllStudents(students: User[]) {
    localStorage.setItem("ac_all_students", JSON.stringify(students));
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [sessions, setSessions] = useState<SessionLog[]>([]);
    const [visitLogs, setVisitLogs] = useState<VisitLog[]>([]);
    const [completedLessons, setCompletedLessons] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("ac_course_user");

        if (storedUser) {
            const parsed = JSON.parse(storedUser) as User;
            setUser(parsed);

            // โหลด logs และ completed จาก localStorage
            const storedLogs = localStorage.getItem("ac_course_logs");
            const storedCompleted = localStorage.getItem("ac_course_completed");
            const storedSessions = localStorage.getItem(`ac_sessions_${parsed.studentId}`);
            
            if (storedLogs) setVisitLogs(JSON.parse(storedLogs));
            if (storedCompleted) setCompletedLessons(JSON.parse(storedCompleted));
            if (storedSessions) setSessions(JSON.parse(storedSessions));
        }
        setLoading(false);
    }, []);

    // Login — ค้นหานักเรียนจาก localStorage
    const login = useCallback(
        async (studentId: string): Promise<{ success: boolean; error?: string }> => {
            try {
                const students = getAllStudents();
                const found = students.find(
                    (s) => s.studentId.trim() === studentId.trim()
                );

                if (!found) {
                    return {
                        success: false,
                        error: "ไม่พบรหัสนักเรียนนี้ในระบบ กรุณาสมัครสมาชิกก่อน",
                    };
                }

                setUser(found);
                localStorage.setItem("ac_course_user", JSON.stringify(found));

                // Add login session
                const sessionsData = localStorage.getItem(`ac_sessions_${found.studentId}`);
                let userSessions: SessionLog[] = sessionsData ? JSON.parse(sessionsData) : [];
                userSessions.push({ loginAt: new Date().toISOString(), logoutAt: null });
                localStorage.setItem(`ac_sessions_${found.studentId}`, JSON.stringify(userSessions));
                setSessions(userSessions);

                router.push("/");
                return { success: true };
            } catch (error) {
                console.error("Login error:", error);
                return { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" };
            }
        },
        [router]
    );

    // Register — สมัครสมาชิกเก็บลง localStorage
    const register = useCallback(
        async (userData: { name: string; studentId: string; room: string }): Promise<{ success: boolean; error?: string }> => {
            try {
                const students = getAllStudents();

                // ตรวจสอบรหัสซ้ำ
                const existing = students.find(
                    (s) => s.studentId.trim() === userData.studentId.trim()
                );
                if (existing) {
                    return {
                        success: false,
                        error: "รหัสนักเรียนนี้ถูกใช้งานแล้ว กรุณาเข้าสู่ระบบแทน",
                    };
                }

                // สร้าง user ใหม่
                const newUser: User = {
                    id: "user_" + Date.now(),
                    name: userData.name,
                    studentId: userData.studentId,
                    room: userData.room,
                };

                // บันทึกลง list ทั้งหมด
                students.push(newUser);
                saveAllStudents(students);

                // ตั้ง current user
                setUser(newUser);
                localStorage.setItem("ac_course_user", JSON.stringify(newUser));

                // Add initial login session
                let userSessions: SessionLog[] = [];
                userSessions.push({ loginAt: new Date().toISOString(), logoutAt: null });
                localStorage.setItem(`ac_sessions_${newUser.studentId}`, JSON.stringify(userSessions));
                setSessions(userSessions);

                router.push("/");
                return { success: true };
            } catch (error) {
                console.error("Register error:", error);
                return { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" };
            }
        },
        [router]
    );

    const logout = useCallback(() => {
        if (user) {
            const sessionsData = localStorage.getItem(`ac_sessions_${user.studentId}`);
            if (sessionsData) {
                let userSessions: SessionLog[] = JSON.parse(sessionsData);
                if (userSessions.length > 0) {
                    userSessions[userSessions.length - 1].logoutAt = new Date().toISOString();
                    localStorage.setItem(`ac_sessions_${user.studentId}`, JSON.stringify(userSessions));
                    setSessions(userSessions);
                }
            }
        }

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
                    return updatedCompleted;
                }
                return prev;
            });
        },
        []
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
                sessions,
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
