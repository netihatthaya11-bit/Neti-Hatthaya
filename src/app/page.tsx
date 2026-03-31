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
              <span className="text-6xl sm:text-7xl block mb-6 animate-float">
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
              <div className="max-w-xl mx-auto mt-8 animate-fade-in-up stagger-2 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
                <div className="flex justify-between items-end mb-3">
                  <div className="text-left">
                    <p className="text-white/80 text-sm font-medium mb-1">ยินดีต้อนรับกลับมา, {user.name}</p>
                    <h3 className="text-xl font-bold text-white">ความคืบหน้าการเรียน</h3>
                  </div>
                  <span className="text-3xl font-bold text-teal-300">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-4 mb-6 shadow-inner overflow-hidden border border-white/10">
                  <div 
                    className="bg-gradient-to-r from-teal-400 to-emerald-400 h-4 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <Link
                  href={progressPercentage === 100 ? "/posttest" : `/lessons/${Math.min(completedLessons.length + 1, lessons.length)}`}
                  className="inline-flex items-center justify-center w-full gap-2 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {progressPercentage === 100 ? "🏆 ไปทำแบบทดสอบหลังเรียน" : `🚀 เรียนต่อบทที่ ${Math.min(completedLessons.length + 1, lessons.length)}`}
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
      <section className="py-16 bg-gradient-to-b from-[#f0f9ff] to-white relative z-10">
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
            <div className="glass-card p-8 rounded-3xl text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group border border-slate-100">
              <div className="w-20 h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                🧠
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">เข้าใจหลักการพื้นฐาน</h3>
              <p className="text-slate-600">
                วิเคราะห์การทำงานของวัฏจักรสารทำความเย็น และหน้าที่ของแต่ละชิ้นส่วนได้อย่างถูกต้อง
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-3xl text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group border border-slate-100">
              <div className="w-20 h-20 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                🛠️
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">ทักษะการบำรุงรักษา</h3>
              <p className="text-slate-600">
                เรียนรู้ขั้นตอนการตรวจเช็ค การชาร์จน้ำยา และกระบวนการเปลี่ยนถ่ายน้ำมันคอมเพรสเซอร์มาตรฐาน
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group border border-slate-100">
              <div className="w-20 h-20 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
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
              <div className="glass-card rounded-2xl p-8 text-center animate-fade-in-up stagger-1 group">
                <div className="text-5xl mb-4">📋</div>
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
              <div className="glass-card rounded-2xl p-8 text-center animate-fade-in-up stagger-2 group">
                <div className="text-5xl mb-4">🏆</div>
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
