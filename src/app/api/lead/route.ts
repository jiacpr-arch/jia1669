import { NextRequest, NextResponse } from "next/server";

// Supabase project: jialucksa-crm — เก็บ lead จากเว็บลงตาราง web_leads
// (publishable key ปลอดภัยต่อการ insert เท่านั้น ตาม RLS policy)
const SUPABASE_URL = "https://cxlpazuwsajcjaidzupf.supabase.co";
const SUPABASE_KEY = "sb_publishable_uNYDFhVD8SDTH4NUKduddA_MYzvs2af";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const s = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

    const lead = {
      name: s(body.name, 200),
      company: s(body.company, 200),
      phone: s(body.phone, 50),
      message: s(body.message, 2000),
      locale: s(body.locale, 8),
      page: s(body.page, 200),
      source: "website",
      user_agent: s(req.headers.get("user-agent"), 300),
    };

    if (!lead.name && !lead.phone) {
      return NextResponse.json(
        { ok: false, error: "name or phone required" },
        { status: 400 },
      );
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/web_leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(lead),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ ok: false, error: text }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
