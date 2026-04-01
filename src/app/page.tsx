"use client";

import Link from "next/link";
import LessonCard from "@/components/LessonCard";
import { lessons, courseInfo } from "@/data/lessonsData";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, completedLessons } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const progressPercentage = completedLessons 
    ? Math.round((completedLessons.length / lessons.length) * 100) 
    : 0;
  
  const completedCount = completedLessons ? completedLessons.length : 0;
  const totalLessons = lessons.length;

  return (
    <div className="gradient-cool min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero py-24 sm:py-32">
          {/* Floating Snowflakes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {["❄", "❅", "❆", "❄", "❅", "❆", "❄", "❅"].map((s, i) => (
              <span
                key={i}
                className="absolute text-white/20 text-2xl"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${5 + (i % 3) * 20}%`,
                  animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {s}
              </span>
            ))}
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="animate-fade-in-up">
              <span className="text-6xl sm:text-7xl block mb-6 animate-float-rotate">
                ❄️
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {courseInfo.title}
              </h1>
              <p className="text-xl sm:text-2xl text-white/80 font-light mb-2">
                {courseInfo.subtitle}
              </p>
              <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10">
                {courseInfo.description}
              </p>
            </div>

            {/* Progress Bar or CTA Buttons */}
            {mounted && user ? (
              <div className="max-w-3xl mx-auto mt-8 animate-fade-in-up stagger-2 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 shadow-xl">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-6 gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-white/80 text-sm font-medium mb-1">ยินดีต้อนรับกลับมา, {user.name}</p>
                    <h3 className="text-2xl font-bold text-white">เหรียญตราและความสำเร็จ 🏆</h3>
                  </div>
                  <div className="text-right flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
                    <div className="text-sm text-white/80">ความคืบหน้า</div>
                    <div className="text-2xl font-bold text-teal-300">{progressPercentage}%</div>
                  </div>
                </div>

                {/* Badges Grid (Glassmorphism Dark) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {/* Bronze */}
                  <div className={`relative rounded-2xl p-5 text-center border transition-all duration-500 ${
                      completedCount >= 1 
                          ? "bg-gradient-to-b from-amber-500/20 to-orange-500/20 border-amber-300/50 shadow-lg shadow-amber-500/10" 
                          : "bg-white/5 border-white/10 opacity-60 grayscale"
                  }`}>
                      {completedCount >= 1 && (
                          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">✓</div>
                      )}
                      <div className={`text-4xl mb-2 ${completedCount >= 1 ? "animate-bounce" : ""}`} style={{ animationDuration: '3s' }}>🥉</div>
                      <h3 className="text-base font-bold text-white mb-1">ผู้เริ่มต้น</h3>
                      <p className="text-xs text-white/70 mb-3">เริ่มเรียนบทแรกสำเร็จ</p>
                      <span className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full ${
                          completedCount >= 1 ? "bg-amber-400/20 text-amber-200" : "bg-white/10 text-white/50"
                      }`}>
                          {completedCount >= 1 ? "ปลดล็อกแล้ว!" : "เรียน 1 บท"}
                      </span>
                  </div>

                  {/* Silver */}
                  <div className={`relative rounded-2xl p-5 text-center border transition-all duration-500 ${
                      completedCount >= 2 
                          ? "bg-gradient-to-b from-slate-300/20 to-slate-100/20 border-slate-300/50 shadow-lg shadow-slate-300/10" 
                          : "bg-white/5 border-white/10 opacity-60 grayscale"
                  }`}>
                      {completedCount >= 2 && (
                          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">✓</div>
                      )}
                      <div className={`text-4xl mb-2 ${completedCount >= 2 ? "animate-bounce" : ""}`} style={{ animationDuration: '3s' }}>🥈</div>
                      <h3 className="text-base font-bold text-white mb-1">ช่างฝึกหัด</h3>
                      <p className="text-xs text-white/70 mb-3">เรียนจบครึ่งหนึ่ง (50%)</p>
                      <span className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full ${
                          completedCount >= 2 ? "bg-slate-300/30 text-white" : "bg-white/10 text-white/50"
                      }`}>
                          {completedCount >= 2 ? "ปลดล็อกแล้ว!" : `เรียนอีก ${2 - completedCount} บท`}
                      </span>
                  </div>

                  {/* Gold */}
                  <div className={`relative rounded-2xl p-5 text-center border transition-all duration-500 ${
                      completedCount >= totalLessons
                          ? "bg-gradient-to-b from-yellow-300/20 to-amber-300/20 border-yellow-300/50 shadow-lg shadow-yellow-300/10" 
                          : "bg-white/5 border-white/10 opacity-60 grayscale"
                  }`}>
                      {completedCount >= totalLessons && (
                          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">✓</div>
                      )}
                      <div className={`text-4xl mb-2 ${completedCount >= totalLessons ? "animate-bounce" : ""}`} style={{ animationDuration: '3s' }}>🥇</div>
                      <h3 className="text-base font-bold text-white mb-1">ช่างแอร์มือโปร</h3>
                      <p className="text-xs text-white/70 mb-3">เรียนจบครบ (100%)</p>
                      <span className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full ${
                          completedCount >= totalLessons ? "bg-yellow-300/30 text-yellow-200" : "bg-white/10 text-white/50"
                      }`}>
                          {completedCount >= totalLessons ? "🌟 ช่างแอร์มือโปร!" : `เรียนอีก ${totalLessons - completedCount} บท`}
                      </span>
                  </div>
                </div>

                <Link
                  href={progressPercentage === 100 ? "/posttest" : `/lessons/${Math.min(completedCount + 1, totalLessons)}`}
                  className="inline-flex items-center justify-center w-full gap-2 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {progressPercentage === 100 ? "🏆 ไปทำแบบทดสอบหลังเรียน" : `🚀 เรียนต่อบทที่ ${Math.min(completedCount + 1, totalLessons)}`}
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in-up stagger-2">
                <Link
                  href="/pretest"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  📝 เริ่มแบบทดสอบก่อนเรียน
                </Link>
                <Link
                  href="#lessons"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/30 transform hover:scale-105 transition-all duration-300 border border-white/30 backdrop-blur-sm"
                >
                  📖 เข้าสู่บทเรียน
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Wave Divider */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 100"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,60 L1440,100 L0,100 Z"
            fill="#f0f9ff"
          />
        </svg>
      </section>

      {/* Course Highlights Section */}
      <section className="py-16 gradient-fade relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              🎯 สิ่งที่คุณจะได้รับจากหลักสูตรนี้
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              เรียนรู้ระบบปรับอากาศรถยนต์ตั้งแต่พื้นฐานจนถึงการบำรุงรักษาในชีวิตจริง ผ่านสื่อที่เข้าใจง่าย
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl text-center transform hover:-translate-y-3 transition-all duration-400 hover:shadow-2xl group border border-slate-100 hover-glow">
              <div className="w-20 h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner animate-float" style={{ animationDelay: '0s' }}>
                🧠
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">เข้าใจหลักการพื้นฐาน</h3>
              <p className="text-slate-600">
                วิเคราะห์การทำงานของวัฏจักรสารทำความเย็น และหน้าที่ของแต่ละชิ้นส่วนได้อย่างถูกต้อง
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-3xl text-center transform hover:-translate-y-3 transition-all duration-400 hover:shadow-2xl group border border-slate-100 hover-glow">
              <div className="w-20 h-20 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner animate-float" style={{ animationDelay: '0.5s' }}>
                🛠️
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">ทักษะการบำรุงรักษา</h3>
              <p className="text-slate-600">
                เรียนรู้ขั้นตอนการตรวจเช็ค การชาร์จน้ำยา และกระบวนการเปลี่ยนถ่ายน้ำมันคอมเพรสเซอร์มาตรฐาน
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl text-center transform hover:-translate-y-3 transition-all duration-400 hover:shadow-2xl group border border-slate-100 hover-glow">
              <div className="w-20 h-20 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner animate-float" style={{ animationDelay: '1s' }}>
                💡
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">นำไปใช้ได้จริง</h3>
              <p className="text-slate-600">
                สามารถนำความรู้ไปประยุกต์ใช้ในการแก้ปัญหา วิเคราะห์อาการเสีย และต่อยอดในสายอาชีพช่างยนต์
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons Section */}
      <section id="lessons" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
              📖 เนื้อหาบทเรียน
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              สรุปเนื้อหาสำคัญ 4 บท พร้อมสื่อการเรียนและแบบฝึกหัด
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lessons.map((lesson, index) => (
              <LessonCard key={lesson.id} lesson={lesson} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Test Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
              📝 แบบทดสอบ
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              ทำแบบทดสอบก่อนเรียนและหลังเรียนเพื่อวัดผลการเรียนรู้
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pre-Test Card */}
            <Link href="/pretest">
              <div className="glass-card rounded-2xl p-8 text-center animate-fade-in-up stagger-1 group hover-glow animate-glow-border">
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '0s' }}>📋</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  แบบทดสอบก่อนเรียน
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  ทดสอบความรู้พื้นฐานก่อนเข้าสู่บทเรียน
                </p>
                <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  เริ่มทำแบบทดสอบ →
                </span>
              </div>
            </Link>

            {/* Post-Test Card */}
            <Link href="/posttest">
              <div className="glass-card rounded-2xl p-8 text-center animate-fade-in-up stagger-2 group hover-glow animate-glow-border">
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '0.5s' }}>🏆</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  แบบทดสอบหลังเรียน
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  ทดสอบความรู้หลังจากเรียนจบทุกบท
                </p>
                <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  เริ่มทำแบบทดสอบ →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
