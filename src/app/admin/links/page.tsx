"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLinkSettings } from "@/contexts/LinkSettingsContext";
import { lessons, courseInfo } from "@/data/lessonsData";

// กำหนด key ทั้งหมดที่ใช้ในระบบ
const LINK_KEYS = [
    // Pre-test / Post-test
    { key: "pretest_formUrl", label: "แบบทดสอบก่อนเรียน (Google Form)", category: "แบบทดสอบ", fallback: courseInfo.pretestFormUrl },
    { key: "pretest_sheetUrl", label: "ดูคะแนนก่อนเรียน (Google Sheet)", category: "แบบทดสอบ", fallback: courseInfo.pretestSheetUrl },
    { key: "posttest_formUrl", label: "แบบทดสอบหลังเรียน (Google Form)", category: "แบบทดสอบ", fallback: courseInfo.posttestFormUrl },
    { key: "posttest_sheetUrl", label: "ดูคะแนนหลังเรียน (Google Sheet)", category: "แบบทดสอบ", fallback: courseInfo.posttestSheetUrl },
    // Lesson 1-4
    ...lessons.flatMap((lesson) => [
        { key: `lesson_${lesson.id}_videoUrl`, label: `วิดีโอ YouTube`, category: `บทที่ ${lesson.id}: ${lesson.shortTitle}`, fallback: lesson.videoUrl },
        { key: `lesson_${lesson.id}_formUrl`, label: `แบบฝึกหัด (Google Form)`, category: `บทที่ ${lesson.id}: ${lesson.shortTitle}`, fallback: lesson.formUrl },
        { key: `lesson_${lesson.id}_sheetUrl`, label: `ดูคะแนน (Google Sheet)`, category: `บทที่ ${lesson.id}: ${lesson.shortTitle}`, fallback: lesson.sheetUrl },
        { key: `lesson_${lesson.id}_uploadUrl`, label: `อัปโหลดวิดีโอ`, category: `บทที่ ${lesson.id}: ${lesson.shortTitle}`, fallback: lesson.uploadUrl || "" },
    ]),
];

// จับกลุ่มตาม category
const groupedKeys = LINK_KEYS.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
}, {} as Record<string, typeof LINK_KEYS>);

const ADMIN_PASSWORD = "neti2026";

