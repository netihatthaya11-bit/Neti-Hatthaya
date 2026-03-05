# 📘 DOC.md — เอกสารสรุปโปรเจกต์ neti

> สร้างอัตโนมัติเมื่อ: 2026-03-05

---

## 1. ภาพรวมโปรเจกต์ (Project Overview)

**neti** เป็นเว็บแอปพลิเคชันเพื่อการศึกษา (E-Learning) สำหรับวิชา **"งานปรับอากาศรถยนต์" (Automotive Air Conditioning)** พัฒนาด้วย **Next.js 16.1.6** + **React 19** + **TypeScript** + **Tailwind CSS 4**

### วัตถุประสงค์
- สรุปเนื้อหาและสื่อการเรียนรู้ระบบปรับอากาศรถยนต์
- มีแบบทดสอบก่อนเรียน (Pre-test) และหลังเรียน (Post-test) ผ่าน Google Forms
- ติดตามการเข้าเรียนของนักเรียนผ่านระบบ Login ด้วย localStorage

---

## 2. เทคโนโลยีที่ใช้ (Tech Stack)

| เทคโนโลยี | เวอร์ชัน | หน้าที่ |
|---|---|---|
| Next.js | 16.1.6 | Framework หลัก (App Router) |
| React | 19.2.3 | UI Library |
| TypeScript | ^5 | Type Safety |
| Tailwind CSS | ^4 | Styling (ผ่าน `@tailwindcss/postcss`) |
| Google Fonts | Prompt | ฟอนต์ภาษาไทย+อังกฤษ |
| ESLint | ^9 | Linting |

---

## 3. โครงสร้างไฟล์ (File Structure)

```
neti/
├── public/
│   ├── images/                     # รูปภาพประกอบบทเรียน
│   │   ├── compressor.png
│   │   ├── condenser.png
│   │   ├── evaporator.png
│   │   ├── expansion-valve.png
│   │   ├── maintenance-steps.png
│   │   ├── receiver-drier.png
│   │   └── refrigeration-cycle.webp
│   ├── file.svg, globe.svg, next.svg, vercel.svg, window.svg
│
├── src/
│   ├── app/
│   │   ├── globals.css             # สไตล์หลัก + Animations + Glassmorphism
│   │   ├── layout.tsx              # Root Layout (Navbar, Footer, AuthProvider)
│   │   ├── page.tsx                # หน้าแรก (Hero + บทเรียน + แบบทดสอบ)
│   │   ├── login/page.tsx          # หน้าลงทะเบียน/เข้าสู่ระบบ
│   │   ├── pretest/page.tsx        # หน้าแบบทดสอบก่อนเรียน
│   │   ├── posttest/page.tsx       # หน้าแบบทดสอบหลังเรียน
│   │   ├── lessons/[id]/page.tsx   # หน้าบทเรียนแบบ Dynamic Route
│   │   └── profile/page.tsx        # หน้าโปรไฟล์ + ประวัติการเข้าใช้
│   │
│   ├── components/
│   │   ├── AuthGuard.tsx           # ป้องกันหน้าที่ต้อง Login
│   │   ├── Footer.tsx              # ส่วนท้ายเว็บ
│   │   ├── FormButton.tsx          # ปุ่มลิงก์ไป Google Forms/Sheets
│   │   ├── LessonCard.tsx          # การ์ดบทเรียนในหน้าแรก
│   │   ├── LessonContent.tsx       # เนื้อหาบทเรียนเต็ม + วิดีโอ + Timer
│   │   └── Navbar.tsx              # แถบนำทางด้านบน (Desktop + Mobile)
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx         # React Context สำหรับจัดการ Auth + Visit Logs
│   │
│   └── data/
│       └── lessonsData.ts          # ข้อมูลบทเรียนทั้ง 4 บท + ข้อมูลคอร์ส
│
├── package.json
├── next.config.ts                  # ค่า Config ของ Next.js (ว่างเปล่า)
├── tsconfig.json                   # ค่า Config TypeScript
├── postcss.config.mjs              # PostCSS สำหรับ Tailwind
├── eslint.config.mjs               # ESLint Config
└── README.md                       # คำอธิบายโปรเจกต์เบื้องต้น
```

---

## 4. เส้นทางหน้าเว็บ (Routes)

