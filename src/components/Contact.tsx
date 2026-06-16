"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { track } from "@/lib/fbq";

export default function Contact({ dict }: { dict: Dictionary }) {
  const c = dict.contact;
  const [form, setForm] = useState({ name: "", company: "", phone: "", message: "" });

  // ยังไม่มี backend — ส่งผ่าน mailto เป็น fallback (TODO: ผูก API/บริการอีเมลจริง)
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    track("Lead"); // Meta Pixel — conversion เมื่อกรอกฟอร์มติดต่อ
    const subject = encodeURIComponent(`[${dict.brand.name}] ${form.name || "Inquiry"}`);
    const body = encodeURIComponent(
      `${c.form.name}: ${form.name}\n${c.form.company}: ${form.company}\n${c.form.phone}: ${form.phone}\n\n${form.message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="bg-ink-900 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{c.title}</h2>
          <p className="mt-4 text-lg text-teal-100/80">{c.subtitle}</p>

          <div className="mt-10 space-y-5">
            <a
              href={site.phoneHref}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <span className="text-2xl">📞</span>
              <span>
                <span className="block text-sm text-teal-100/70">{c.phoneLabel}</span>
                <span className="text-lg font-bold">{c.phone}</span>
              </span>
            </a>
            <div className="grid grid-cols-2 gap-4">
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <span className="text-xl">📘</span>
                <span className="font-semibold">{c.facebookLabel}</span>
              </a>
              <a
                href={site.line}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <span className="text-xl">💬</span>
                <span className="font-semibold">{c.lineLabel}</span>
              </a>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="block text-sm text-teal-100/70">{c.addressLabel}</span>
              <span className="mt-1 block text-teal-50">{c.address}</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-7 text-slate-900 shadow-xl"
        >
          <div className="space-y-4">
            <Field
              label={c.form.name}
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              required
            />
            <Field
              label={c.form.company}
              value={form.company}
              onChange={(v) => setForm({ ...form, company: v })}
            />
            <Field
              label={c.form.phone}
              type="tel"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              required
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {c.form.message}
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-700"
            >
              {c.form.submit}
            </button>
            <p className="text-center text-sm text-slate-500">{c.form.note}</p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}
