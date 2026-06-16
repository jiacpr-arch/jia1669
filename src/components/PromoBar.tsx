import type { Dictionary } from "@/i18n/dictionaries";

// แถบโปรโมชันราคาแดงด่วน ใต้ Hero — hook ราคาให้คนจาก Ads เห็นไว
export default function PromoBar({ dict }: { dict: Dictionary }) {
  return (
    <a
      href="#packages"
      className="block bg-brand-600 text-white transition hover:bg-brand-700"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 text-center text-sm font-semibold sm:text-base">
        {dict.promo.bar}
      </div>
    </a>
  );
}
