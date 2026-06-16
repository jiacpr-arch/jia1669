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

## สิ่งที่ต้องเติมให้ครบ (ค้นหา `TODO` ในโค้ด)

> เนื้อหาดึงจากเว็บเดิม jia1669.com อัตโนมัติไม่ได้ (เว็บบล็อก bot) จึงสร้างจากข้อมูล
> เท่าที่รวบรวมได้ + เว้นจุดให้เติม

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
