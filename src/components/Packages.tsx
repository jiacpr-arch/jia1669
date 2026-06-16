import type { Dictionary } from "@/i18n/dictionaries";

export default function Packages({ dict }: { dict: Dictionary }) {
  return (
    <section id="packages" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          {dict.packages.title}
        </h2>
        <p className="mt-4 text-lg text-slate-600">{dict.packages.subtitle}</p>
      </div>
      <div className="mx-auto mt-14 grid max-w-4xl gap-8 lg:grid-cols-2">
        {dict.packages.plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-3xl border p-8 ${
              plan.highlight
                ? "border-brand-600 bg-white shadow-xl shadow-brand-600/10 ring-1 ring-brand-600"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-8 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
                {dict.packages.popularLabel}
              </span>
            )}
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              {plan.type}
            </span>
            <h3 className="mt-2 text-2xl font-extrabold text-ink-900">{plan.name}</h3>
            <p className="mt-2 text-slate-600">{plan.desc}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`mt-8 rounded-full px-6 py-3 text-center text-base font-semibold transition ${
                plan.highlight
                  ? "bg-brand-600 text-white hover:bg-brand-700"
                  : "border border-slate-300 text-slate-700 hover:border-brand-600 hover:text-brand-600"
              }`}
            >
              {dict.packages.ctaLabel}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
