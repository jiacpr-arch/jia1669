---
name: optimize-ads
description: ตรวจผลและปรับแคมเปญโฆษณา AED (Facebook/Instagram) ของ JIA LUCK SA แบบมีกติกากันพลาด — ใช้เมื่อถึงรอบวัดผล (วันที่ 7/14) หรือเมื่อผู้ใช้สั่ง "เช็กแอด"/"optimize ads". เรียกผ่าน scheduled trigger ของ Claude Code on the web ได้
---

# Optimize Ads — AED (JIA LUCK SA)

ดึงผลแคมเปญผ่าน Facebook Ads MCP แล้วปรับตาม "กติกาออโต้" ด้านล่าง พร้อมสรุปผลให้ผู้ใช้

## บัญชี & เอนทิตีที่ดูแล
- Ad account: `10153192786713173` (THB)
- Pixel: `1277103750989853`
- แคมเปญ A — Traffic เข้าเว็บ: `52563237861397` · ad set `52563239319397` · ad `52563239986197`
  - landing: https://jia1669.vercel.app/promo
- แคมเปญ B — Messenger Conversations: `52563237887997` · ad set `52563239364797` · ad `52563239994997`
  - เพจ Jia CPR `115768024942069`
- งบรวมเพดาน: **300 บาท/วัน** (CBO 150 + 150) — ห้ามเกินโดยไม่ขออนุมัติ

## ขั้นตอน
1. ดึงผลด้วย `ads_get_ad_entities` (level=campaign, date_preset=last_7d; fields: name, spend,
   impressions, reach, frequency, ctr, cpc, actions, cost_per_action_type). ดู level=ad ด้วยเพื่อหา ad ที่แย่
2. ตัวเทียบหลัก:
   - B (Messenger): ต้นทุนต่อแชท = `cost_per_action_type` ของ `onsite_conversion.messaging_conversation_started`
   - A (Traffic): ถ้า Pixel live แล้ว ดู cost/`landing_page_view`; ถ้ายัง ดู CPC/CTR
3. ตรวจว่าออก Learning หรือยัง (≈50 results/สัปดาห์/ad set หรือ ≥7 วัน+งบพอ) — ถ้ายัง **รายงานอย่างเดียว ไม่แก้**

## กติกาออโต้ (ทำเองได้ในกรอบ; นอกกรอบ = เสนอแล้วรอผู้ใช้ยืนยัน)
1. **โยกงบ:** ถ้าแคมเปญหนึ่ง "ต้นทุนต่อผลลัพธ์" ถูกกว่าอีกตัว ≥30% (หลังออก Learning) →
   `ads_update_entity` ปรับ `daily_budget` ย้าย **50 บาท/วัน (5000 cents)** จากตัวแพงไปตัวถูก
   (เช่น 15000/15000 → 20000/10000) — **งบรวมคงที่ 30000 cents/วันเสมอ**, ห้ามตั้งต่ำกว่า min 3297 cents, ห้ามปิดทั้งแคมเปญ
2. **พักเฉพาะ "แอด" ที่แย่ชัด:** ad ที่ CTR < 0.5% และ spend > 150 บาท และ results = 0 →
   `ads_update_entity` ตั้ง `status=PAUSED` เฉพาะ ad นั้น (ไม่แตะ ad set/แคมเปญ) แล้วรายงาน
3. **Frequency > 3 (7 วัน):** เตือน audience fatigue + แนะนำเปลี่ยนรูป/แคปชั่น (ไม่แก้เอง)
4. **ห้ามทำอัตโนมัติ — เสนอก่อน:** เปลี่ยน objective/targeting, เพิ่มงบรวม/เกิน 300/วัน,
   เปลี่ยน optimization_goal (เช่นสลับ Traffic เป็น `LANDING_PAGE_VIEWS` หลัง Pixel live), ปิดแคมเปญ
5. **Pixel live แล้ว (ยืนยัน PageView ยิงจริงตั้งแต่ 16 มิ.ย.):** A วิ่ง objective `LINK_CLICKS` อยู่แต่ Pixel จับ
   Landing Page View ได้ครบ (~3–4 บาท/ครั้ง). เมื่อ A ออก Learning ให้ "เสนอ" สลับ ad set A เป็น
   `optimization_goal=LANDING_PAGE_VIEWS` + `promoted_object={"pixel_id":"1277103750989853"}` เพื่อให้ Meta ดันคนที่โหลดหน้าจริง (ไม่เปลี่ยนเอง)

## เคสเฝ้าระวังพิเศษ — B (Messenger) ยิงงบแต่ไม่มีแชท
อาการที่พบช่วง 2 วันแรก: B มี CTR สูง (คนคลิก) แต่ `messaging_conversation_started` = 0 (คนกดดูแล้วไม่ทักต่อ)
ขณะที่ A (Traffic) ได้ Landing Page View ถูก (~3–4 บาท/ครั้ง). ตัดสินใจตามนี้:
1. **วันที่ 1–3 (Learning):** รายงานอย่างเดียว ไม่แตะ — ปกติที่แชทยังไม่เข้า
2. **วันที่ 4 เป็นต้นไป — ถ้า B ใช้งบสะสม > 300 บาท และแชท = 0:** ถือว่าผิดปกติชัด →
   - **โยกงบ 50 บาท/วัน จาก B ไป A** ทันที (B 150→100, A 150→200) ด้วย `ads_update_entity` (`daily_budget` 10000/20000 cents) — งบรวมคงที่ 300/วัน
   - **เด้งเตือนผู้ใช้** + เสนอเปลี่ยนแคปชั่น/รูป B ให้กระตุ้นการทักชัดขึ้น (เช่น "ทักเลยรับราคาพิเศษ/เช็คสต็อก") — ไม่เปลี่ยน creative เอง
3. **ถ้า B เริ่มมีแชทเข้าบ้าง (≥1):** ประเมินต้นทุน/แชท เทียบ A ตามกติกาโยกงบปกติ ไม่ต้องรีบลดงบ

## สรุปทุกครั้ง
ตาราง 2 แคมเปญ (spend, ผลลัพธ์, ต้นทุน/ผลลัพธ์, CTR, frequency) + อะไรถูกแก้ + เหตุผล + step ถัดไป