| เส้นทาง | ไฟล์ | คำอธิบาย |
|---|---|---|
| `/` | `src/app/page.tsx` | หน้าแรก: Hero Section + รายการบทเรียน 4 บท + ลิงก์แบบทดสอบ |
| `/login` | `src/app/login/page.tsx` | หน้าลงทะเบียน: กรอก ชื่อ, รหัสนักเรียน, ชั้น/ห้อง |
| `/pretest` | `src/app/pretest/page.tsx` | หน้าแบบทดสอบก่อนเรียน: ลิงก์ไป Google Form + ดูผลคะแนน |
| `/posttest` | `src/app/posttest/page.tsx` | หน้าแบบทดสอบหลังเรียน: ลิงก์ไป Google Form + ดูผลคะแนน |
| `/lessons/[id]` | `src/app/lessons/[id]/page.tsx` | หน้าบทเรียน (id = 1-4): วิดีโอ + เนื้อหา + แบบฝึกหัด |
| `/profile` | `src/app/profile/page.tsx` | หน้าโปรไฟล์: ข้อมูลผู้ใช้ + ประวัติการเข้าใช้งาน |

---

## 5. รายละเอียด Components

### 5.1 `AuthGuard.tsx`
- ตรวจสอบว่าผู้ใช้ Login แล้วหรือยัง
- ถ้ายังไม่ Login จะ Redirect ไป `/login` อัตโนมัติ
- หน้า `/login` จะข้ามการตรวจสอบ
- ใช้ `localStorage` key: `ac_course_user`

### 5.2 `Navbar.tsx`
- แถบนำทางแบบ Fixed ด้านบน (Dark theme, Glassmorphism)
- รองรับทั้ง Desktop (แสดงลิงก์ทั้งหมด) และ Mobile (Hamburger menu)
- แสดงชื่อผู้ใช้พร้อมลิงก์ไปหน้า Profile
- ซ่อน Navbar ในหน้า Login

### 5.3 `Footer.tsx`
- ส่วนท้ายเว็บแบบ Gradient
- แบ่ง 3 คอลัมน์: ข้อมูลคอร์ส, ลิงก์บทเรียน, ลิงก์แบบทดสอบ
- แสดง © 2026

### 5.4 `LessonCard.tsx`
- การ์ดแสดงข้อมูลบทเรียนในหน้าแรก
- แสดง: ไอคอน, หมายเลขบท, ชื่อย่อ, คำอธิบาย, จำนวนหัวข้อ + จุดสำคัญ
- ใช้ Glassmorphism + Hover animation

### 5.5 `LessonContent.tsx` ⭐ (Component หลัก)
- แสดงเนื้อหาบทเรียนเต็มรูปแบบ
- **วิดีโอ YouTube**: ฝัง iframe พร้อม Timer Overlay
- **ระบบจับเวลา**: นักเรียนต้องดูเนื้อหาครบตามเวลาที่กำหนด (`minDuration`) จึงจะ Unlock แบบฝึกหัดได้
- **เนื้อหา**: ภาพรวม → หัวข้อย่อย (พร้อมรูปภาพ) → จุดสำคัญ
- **แบบฝึกหัด**: ลิงก์ไป Google Form + Google Sheets + อัปโหลดวิดีโอ (ถูกล็อกจนกว่าจะครบเวลา)
- **นำทาง**: ปุ่มไปบทก่อนหน้า/ถัดไป

### 5.6 `FormButton.tsx`
- ปุ่มลิงก์ไปภายนอก (Google Forms/Sheets)
- 3 variants: `primary` (Gradient), `secondary` (Outline), `upload` (Dashed border)
- 3 icons: `form`, `sheet`, `upload`

---

## 6. ระบบ Authentication & State Management

### `AuthContext.tsx`
ใช้ React Context + localStorage จัดเก็บข้อมูลทั้งหมดฝั่ง Client

| localStorage Key | เก็บข้อมูล | ประเภท |
|---|---|---|
| `ac_course_user` | ข้อมูลผู้ใช้ (ชื่อ, รหัสนักเรียน, ห้อง) | `User` object |
| `ac_course_logs` | ประวัติการเข้าหน้าเว็บต่างๆ | `VisitLog[]` |
| `ac_course_completed` | รายการบทเรียนที่เรียนจบ | `number[]` |

### ฟังก์ชันที่มี:
- `login(user)` — บันทึกข้อมูลผู้ใช้ + Redirect ไปหน้าแรก
- `logout()` — ลบข้อมูลผู้ใช้ + Redirect ไปหน้า Login
- `logVisit(path)` — บันทึกประวัติการเข้าหน้าเว็บ (พร้อม timestamp)
- `markLessonComplete(lessonId)` — บันทึกว่าเรียนบทนี้จบแล้ว

---

## 7. เนื้อหาบทเรียน (4 บท)

ข้อมูลบทเรียนทั้งหมดอยู่ใน `src/data/lessonsData.ts`

