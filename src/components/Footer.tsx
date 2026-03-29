import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative mt-20">
            <div className="gradient-hero">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-3xl">❄️</span>
                                <h3 className="text-xl font-bold">งานปรับอากาศรถยนต์</h3>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed">
                                สรุปเนื้อหาและสื่อการเรียนรู้ระบบปรับอากาศรถยนต์
                                พร้อมแบบทดสอบก่อนเรียนและหลังเรียน
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold mb-4 text-white/90">📖 บทเรียน</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="/lessons/1"
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        บทที่ 1: ส่วนประกอบของระบบปรับอากาศรถยนต์
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/lessons/2"
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        บทที่ 2: หลักการทำงานและวัฏจักรทำความเย็น
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/lessons/3"
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        บทที่ 3: สารทำความเย็นและน้ำมันคอมเพรสเซอร์
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/lessons/4"
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        บทที่ 4: การตรวจสอบ บำรุงรักษา และการเติมน้ำยาแอร์
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Test Links */}
                        <div>
                            <h4 className="font-bold mb-4 text-white/90">📝 แบบทดสอบ</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="/pretest"
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        แบบทดสอบก่อนเรียน
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/posttest"
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        แบบทดสอบหลังเรียน
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
                        <p>© 2026 งานปรับอากาศรถยนต์ | Automotive Air Conditioning</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
