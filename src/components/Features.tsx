import type { Dictionary } from "@/i18n/dictionaries";

const icons = ["📍", "🗄️", "🎓", "🛡️", "🔧", "🤝"];

export default function Features({ dict }: { dict: Dictionary }) {
  return (
    <section id="features" className="bg-ink-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {dict.features.title}
          </h2>
          <p className="mt-4 text-lg text-teal-100/80">{dict.features.subtitle}</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.features.items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="text-3xl">{icons[i]}</div>
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-teal-100/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