| บทที่ | ชื่อ | ไอคอน | หัวข้อย่อย | วิดีโอ |
|---|---|---|---|---|
| 1 | ส่วนประกอบของระบบปรับอากาศรถยนต์ | 🔧 | 5 (คอมเพรสเซอร์, คอนเดนเซอร์, อีวาพอเรเตอร์, วาล์วขยายตัว, รีซีฟเวอร์) | YouTube |
| 2 | หลักการทำงานและวัฏจักรทำความเย็น | ❄️ | 3 (การเปลี่ยนสถานะ, วัฏจักรทำความเย็น, ความร้อนแฝง) | YouTube |
| 3 | สารทำความเย็นและน้ำมันคอมเพรสเซอร์ | 🧪 | 5 (R-134a, R-1234yf, ข้อควรระวัง, น้ำมันคอมเพรสเซอร์, ขั้นตอนบำรุงรักษา) | YouTube |
| 4 | การตรวจสอบ บำรุงรักษา และการเติมน้ำยาแอร์ | 🛠️ | 4 (มาตรวัดความดัน, ตรวจหารอยรั่ว, เติมน้ำยาแอร์, บำรุงรักษาตามระยะ) | YouTube |

### แบบทดสอบ
- **ก่อนเรียน (Pre-test)**: Google Form + Google Sheet ดูคะแนน
- **หลังเรียน (Post-test)**: Google Form + Google Sheet ดูคะแนน
- **แบบฝึกหัดท้ายบท**: Google Form แยกรายบท + ลิงก์อัปโหลดวิดีโอปฏิบัติ

---

## 8. ระบบออกแบบ (Design System)

### สี (Colors)
| ตัวแปร | ค่า | การใช้งาน |
|---|---|---|
| `--color-primary` | `#0ea5e9` (Sky Blue) | สีหลัก |
| `--color-primary-dark` | `#0284c7` | สีหลักเข้ม |
| `--color-secondary` | `#06b6d4` (Cyan) | สีรอง |
| `--color-accent` | `#8b5cf6` (Purple) | สีเน้น |
| `--color-surface` | `#f0f9ff` | พื้นหลัง |

### Animations
- `float` — ลอยขึ้น-ลง (ไอคอน/เกล็ดหิมะ)
- `fadeInUp` — เฟดเข้าจากล่างขึ้นบน
- `shimmer` — เอฟเฟกต์เงาวาว
- `pulse-glow` — เรืองแสงเป็นจังหวะ
- `snowfall` — เกล็ดหิมะตก
- `stagger-1` ถึง `stagger-5` — หน่วงเวลาแอนิเมชันเรียงลำดับ

### Glassmorphism
- `.glass` — พื้นหลังโปร่งแสง + blur
- `.glass-card` — การ์ดโปร่งแสง + hover effect (ยกขึ้น + เงา)

### Gradients
- `.gradient-hero` — พื้นหลัง Hero Section (ฟ้า → เขียวอมฟ้า → น้ำเงิน → ม่วง)
- `.gradient-cool` — พื้นหลังหน้าเว็บ (ฟ้าอ่อน)
- `.gradient-text` — ตัวอักษรไล่สี

---

## 9. การ Flow ของผู้ใช้ (User Flow)

```
เข้าเว็บ → /login (กรอกชื่อ, รหัส, ห้อง)
         ↓
    หน้าแรก (/)
    ├── แบบทดสอบก่อนเรียน (/pretest) → Google Form
    ├── บทเรียนที่ 1 (/lessons/1) → ดูวิดีโอ → ทำแบบฝึกหัด
    ├── บทเรียนที่ 2 (/lessons/2) → ดูวิดีโอ → ทำแบบฝึกหัด
    ├── บทเรียนที่ 3 (/lessons/3) → ดูวิดีโอ → ทำแบบฝึกหัด
    ├── บทเรียนที่ 4 (/lessons/4) → ดูวิดีโอ → ทำแบบฝึกหัด
    ├── แบบทดสอบหลังเรียน (/posttest) → Google Form
    └── โปรไฟล์ (/profile) → ดูประวัติ + ออกจากระบบ
```

---

## 10. คำสั่งที่ใช้ (Scripts)

```bash
npm run dev      # รัน Development Server (localhost:3000)
npm run build    # Build สำหรับ Production
npm run start    # รัน Production Server
npm run lint     # ตรวจสอบโค้ดด้วย ESLint
```

---

## 11. หมายเหตุเพิ่มเติม

- **ไม่มี Backend/Database**: ข้อมูลทั้งหมดเก็บใน localStorage ของ Browser
- **แบบทดสอบ/แบบฝึกหัด**: ใช้ Google Forms ภายนอก ไม่ได้อยู่ในโปรเจกต์
- **วิดีโอ**: ฝังจาก YouTube ทั้งหมด
- **ภาษา**: เว็บไซต์เป็นภาษาไทยทั้งหมด (lang="th") ใช้ฟอนต์ Prompt
- **Responsive**: รองรับทั้ง Desktop และ Mobile
- **`minDuration`**: ตั้งไว้ที่ 10 วินาที (สำหรับ Testing) ควรปรับเป็นค่าจริงก่อน Deploy

---