export default function AdminLinksPage() {
    const { allSettings, setUrl, reload, loading } = useLinkSettings();
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState<string | null>(null);
    const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
    const [savingAll, setSavingAll] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const router = useRouter();

    // Initialize form values with DB settings or fallbacks
    useEffect(() => {
        const values: Record<string, string> = {};
        LINK_KEYS.forEach((item) => {
            values[item.key] = allSettings[item.key] || item.fallback;
        });
        setFormValues(values);
    }, [allSettings]);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            setPasswordError("");
        } else {
            setPasswordError("รหัสผ่านไม่ถูกต้อง");
        }
    };

    const handleSave = async (key: string) => {
        setSaving(key);
        try {
            await setUrl(key, formValues[key]);
            setSavedKeys((prev) => new Set(prev).add(key));
            setTimeout(() => {
                setSavedKeys((prev) => {
                    const next = new Set(prev);
                    next.delete(key);
                    return next;
                });
            }, 2000);
        } catch {
            alert("เกิดข้อผิดพลาดในการบันทึก");
        } finally {
            setSaving(null);
        }
    };

    const handleSaveAll = async () => {
        setSavingAll(true);
        try {
            for (const item of LINK_KEYS) {
                if (formValues[item.key] && formValues[item.key] !== item.fallback) {
                    await setUrl(item.key, formValues[item.key]);
                }
            }
            await reload();
            alert("บันทึกทั้งหมดเรียบร้อยแล้ว!");
        } catch {
            alert("เกิดข้อผิดพลาดในการบันทึก");
        } finally {
            setSavingAll(false);
        }
    };

    // Password Screen
    if (!authenticated) {
        return (
            <div className="min-h-screen gradient-cool flex items-center justify-center p-4">
                <div className="glass-card w-full max-w-sm p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-xl">
                    <div className="text-center mb-6">
                        <div className="text-5xl mb-3">🔐</div>
                        <h1 className="text-xl font-bold text-slate-800">หน้าจัดการระบบ</h1>
                        <p className="text-slate-500 text-sm mt-1">กรุณาใส่รหัสผ่านเพื่อเข้าถึง</p>
                    </div>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-black"
                            placeholder="รหัสผ่าน"
                            autoFocus
                        />
                        {passwordError && (
                            <p className="text-red-500 text-sm text-center">{passwordError}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all"
                        >
                            เข้าสู่ระบบ
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="w-full text-slate-500 text-sm hover:text-primary transition-colors"
                        >
                            ← กลับหน้าแรก
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen gradient-cool flex items-center justify-center">
                <div className="text-center">
                    <div className="text-5xl mb-4 animate-spin">⚙️</div>
                    <p className="text-slate-600 font-medium">กำลังโหลดข้อมูล...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="gradient-cool min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 animate-fade-in-up">
                    <span className="text-5xl block mb-3">⚙️</span>
                    <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                        จัดการลิงก์ภายนอก
                    </h1>
                    <p className="text-slate-500 text-sm">
                        แก้ไข URL ของวิดีโอ, แบบฝึกหัด, ดูคะแนน และอัปโหลด • บันทึกลงฐานข้อมูล Supabase
                    </p>
                </div>

                {/* Save All Button */}
                <div className="flex justify-end mb-6 animate-fade-in-up">
                    <button
                        onClick={handleSaveAll}
                        disabled={savingAll}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {savingAll ? (
                            <>
                                <span className="animate-spin">⏳</span>
                                <span>กำลังบันทึก...</span>
                            </>
                        ) : (
                            <>
                                <span>💾</span>
                                <span>บันทึกทั้งหมด</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Link Groups */}
                {Object.entries(groupedKeys).map(([category, items], groupIndex) => (
                    <div
                        key={category}
                        className="glass-card rounded-2xl p-6 sm:p-8 mb-6 animate-fade-in-up bg-white/90"
                        style={{ animationDelay: `${groupIndex * 0.1}s` }}
                    >
                        <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                            <span>{category.startsWith("บทที่") ? "📖" : "📋"}</span>
                            {category}
                        </h2>

                        <div className="space-y-4">
                            {items.map((item) => {
                                const isModified = formValues[item.key] !== item.fallback;
                                const isSaved = savedKeys.has(item.key);
                                const isSaving = saving === item.key;

                                return (
                                    <div key={item.key}>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label className="text-sm font-medium text-slate-700">
                                                {item.label}
                                            </label>
                                            <div className="flex items-center gap-2">
                                                {isModified && (
                                                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                                        แก้ไขแล้ว
                                                    </span>
                                                )}
                                                {isSaved && (
                                                    <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                        ✓ บันทึกแล้ว
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="url"
                                                value={formValues[item.key] || ""}
                                                onChange={(e) =>
                                                    setFormValues((prev) => ({
                                                        ...prev,
                                                        [item.key]: e.target.value,
                                                    }))
                                                }
                                                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-black text-sm font-mono"
                                                placeholder="https://..."
                                            />
                                            <button
                                                onClick={() => handleSave(item.key)}
                                                disabled={isSaving}
                                                className="px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors text-sm font-medium shrink-0 disabled:opacity-50"
                                            >
                                                {isSaving ? "⏳" : "💾"}
                                            </button>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1 truncate">
                                            ค่าเดิม: {item.fallback || "(ไม่มี)"}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Footer */}
                <div className="flex justify-between items-center mt-8 animate-fade-in-up">
                    <button
                        onClick={() => router.push("/")}
                        className="text-slate-500 hover:text-primary transition-colors font-medium"
                    >
                        ← กลับหน้าแรก
                    </button>
                    <p className="text-slate-400 text-xs">
                        ลิงก์ทั้งหมด {LINK_KEYS.length} รายการ
                    </p>
                </div>
            </div>
        </div>
    );
}
