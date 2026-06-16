import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import Hero from "@/components/Hero";
import PromoBar from "@/components/PromoBar";
import Packages from "@/components/Packages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { site } from "@/lib/site";

// หน้า Landing สำหรับยิง Ads — ตัดเมนูออก เหลือ Hero(เครื่อง+ราคา) + ราคา + ติดต่อ
// เพื่อโฟกัส conversion สูงสุด
export default async function Promo({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
          <a
            href={site.phoneHref}
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            📞 {dict.contact.phone}
          </a>
        </div>
      </header>

      <PromoBar dict={dict} />
      <main>
        <Hero dict={dict} />
        <Packages dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
      <FloatingContact />
    </>
  );
}
