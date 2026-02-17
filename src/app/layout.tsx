import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthGuard from "@/components/AuthGuard";


const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "งานปรับอากาศรถยนต์ | Automotive Air Conditioning",
  description:
    "สรุปเนื้อหาและสื่อการเรียนรู้ระบบปรับอากาศรถยนต์ พร้อมแบบทดสอบก่อนเรียนและหลังเรียน",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${prompt.variable} antialiased`}>
        <AuthProvider>
          <AuthGuard>
            <Navbar />
            <main className="pt-16 min-h-screen">{children}</main>
            <Footer />
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
