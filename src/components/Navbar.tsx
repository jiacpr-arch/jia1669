"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const sections = ["packages", "products", "features", "training", "faq", "contact"] as const;

export default function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // สลับ locale โดยคงเส้นทางเดิม (หน้าเดียวจึงเป็น /th หรือ /en)
  const otherLang: Locale = lang === "th" ? "en" : "th";
  const switchHref = pathname.replace(/^\/(th|en)/, `/${otherLang}`) || `/${otherLang}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${lang}`} className="flex items-center gap-2.5 font-bold">
          <Image
            src="/images/logo-mark.svg"
            alt={dict.brand.name}
            width={62}
            height={35}
            priority
            className="h-9 w-auto"
          />
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