## 12. ลิงก์ภายนอกที่ฝังในโปรเจกต์ (External Links)

> ลิงก์ทั้งหมดถูกกำหนดไว้ในไฟล์ `src/data/lessonsData.ts`

### 🎬 วิดีโอ YouTube (4 ลิงก์)

| บทที่ | URL | หมายเหตุ |
|---|---|---|
| 1 | `https://www.youtube.com/watch?v=4FDs7Lcvr7A` | ส่วนประกอบระบบปรับอากาศ |
| 2 | `https://youtu.be/0FAPEoP6wrQ` | หลักการทำงานและวัฏจักร |
| 3 | `https://www.youtube.com/watch?v=GNH8cNmXQoY` | สารทำความเย็นและน้ำมัน |
| 4 | `https://www.youtube.com/watch?v=XIKKMvWx3SA` | การตรวจสอบและบำรุงรักษา |

### 📝 Google Forms — แบบฝึกหัดท้ายบท (4 ลิงก์)

| บทที่ | URL |
|---|---|
| 1 | `https://docs.google.com/forms/d/e/1FAIpQLScEDmKbrgliYNnpYFfDU8Di_KON-rn7U5djef3GlXwp1fDO3A/viewform` |
| 2 | `https://docs.google.com/forms/d/e/1FAIpQLScCHTsahpua4Kn6kLhpg7J7iausRRHqM83gBEnhTr1l0T76xw/viewform` |
| 3 | `https://docs.google.com/forms/d/e/1FAIpQLSdP0rhvo0ABBPUdH3EKDCaHGEE3qb3GVoh7DcU7jQF8t8hNpg/viewform` |
| 4 | `https://docs.google.com/forms/d/e/1FAIpQLSe6hCq9WwfELgkPY78o2HFo80TXLSU_xhGToBfjWAAwdav_JQ/viewform` |

### 📋 Google Forms — แบบทดสอบ (2 ลิงก์)

| แบบทดสอบ | URL |
|---|---|
| ก่อนเรียน (Pre-test) | `https://docs.google.com/forms/d/e/1FAIpQLSf-qGkk8NeHWZFwJTZzq8hQoBSk_cydO2a5sCpDtQdC7c7diw/viewform` |
| หลังเรียน (Post-test) | `https://docs.google.com/forms/d/e/1FAIpQLSfYTXT24Bzgf5Mqbcsi46AQDolwP3VdHfgUVKpp0NDUshgt4w/viewform` |

### 📊 Google Sheets — ดูคะแนน (5 ลิงก์)

| ใช้กับ | URL | สถานะ |
|---|---|---|
| Pre-test ดูคะแนน | `https://docs.google.com/spreadsheets/d/1kfPKzZVDBFuWZt55Eg98t0N7MFo5ZUfpfOYEwN6JRtU/edit` | ✅ URL สมบูรณ์ |
| Post-test ดูคะแนน | `https://docs.google.com/spreadsheets` | ⚠️ URL ยังไม่สมบูรณ์ |
| แบบฝึกหัดบทที่ 1 | `https://docs.google.com/spreadsheets` | ⚠️ URL ยังไม่สมบูรณ์ |
| แบบฝึกหัดบทที่ 2 | `https://docs.google.com/spreadsheets` | ⚠️ URL ยังไม่สมบูรณ์ |
| แบบฝึกหัดบทที่ 3 | `https://docs.google.com/spreadsheets` | ⚠️ URL ยังไม่สมบูรณ์ |
| แบบฝึกหัดบทที่ 4 | `https://docs.google.com/spreadsheets` | ⚠️ URL ยังไม่สมบูรณ์ |

### 📤 Google Forms — อัปโหลดวิดีโอ (4 ลิงก์)

| บทที่ | URL | สถานะ |
|---|---|---|
| 1-4 (ทุกบท) | `https://forms.google.com` | ⚠️ URL ยังไม่สมบูรณ์ |

### 📊 สรุปสถานะลิงก์

| ประเภท | จำนวน | สมบูรณ์ | ยังไม่สมบูรณ์ |
|---|---|---|---|
| วิดีโอ YouTube | 4 | ✅ 4 | — |
| แบบฝึกหัด Google Forms | 4 | ✅ 4 | — |
| แบบทดสอบ Google Forms | 2 | ✅ 2 | — |
| Google Sheets ดูคะแนน | 6 | ✅ 1 | ⚠️ 5 |
| อัปโหลดวิดีโอ | 4 | — | ⚠️ 4 |
| **รวม** | **20** | **11** | **9** |

> ⚠️ **ลิงก์ที่ยังไม่สมบูรณ์** ชี้ไปที่หน้าแรกของ Google Sheets/Forms เท่านั้น ยังไม่ได้ใส่ URL ของเอกสารจริง ควรอัปเดตก่อน Deploy

