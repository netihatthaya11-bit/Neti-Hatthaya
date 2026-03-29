

export interface Lesson {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  formUrl: string;
  sheetUrl: string;
  uploadUrl: string; // URL for video submission
  videoUrl: string; // YouTube URL
  minDuration: number; // Seconds
  content: {
    overview: string;
    overviewImageUrl?: string;
    topics: {
      title: string;
      detail: string;
      imageUrl?: string;
    }[];
    keyPoints: string[];
  };
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "ส่วนประกอบของระบบปรับอากาศรถยนต์",
    shortTitle: "ส่วนประกอบ A/C",
    description: "ศึกษาชิ้นส่วนหลักของระบบ A/C: คอมเพรสเซอร์ คอนเดนเซอร์ อีวาพอเรเตอร์ วาล์วขยายตัว และรีซีฟเวอร์",
    icon: "🔧",
    color: "from-cyan-400 to-teal-600",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeoQEHAxuCYrcR992ZjYmC1KqLwOwWA4ua1cPf8I4Z109mrDQ/viewform?embedded=true",
    sheetUrl: "https://docs.google.com/spreadsheets",
    uploadUrl: "https://forms.google.com",
    videoUrl: "https://youtu.be/lKKXJ2X1pjc",
    minDuration: 300, // 5 minutes (300 seconds)
    content: {
      overview:
        "ระบบปรับอากาศรถยนต์ประกอบด้วยชิ้นส่วนหลัก 5 ส่วน ซึ่งแต่ละส่วนมีหน้าที่สำคัญในกระบวนการทำความเย็น การเข้าใจหน้าที่และการทำงานของแต่ละชิ้นส่วนจะช่วยในการตรวจเช็คและซ่อมบำรุงได้อย่างถูกต้อง",
      topics: [
        {
          title: "คอมเพรสเซอร์ (Compressor)",
          detail:
            "เป็นหัวใจของระบบ ทำหน้าที่อัดสารทำความเย็นจากก๊าซความดันต่ำให้เป็นก๊าซความดันสูงอุณหภูมิสูง มีหลายแบบ เช่น แบบลูกสูบ (Piston), แบบใบพัด (Rotary Vane), แบบสโครลล์ (Scroll) โดยรับกำลังขับจากเครื่องยนต์ผ่านสายพานและคลัตช์แม่เหล็ก",
          imageUrl: "/images/compressor.png",
        },
        {
          title: "คอนเดนเซอร์ (Condenser)",
          detail:
            "ติดตั้งอยู่ด้านหน้ารถ ทำหน้าที่ระบายความร้อนจากสารทำความเย็นที่เป็นก๊าซร้อนความดันสูง ให้ควบแน่นเป็นของเหลว โดยอาศัยลมจากการวิ่งของรถและพัดลมช่วยระบาย",
          imageUrl: "/images/condenser.png",
        },
        {
          title: "อีวาพอเรเตอร์ (Evaporator)",
          detail:
            "ติดตั้งอยู่ภายในห้องโดยสาร ทำหน้าที่ดูดซับความร้อนจากอากาศภายในรถ สารทำความเย็นจะระเหยจากของเหลวเป็นก๊าซ ทำให้อากาศที่ผ่านครีบระบายความร้อนเย็นลง พัดลมจะส่งลมเย็นเข้าห้องโดยสาร",
          imageUrl: "/images/evaporator-v2.png",
        },
        {
          title: "วาล์วขยายตัว / หลอดคาปิลลารี",
          detail:
            "ทำหน้าที่ลดความดันและอุณหภูมิของสารทำความเย็นก่อนเข้าอีวาพอเรเตอร์ มี 2 แบบหลัก: วาล์วขยายตัวแบบเทอร์โมสแตติก (TXV) ซึ่งปรับอัตราการไหลตามภาระความเย็น และหลอดคาปิลลารี (Orifice Tube) ที่มีรูขนาดคงที่",
          imageUrl: "/images/expansion-valve-v2.png",
        },
        {
          title: "รีซีฟเวอร์/ดรายเออร์ และ Accumulator",
          detail:
            "รีซีฟเวอร์ดรายเออร์ใช้ในระบบ TXV ทำหน้าที่เก็บน้ำยาส่วนเกิน กรองสิ่งสกปรก และดูดความชื้น ส่วน Accumulator ใช้ในระบบ Orifice Tube ทำหน้าที่กันไม่ให้น้ำยาที่เป็นของเหลวไหลกลับเข้าคอมเพรสเซอร์",
          imageUrl: "/images/receiver-drier-v2.png",
        },
      ],
      keyPoints: [
        "คอมเพรสเซอร์: อัดก๊าซความดันต่ำ → ก๊าซความดันสูง",
        "คอนเดนเซอร์: ก๊าซร้อน → ของเหลว (ระบายความร้อน)",
        "วาล์วขยายตัว: ลดความดัน → ของเหลวเย็น",
        "อีวาพอเรเตอร์: ดูดความร้อน → อากาศเย็น",
        "รีซีฟเวอร์/ดรายเออร์: กรอง + ดูดความชื้น",
      ],
    },
  },
  {
    id: 2,
    title: "หลักการทำงานและวัฏจักรทำความเย็น",
    shortTitle: "วัฏจักรทำความเย็น",
    description: "เรียนรู้หลักการพื้นฐาน เน้นการเปลี่ยนสถานะของสารทำความเย็นในวงจรทำความเย็น",
    icon: "❄️",
    color: "from-sky-400 to-blue-600",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdvy2ke42M1Jg8gdQt6WOUDHS208Vfs937U9FiO082x_UrUeA/viewform?embedded=true",
    sheetUrl: "https://docs.google.com/spreadsheets",
    uploadUrl: "https://forms.google.com",
    videoUrl: "https://youtu.be/OkliQITDd8E",
    minDuration: 300, // 5 minutes (300 seconds)
    content: {
      overview:
        "หัวใจสำคัญของระบบแอร์คือ 'การเปลี่ยนสถานะ' ของสารทำความเย็น เพื่อดูดซับและคายความร้อน โดยเปลี่ยนจากของเหลวเป็นก๊าซ (ดูดความร้อน) และจากก๊าซเป็นของเหลว (คายความร้อน)",
      overviewImageUrl: "/images/refrigeration-cycle.png",
      topics: [
        {
          title: "การเปลี่ยนสถานะ (State Change)",
          detail:
            "สารสสารมี 3 สถานะ: ของแข็ง ของเหลว ก๊าซ แอร์รถยนต์ใช้การเปลี่ยนสถานะระหว่าง 'ของเหลว' และ 'ก๊าซ' เมื่อของเหลวระเหยเป็นก๊าซ จะดูดความร้อนรอบข้าง (ทำให้เย็น) และเมื่อก๊าซควบแน่นเป็นของเหลว จะคายความร้อนออก",
        },
        {
          title: "วัฏจักรการทำความเย็น (The Refrigeration Cycle)",
          detail:
            "1. Compression: ก๊าซความดันต่ำ ถูกอัดเป็น ก๊าซร้อนความดันสูง\n2. Condensation: ก๊าซร้อน ระบายความร้อน เปลี่ยนสถานะเป็น ของเหลว\n3. Expansion: ของเหลวความดันสูง ลดความดันลงฉับพลัน เป็น ของเหลวเย็นจัด\n4. Evaporation: ของเหลวเย็น ดูดความร้อนในรถ เปลี่ยนสถานะเป็น ก๊าซ",
        },
        {
          title: "ความร้อนแฝง (Latent Heat)",
          detail:
            "คือปริมาณความร้อนที่ใช้ในการเปลี่ยนสถานะโดยอุณหภูมิไม่เปลี่ยนแปลง ในระบบแอร์ ความร้อนแฝงของการกลายเป็นไอ (Latent Heat of Vaporization) ถูกใช้ในการดูดความร้อนมหาศาลออกจากห้องโดยสาร",
        },
      ],
      keyPoints: [
        "ดูดความร้อน = ของเหลว → ก๊าซ (เกิดขึ้นที่ตู้แอร์/อีวาพอเรเตอร์)",
        "คายความร้อน = ก๊าซ → ของเหลว (เกิดขึ้นที่แผงระบาย/คอนเดนเซอร์)",
        "คอมเพรสเซอร์ทำหน้าที่หมุนเวียนสารทำความเย็น",
        "วัฏจักรต้องครบ 4 ขั้นตอน: อัด -> ควบแน่น -> ขยายตัว -> ระเหย",
      ],
    },
  },
  {
    id: 3,
    title: "สารทำความเย็นและน้ำมันคอมเพรสเซอร์",
    shortTitle: "สารทำความเย็น",
    description: "รู้จักชนิดสารทำความเย็น R-134a, R-1234yf คุณสมบัติ ข้อควรระวัง และน้ำมันคอมเพรสเซอร์",
    icon: "🧪",
    color: "from-violet-400 to-purple-600",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfToWasxa5DtoEizwZDL3ja4PjE2bBNoT3uYcFXYXtQY7DRWA/viewform?embedded=true",
    sheetUrl: "https://docs.google.com/spreadsheets",
    uploadUrl: "https://forms.google.com",
    videoUrl: "https://youtu.be/Cwy5yFHIwhw",
    minDuration: 300, // 5 minutes (300 seconds)
    content: {
      overview:
        "สารทำความเย็นเป็นตัวกลางสำคัญในการทำความเย็น การเลือกใช้สารที่ถูกต้องและการจัดการอย่างปลอดภัย รวมถึงขั้นตอนการบำรุงรักษาและการเปลี่ยนถ่ายน้ำมันคอมเพรสเซอร์อย่างถูกวิธี จะช่วยให้ระบบทำงานได้อย่างมีประสิทธิภาพและยาวนาน",
      topics: [
        {
          title: "R-134a (HFC-134a)",
          detail:
            "เป็นสารทำความเย็นที่ใช้กันแพร่หลายในรถยนต์ตั้งแต่ปี 1994 ไม่ทำลายชั้นโอโซน (ODP = 0) แต่มีค่า GWP สูง (1430) จุดเดือดอยู่ที่ -26.3°C ใช้กับน้ำมัน PAG (Polyalkylene Glycol)",
          imageUrl: "/images/r134a.jpg",
        },
        {
          title: "R-1234yf (HFO-1234yf)",
          detail:
            "สารทำความเย็นรุ่นใหม่ที่ใช้ในรถยนต์สมัยใหม่ มีค่า GWP ต่ำมาก (ค่า GWP = 4) เป็นมิตรต่อสิ่งแวดล้อม จุดเดือดใกล้เคียง R-134a แต่ติดไฟเล็กน้อย (A2L) ใช้กับน้ำมัน PAG ชนิดพิเศษ",
          imageUrl: "/images/r1234yf.jpg",
        },
        {
          title: "ข้อควรระวังในการจัดการสารทำความเย็น",
          detail:
            "ห้ามปล่อยสารทำความเย็นสู่บรรยากาศ ต้องใช้เครื่องรีไซเคิล/รีเคลมน้ำยา สวมถุงมือและแว่นป้องกัน เพราะสารทำความเย็นอาจทำให้เกิดอาการหนาวเหน็บ (Frostbite) ทำงานในที่อากาศถ่ายเทได้ดี",
          imageUrl: "/images/safety-precautions.jpg",
        },
        {
          title: "น้ำมันคอมเพรสเซอร์",
          detail:
            "น้ำมันหล่อลื่นที่ไหลเวียนไปกับสารทำความเย็นเพื่อหล่อลื่นชิ้นส่วนภายในคอมเพรสเซอร์ ต้องเลือกชนิดให้เหมาะสม: PAG Oil ใช้กับ R-134a, PAG Special ใช้กับ R-1234yf, Ester Oil (POE) ใช้ได้อเนกประสงค์",
          imageUrl: "/images/compressor-oil.jpg",
        },
        {
          title: "ขั้นตอนการบำรุงรักษาและการเปลี่ยนถ่ายน้ำมัน",
          detail:
            "การบำรุงรักษาที่ถูกต้องประกอบด้วย 6 ขั้นตอนสำคัญ: 1. ตรวจสอบสเปค 2. ดูดเก็บน้ำยา 3. ถ่ายน้ำมันและตรวจหาเศษโลหะ 4. เปลี่ยนไส้กรอง 5. เติมน้ำมันใหม่ และ 6. แวคคั่มระบบ การปฏิบัติตามขั้นตอนนี้อย่างเคร่งครัดจะช่วยป้องกันความเสียหายต่อคอมเพรสเซอร์",
          imageUrl: "/images/maintenance-steps-new.jpg",
        },
      ],
      keyPoints: [
        "R-134a: ใช้แพร่หลาย, GWP สูง, ใช้น้ำมัน PAG",
        "R-1234yf: รุ่นใหม่, GWP ต่ำ, เป็นมิตรสิ่งแวดล้อม",
        "ห้ามผสมสารทำความเย็นต่างชนิดกัน",
        "สวมอุปกรณ์ป้องกันเสมอเมื่อทำงานกับน้ำยาแอร์",
        "เลือกน้ำมันคอมเพรสเซอร์ให้ตรงกับชนิดสารทำความเย็น",
      ],
    },
  },
  {
    id: 4,
    title: "การตรวจสอบ บำรุงรักษา และการเติมน้ำยาแอร์",
    shortTitle: "ตรวจสอบ & บำรุงรักษา",
    description: "เรียนรู้ขั้นตอนการตรวจเช็คระบบ การเติมน้ำยาแอร์ การตรวจรอยรั่ว และการบำรุงรักษาตามระยะ",
    icon: "🛠️",
    color: "from-emerald-400 to-green-600",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeU05Yy8VAB8qb9rM1LBm_nCARflNMC0G9fsVi4upW2PolHQQ/viewform?embedded=true",
    sheetUrl: "https://docs.google.com/spreadsheets",
    uploadUrl: "https://forms.google.com",
    videoUrl: "https://youtu.be/ISHWNgSTz1g",
    minDuration: 300, // 5 minutes (300 seconds)
    content: {
      overview:
        "การบำรุงรักษาระบบปรับอากาศอย่างสม่ำเสมอจะช่วยให้ระบบทำงานได้อย่างมีประสิทธิภาพ ยืดอายุการใช้งาน และป้องกันการเสียหายที่มีค่าใช้จ่ายสูง ควรตรวจเช็คอย่างน้อยปีละ 1 ครั้ง",
      topics: [
        {
          title: "การตรวจเช็คด้วยมาตรวัดความดัน (Manifold Gauge)",
          detail:
            "ต่อมาตรวัดความดันเข้ากับระบบ อ่านค่าความดันด้านต่ำ (Low Side) และด้านสูง (High Side) เปรียบเทียบกับค่ามาตรฐาน: ด้านต่ำประมาณ 25-35 psi, ด้านสูงประมาณ 200-250 psi (ขึ้นอยู่กับอุณหภูมิแวดล้อม) ค่าที่ผิดปกติบ่งบอกปัญหาของระบบ",
          imageUrl: "/images/manifold-gauge.jpg",
        },
        {
          title: "การตรวจหารอยรั่ว",
          detail:
            "มีหลายวิธี: 1) ใช้เครื่องตรวจจับรอยรั่วอิเล็กทรอนิกส์ 2) ใช้น้ำสบู่ทาตามจุดต่อ 3) ใช้น้ำยาเรืองแสง (UV Dye) และไฟ UV ส่อง 4) สังเกตคราบน้ำมันรอบๆ ข้อต่อ รอยรั่วที่พบบ่อย: ข้อต่อท่อ, ซีลคอมเพรสเซอร์, คอนเดนเซอร์",
          imageUrl: "/images/leak-detection.jpg",
        },
        {
          title: "ขั้นตอนการเติมน้ำยาแอร์",
          detail:
            "1) ดูดน้ำยาเดิมออกด้วยเครื่องรีไซเคิล 2) ทำสุญญากาศ (Vacuum) ค้างไว้ 30 นาที เพื่อไล่ความชื้น 3) ตรวจว่าระบบรักษาสุญญากาศได้ (ไม่รั่ว) 4) เติมน้ำยาตามปริมาณที่กำหนด 5) ตรวจสอบการทำงานของระบบ",
          imageUrl: "/images/recharging-ac.jpg",
        },
        {
          title: "การบำรุงรักษาตามระยะ",
          detail:
            "เปลี่ยนไส้กรองแอร์ (Cabin Filter) ทุก 15,000-20,000 กม. ล้างอีวาพอเรเตอร์ด้วยน้ำยาทำความสะอาดหรือโฟมล้าง ตรวจสอบสายพานคอมเพรสเซอร์ ตรวจพัดลมคอนเดนเซอร์ เปิดแอร์อย่างน้อยสัปดาห์ละ 1 ครั้ง",
          imageUrl: "/images/periodic-maintenance.jpg",
        },
      ],
      keyPoints: [
        "ใช้มาตรวัดความดัน (Manifold Gauge) ตรวจค่าด้านสูงและด้านต่ำ",
        "ทำสุญญากาศ (Vacuum) ก่อนเติมน้ำยาทุกครั้ง",
        "เติมน้ำยาตามปริมาณที่ผู้ผลิตกำหนดเท่านั้น",
        "เปลี่ยนไส้กรองแอร์ทุก 15,000-20,000 กม.",
        "ล้างอีวาพอเรเตอร์เพื่อป้องกันกลิ่นอับ",
      ],
    },
  },
];

export const courseInfo = {
  title: "งานปรับอากาศรถยนต์",
  subtitle: "Automotive Air Conditioning",
  description:
    "สรุปเนื้อหาและสื่อการเรียนรู้ระบบปรับอากาศรถยนต์ พร้อมแบบทดสอบก่อนเรียนและหลังเรียน",
  pretestFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSepznUvGXMmZXzktA0oQ-s20SOiWxvkch2BNUX7hZCKcb5TTw/viewform?usp=header",
  pretestSheetUrl:
    "https://docs.google.com/spreadsheets/d/1kfPKzZVDBFuWZt55Eg98t0N7MFo5ZUfpfOYEwN6JRtU/edit?gid=0#gid=0",
  posttestFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSepznUvGXMmZXzktA0oQ-s20SOiWxvkch2BNUX7hZCKcb5TTw/viewform?usp=header",
  posttestSheetUrl: "https://docs.google.com/spreadsheets",
};
