"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        studentId: "",
        room: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.studentId && formData.room) {
            // Login locally
            login(formData);
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
                    <div className="text-6xl mb-4">❄️</div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                        ลงทะเบียนเข้าเรียน
                    </h1>
                    <p className="text-slate-600 text-sm">
                        วิชางานปรับอากาศรถยนต์
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormData({ ...formData, studentId: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormData({ ...formData, room: e.target.value })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <span>ลงทะเบียน & เข้าสู่บทเรียน</span>
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

                <p className="mt-6 text-center text-xs text-slate-500">
                    เข้าสู่บทเรียนโดยตรงเพื่อเริ่มการเรียนรู้
                </p>
            </div>
        </div>
    );
}
