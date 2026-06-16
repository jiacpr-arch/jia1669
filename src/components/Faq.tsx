"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Faq({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          {dict.faq.title}
        </h2>
        <div className="mt-12 space-y-4">
          {dict.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-ink-900">{item.q}</span>
                  <span
                    className={`grid h-7 w-7 flex-none place-items-center rounded-full bg-brand-50 text-brand-600 transition ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-slate-600">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
