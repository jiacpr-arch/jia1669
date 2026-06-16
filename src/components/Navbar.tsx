"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const sections = ["products", "packages", "features", "training", "faq", "contact"] as const;

export default function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // สลับ locale โดยคงเส้นทางเดิม (หน้าเดียวจึงเป็น /th หรือ /en)
  const otherLang: Locale = lang === "th" ? "en" : "th";
  const switchHref = pathname.replace(/^\/(th|en)/, `/${otherLang}`) || `/${otherLang}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
            <HeartIcon className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight text-ink-900">{dict.brand.name}</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
            >
              {dict.nav[s]}
            </a>
          ))}
          <Link
            href={switchHref}
            className="rounded-full border border-slate-300 px-3 py-1 text-sm font-semibold text-slate-700 transition hover:border-brand-600 hover:text-brand-600"
            aria-label={dict.language.label}
          >
            {dict.language.switchTo}
          </Link>
          <a
            href="#contact"
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            {dict.nav.cta}
          </a>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="text-2xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            {sections.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {dict.nav[s]}
              </a>
            ))}
            <div className="flex items-center gap-3 px-3 pt-2">
              <Link
                href={switchHref}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm font-semibold text-slate-700"
              >
                {dict.language.switchTo}
              </Link>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
              >
                {dict.nav.cta}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 21s-6.7-4.35-9.33-8.07C.9 10.27 1.4 6.9 4.06 5.6c1.94-.95 4.2-.3 5.4 1.36L12 9.5l2.54-2.54c1.2-1.66 3.46-2.31 5.4-1.36 2.66 1.3 3.16 4.67 1.39 7.33C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}
