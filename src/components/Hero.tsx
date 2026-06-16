import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-100 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700">
            ❤️ {dict.hero.badge}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
            {dict.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            {dict.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
            >
              {dict.hero.ctaPrimary}
            </a>
            <a
              href={site.phoneHref}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-brand-600 hover:text-brand-600"
            >
              📞 {dict.hero.ctaSecondary}
            </a>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
            {dict.hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-extrabold text-brand-600 sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-slate-500 sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          {/* TODO: แทนที่ด้วยภาพเครื่อง AED จริงใน /public */}
          <div className="aspect-[4/3] rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-brand-50 p-8 shadow-xl">
            <div className="grid h-full place-items-center rounded-2xl border-2 border-dashed border-brand-200 text-center">
              <div className="px-6">
                <span className="grid mx-auto h-20 w-20 place-items-center rounded-2xl bg-brand-600 text-4xl text-white">
                  ❤️
                </span>
                <p className="mt-4 text-lg font-bold text-ink-900">AED + GPS</p>
                <p className="mt-1 text-sm text-slate-500">
                  {dict.brand.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
