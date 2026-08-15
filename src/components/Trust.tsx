import type { Dictionary } from "@/i18n/dictionaries";

export default function Trust({ dict }: { dict: Dictionary }) {
  return (
    <section id="trust" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          {dict.trust.title}
        </h2>
        <p className="mt-4 text-lg text-slate-600">{dict.trust.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dict.trust.items.map((item) => (
          <div
            key={item.value}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-lg font-extrabold text-brand-600">{item.value}</p>
            <p className="mt-2 text-sm text-slate-600">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl bg-ink-900 px-6 py-10 text-center sm:px-12">
        <span className="inline-block rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {dict.trust.award.badge}
        </span>
        <h3 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
          {dict.trust.award.title}
        </h3>
        <p className="mx-auto mt-4 max-w-3xl text-base text-slate-300">
          {dict.trust.award.desc}
        </p>
        <p className="mt-4 text-sm text-slate-400">{dict.trust.award.note}</p>
      </div>
    </section>
  );
}
