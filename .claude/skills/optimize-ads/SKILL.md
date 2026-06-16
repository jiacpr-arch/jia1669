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
5. **หลัง PR Pixel merge:** ยืนยัน Pixel ยิง PageView ด้วย `ads_get_dataset_stats` (dataset `1277103750989853`)
   แล้ว "เสนอ" สลับ ad set A เป็น `LANDING_PAGE_VIEWS` + `promoted_object={"pixel_id":"1277103750989853"}`

## สรุปทุกครั้ง
ตาราง 2 แคมเปญ (spend, ผลลัพธ์, ต้นทุน/ผลลัพธ์, CTR, frequency) + อะไรถูกแก้ + เหตุผล + step ถัดไป
