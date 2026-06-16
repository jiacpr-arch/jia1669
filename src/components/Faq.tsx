"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Faq({ dict }: { dict: Dictionary }) {
  // เปิดข้อแรกของหมวดแรกไว้ตั้งต้น (key = "หมวด-ข้อ")
  const [open, setOpen] = useState<string | null>("0-0");

  return (
    <section id="faq" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          {dict.faq.title}
        </h2>
        <p className="mt-4 text-center text-lg text-slate-600">{dict.faq.subtitle}</p>

        <div className="mt-12 space-y-10">
          {dict.faq.categories.map((cat, ci) => (
            <div key={cat.title}>
              <h3 className="mb-4 flex items-center gap-3 text-lg font-bold text-ink-900">
                <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-brand-600 text-sm text-white">
                  {ci + 1}
                </span>
                {cat.title}
              </h3>
              <div className="space-y-3">
                {cat.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  const isOpen = open === key;
                  return (
                    <div
                      key={item.q}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                    >
                      <button
                        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                        onClick={() => setOpen(isOpen ? null : key)}
                        aria-expanded={isOpen}
                      >
                        <span className="font-semibold text-ink-900">{item.q}</span>
                        <span
                          className={`grid h-7 w-7 flex-none place-items-center rounded-full bg-brand-50 text-brand-600 transition ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      {isOpen && <p className="px-6 pb-5 text-slate-600">{item.a}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
