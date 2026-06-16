import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

export default function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
              ❤️
            </span>
            <div>
              <p className="font-bold text-ink-900">{dict.brand.name}</p>
              <p className="text-sm text-slate-500">{dict.footer.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-sm font-medium text-slate-600">
            <a href={site.phoneHref} className="hover:text-brand-600">
              {dict.contact.phone}
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-600"
            >
              {dict.contact.facebookLabel}
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-sm text-slate-400">
          © {year} {dict.brand.name}. {dict.footer.rights}.
        </div>
      </div>
    </footer>
  );
}
