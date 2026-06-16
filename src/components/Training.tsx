import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Training({ dict }: { dict: Dictionary }) {
  return (
    <section id="training" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {dict.training.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{dict.training.subtitle}</p>
          <ul className="mt-8 space-y-4">
            {dict.training.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  ✓
                </span>
                <span className="text-slate-700">{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-700"
          >
            {dict.training.cta}
          </a>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
          <Image
            src="/images/cpr-course.jpg"
            alt="หลักสูตรอบรม CPR พร้อมใบประกาศ"
            width={1024}
            height={1386}
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
        <Image
          src="/images/training.jpg"
          alt="Jia Medical Trainer Center — CPR & AED training"
          width={1477}
          height={1108}
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
