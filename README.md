# JIA LUCK SA — เว็บไซต์ใหม่ (แทน jia1669.com)

เว็บไซต์แนะนำสินค้า/บริการ AED ขององค์กร **JIA LUCK SA** สองภาษา (ไทย/อังกฤษ)
สร้างด้วย **Next.js (App Router) + TypeScript + Tailwind CSS** สำหรับ deploy บน Vercel

## เริ่มใช้งาน

```bash
npm install
npm run dev        # เปิด http://localhost:3000 -> redirect ไป /th
npm run build      # ตรวจ build ก่อน deploy
npm run lint
```

- `/` จะถูก redirect ไป `/th` (ไทยเป็นค่าเริ่มต้น) หรือ `/en` ตาม Accept-Language
- สลับภาษาได้จากปุ่มบน navbar

## โครงสร้าง

```
middleware.ts                 redirect ใส่ locale (th/en)
src/i18n/config.ts            รายการ locale
src/i18n/dictionaries.ts      โหลด dictionary ตามภาษา
src/i18n/dictionaries/th.json ข้อความภาษาไทย (แก้เนื้อหาที่นี่)
src/i18n/dictionaries/en.json ข้อความภาษาอังกฤษ (แก้เนื้อหาที่นี่)
src/app/[lang]/layout.tsx     root layout + ฟอนต์ + metadata
src/app/[lang]/page.tsx       ประกอบทุก section
src/components/*              section ต่าง ๆ (Hero, Products, Packages, ...)
src/lib/site.ts               ค่าติดต่อ (โทร/FB/LINE/อีเมล)
public/                       รูป/โลโก้
```

## วิธีแก้เนื้อหา

แก้ข้อความทั้งหมดที่ `src/i18n/dictionaries/th.json` และ `en.json` (โครงสร้างเหมือนกัน
ทั้งสองไฟล์ — แก้คู่กันเสมอ)

## ข้อมูลที่ดึงมาจากเว็บเดิม (jia1669.com)

เว็บเดิมดึงตรงไม่ได้ — network egress policy ของ environment ที่ใช้พัฒนาบล็อกโดเมนนี้
(CONNECT ตอบ 403) และตัวเว็บเองก็บล็อก bot เนื้อหาชุดล่าสุดจึงประกอบจากผลค้นหาเว็บ
(หน้า/สินค้าที่ index ไว้) แล้วเรียบเรียงใหม่ ไม่ได้คัดลอกหน้าเว็บเดิมมาตรง ๆ

หน้าเว็บเดิมที่ใช้อ้างอิง: `/smartaed` (แพ็กเกจ AED+GPS), `/product/.../aed-life`,
`/en/product/.../jia-mindray-aed`, `/en/product/.../jia-zoll`,
`/en/product/.../jia-aed-gps`, `/en/trainer`, `/form-10000`, `/en/category/...`

สิ่งที่เติมเข้ามาในเว็บใหม่รอบนี้:

- **รายการสินค้าจริง 9 รายการ** พร้อมสเปกย่อ — AED Life (เกาหลีใต้ · ไม่เกิน 2.2 กก. ·
  แบตลิเธียมแมงกานีส · เสียงไทย · เด็ก/ผู้ใหญ่), JIA AED+GPS (200–360 J · ติดตาม 24 ชม.),
  JIA Mindray (BeneHeart · FDA), JIA Zoll (AED Plus), ตู้/Standbox, AED Trainer,
  แผ่นอิเล็กโทรด/แบตเตอรี่, อบรม, บริการสาธิต
- **section `trust`** — JIA TRAINER CENTER, ครูฝึกจากคณะแพทยศาสตร์ รพ.รามาธิบดี,
  มาตรฐาน CE/FDA, เลขทะเบียนนิติบุคคล 0745554004303 และโครงการรางวัล 10,000 บาท
- **หลักสูตรอบรม 3 แบบ** ใน section `training` (บุคคลทั่วไปเริ่ม 500 บาท/คน · In-house ·
  อบรมสำหรับผู้ซื้อเครื่อง)
- **ลิงก์ช่องทางจริง** ใน `src/lib/site.ts` — LINE OA `page.line.me/liv5598u`,
  ร้าน Lazada, เว็บศูนย์อบรม jiacpr.com

## สิ่งที่ต้องเติม/ตรวจสอบให้ครบ (ค้นหา `TODO` ในโค้ด)

> ข้อมูลด้านล่างมาจากผลค้นหา ยังไม่ได้ยืนยันกับหน้าเว็บเดิมโดยตรง ควรตรวจก่อนใช้จริง

- **เงื่อนไขโครงการรางวัล 10,000 บาท** — หน้า `/form-10000` ของเว็บเดิม (ตอนนี้เขียนแบบ
  "เงื่อนไขเป็นไปตามที่บริษัทกำหนด")
- **ราคาอบรม 500 บาท/คน** และรายละเอียดหลักสูตร — ตรวจกับ jiacpr.com
- **รูปสินค้าของ JIA Mindray, JIA Zoll และแผ่นอิเล็กโทรด** — ยังไม่มีไฟล์ใน `public/images/`
  จึงแสดง placeholder อยู่
- **ราคาแต่ละแพ็กเกจ/สินค้า** — ใน `dictionaries/*.json`
- **รูปสินค้า/โลโก้/ภาพอบรมจริง** — วางใน `public/` แล้วแทนที่ placeholder ใน
  `Hero.tsx`, `Products.tsx`, `Training.tsx`
- **ที่อยู่บริษัทเต็ม + LINE ID จริง** — `dictionaries/*.json` และ `src/lib/site.ts`
- **อีเมลรับฟอร์มติดต่อ** — `src/lib/site.ts` (`email`) ปัจจุบันฟอร์มใช้ `mailto`
  เป็น fallback หากต้องการเก็บลงระบบให้ทำ API route / เชื่อมบริการอีเมล
- **สเปก AED แต่ละรุ่น** — เพิ่มใน `dictionaries/*.json`

## Deploy (Vercel)

push branch แล้ว import โปรเจกต์เข้า Vercel ได้เลย (ตรวจจับ Next.js อัตโนมัติ ไม่ต้อง
ตั้งค่าเพิ่ม) หรือ deploy ผ่าน Vercel CLI / MCP

ข้อมูลติดต่อปัจจุบัน: โทร 090-979-1212 · Facebook /jialucksa
