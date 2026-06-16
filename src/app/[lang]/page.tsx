import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromoBar from "@/components/PromoBar";
import ValueProps from "@/components/ValueProps";
import Products from "@/components/Products";
import Packages from "@/components/Packages";
import Features from "@/components/Features";
import Training from "@/components/Training";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} />
        <PromoBar dict={dict} />
        <Packages dict={dict} />
        <Products dict={dict} />
        <ValueProps dict={dict} />
        <Features dict={dict} />
        <Training dict={dict} />
        <Faq dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
      <FloatingContact />
    </>
  );
}
