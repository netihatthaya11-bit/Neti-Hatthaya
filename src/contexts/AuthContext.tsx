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
    hasCompletedPretest: boolean;
    markPretestComplete: () => void;
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
    const [hasCompletedPretest, setHasCompletedPretest] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const filterOldSessions = (sessionsData: SessionLog[]) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return sessionsData.filter((s) => new Date(s.loginAt) >= thirtyDaysAgo);
    };

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("ac_course_user");

        if (storedUser) {
            const parsed = JSON.parse(storedUser) as User;
            setUser(parsed);

            // โหลด logs จาก localStorage
            const storedLogs = localStorage.getItem("ac_course_logs");
            const storedCompleted = localStorage.getItem(`ac_completed_${parsed.studentId}`);
            const storedPretest = localStorage.getItem(`ac_pretest_${parsed.studentId}`);
            const storedSessions = localStorage.getItem(`ac_sessions_${parsed.studentId}`);
            
            if (storedLogs) setVisitLogs(JSON.parse(storedLogs));
            let loadedCompleted: number[] = [];
            if (storedCompleted) {
                loadedCompleted = JSON.parse(storedCompleted);
                setCompletedLessons(loadedCompleted);
            } else {
                // Fallback for legacy global completed lessons
                const legacyCompleted = localStorage.getItem("ac_course_completed");
                if (legacyCompleted) {
                    loadedCompleted = JSON.parse(legacyCompleted);
                    setCompletedLessons(loadedCompleted);
                    localStorage.setItem(`ac_completed_${parsed.studentId}`, legacyCompleted);
                }
            }

            // Pretest check: also auto-migrate existing users who already have progress
            if (storedPretest === "true" || loadedCompleted.length > 0) {
                setHasCompletedPretest(true);
                localStorage.setItem(`ac_pretest_${parsed.studentId}`, "true");
            }
            if (storedSessions) {
                const parsedSessions = JSON.parse(storedSessions);
                const validSessions = filterOldSessions(parsedSessions);
                if (validSessions.length !== parsedSessions.length) {
                    localStorage.setItem(`ac_sessions_${parsed.studentId}`, JSON.stringify(validSessions));
                }
                setSessions(validSessions);
            }
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

                // Load login session
                const sessionsData = localStorage.getItem(`ac_sessions_${found.studentId}`);
                let userSessions: SessionLog[] = sessionsData ? JSON.parse(sessionsData) : [];
                userSessions = filterOldSessions(userSessions);
                userSessions.push({ loginAt: new Date().toISOString(), logoutAt: null });
                localStorage.setItem(`ac_sessions_${found.studentId}`, JSON.stringify(userSessions));
                setSessions(userSessions);

                // Load completed lessons
                const completedData = localStorage.getItem(`ac_completed_${found.studentId}`);
                if (completedData) {
                    setCompletedLessons(JSON.parse(completedData));
                } else {
                    const legacyCompleted = localStorage.getItem("ac_course_completed");
                    if (legacyCompleted) {
                        setCompletedLessons(JSON.parse(legacyCompleted));
                        localStorage.setItem(`ac_completed_${found.studentId}`, legacyCompleted);
                    } else {
                        setCompletedLessons([]);
                    }
                }

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

                // Initialize completed lessons
                setCompletedLessons([]);

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
        router.push("/login");
    }, [router, user]);

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

    const markLessonComplete = useCallback((lessonId: number) => {
        if (!user) return;
        setCompletedLessons((prev) => {
            if (prev.includes(lessonId)) return prev;
            const newCompleted = [...prev, lessonId];
            localStorage.setItem(`ac_completed_${user.studentId}`, JSON.stringify(newCompleted));
            return newCompleted;
        });
    }, [user]);

    const markPretestComplete = useCallback(() => {
        if (!user) return;
        setHasCompletedPretest(true);
        localStorage.setItem(`ac_pretest_${user.studentId}`, "true");
    }, [user]);

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
                hasCompletedPretest,
                markPretestComplete,
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
