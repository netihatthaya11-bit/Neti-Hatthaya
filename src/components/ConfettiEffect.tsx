"use client";

import { useEffect, useState } from "react";

interface ConfettiEffectProps {
    show: boolean;
    message?: string;
    subMessage?: string;
}

export default function ConfettiEffect({ show, message = "🎉 ยินดีด้วย!", subMessage = "คุณทำได้สำเร็จแล้ว!" }: ConfettiEffectProps) {
    const [visible, setVisible] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; color: string; size: number; duration: number }>>([]);

    useEffect(() => {
        if (show) {
            setVisible(true);
            const colors = [
                "#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
                "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE",
                "#85C1E9", "#F8C471", "#82E0AA", "#F1948A", "#AED6F1"
            ];
            const newParticles = Array.from({ length: 80 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 10 + 5,
                duration: Math.random() * 2 + 2,
            }));
            setParticles(newParticles);

            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            {/* Confetti particles */}
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.left}%`,
                        top: "-20px",
                        width: `${p.size}px`,
                        height: `${p.size * 0.6}px`,
                        backgroundColor: p.color,
                        borderRadius: p.id % 3 === 0 ? "50%" : "2px",
                        animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                />
            ))}

            {/* Center message */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                    className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center border border-amber-200 pointer-events-auto"
                    style={{ animation: "confettiPop 0.5s ease-out forwards" }}
                >
                    <div className="text-5xl mb-3">{message}</div>
                    <p className="text-slate-600 text-lg font-medium">{subMessage}</p>
                </div>
            </div>

            <style jsx>{`
                @keyframes confettiFall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                @keyframes confettiPop {
                    0% {
                        transform: scale(0.3);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}
