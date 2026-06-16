import type { Dictionary } from "@/i18n/dictionaries";

const icons = ["⏱️", "🏢", "🛡️"];

export default function ValueProps({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          {dict.valueProps.title}
        </h2>
        <p className="mt-4 text-lg text-slate-600">{dict.valueProps.subtitle}</p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {dict.valueProps.items.map((item, i) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl">
              {icons[i]}
            </div>
            <h3 className="mt-5 text-lg font-bold text-ink-900">{item.title}</h3>
            <p className="mt-2 text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
