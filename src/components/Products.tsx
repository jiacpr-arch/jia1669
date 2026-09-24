import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Products({ dict }: { dict: Dictionary }) {
  return (
    <section id="products" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {dict.products.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{dict.products.subtitle}</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.products.items.map((p) => (
            <article
              key={p.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-square bg-gradient-to-br from-brand-50 to-white">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-2"
                  />
                ) : (
                  <span className="grid h-full w-full place-items-center text-5xl">❤️</span>
                )}
                {p.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {p.category}
                </span>
                <h3 className="mt-1 text-lg font-bold text-ink-900">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{p.desc}</p>
                {p.price && (
                  <p className="mt-3 text-lg font-extrabold text-brand-600">{p.price}</p>
                )}
                <a
                  href="#contact"
                  className="mt-4 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  {dict.packages.ctaLabel} →
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">{dict.products.priceNote}</p>
      </div>
    </section>
  );
}
