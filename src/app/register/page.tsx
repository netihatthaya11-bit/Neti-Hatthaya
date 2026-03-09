"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        studentId: "",
        room: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (formData.name && formData.studentId && formData.room) {
            setIsSubmitting(true);
            const result = await register(formData);
            if (!result.success) {
                setErrorMessage(result.error || "เกิดข้อผิดพลาด");
            }
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {["❄", "❅", "❆"].map((s, i) => (
                    <span
                        key={i}
                        className="absolute text-white/10 text-6xl animate-float"
                        style={{
                            left: `${10 + i * 30}%`,
                            top: `${20 + i * 20}%`,
                            animationDelay: `${i}s`,
                        }}
                    >
                        {s}
                    </span>
                ))}
            </div>

            <div className="glass-card w-full max-w-md p-8 rounded-2xl shadow-2xl animate-fade-in-up md:p-10 bg-white/90 backdrop-blur-xl">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">📝</div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                        สมัครสมาชิก
                    </h1>
                    <p className="text-slate-600 text-sm">
                        ลงทะเบียนเพื่อเข้าเรียนวิชางานปรับอากาศรถยนต์
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            ชื่อ-นามสกุล
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-black"
                            placeholder="เช่น นายรักเรียน ขยันยิ่ง"
                            value={formData.name}
                            onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                setErrorMessage("");
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            รหัสนักเรียน
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-black"
                            placeholder="เช่น 662010123"
                            value={formData.studentId}
                            onChange={(e) => {
                                setFormData({ ...formData, studentId: e.target.value });
                                setErrorMessage("");
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            ชั้น/ห้อง
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-black"
                            placeholder="เช่น ปวช. 2/1"
                            value={formData.room}
                            onChange={(e) => {
                                setFormData({ ...formData, room: e.target.value });
                                setErrorMessage("");
                            }}
                        />
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        <span>{isSubmitting ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก & เข้าสู่บทเรียน"}</span>
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                    <p className="text-slate-500 text-sm mb-3">
                        มีบัญชีอยู่แล้ว?
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-bold text-sm transition-colors hover:underline"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        เข้าสู่ระบบ
                    </Link>
                </div>
            </div>
        </div>
    );
}
