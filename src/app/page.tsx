import Link from "next/link";
import LessonCard from "@/components/LessonCard";
import { lessons, courseInfo } from "@/data/lessonsData";

export default function Home() {
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
              <Link
                href="/pretest"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                📝 เริ่มแบบทดสอบก่อนเรียน
              </Link>
              <Link
                href="#lessons"
                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/30 transform hover:scale-105 transition-all duration-300 border border-white/30"
              >
                📖 เข้าสู่บทเรียน
              </Link>
            </div>
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
