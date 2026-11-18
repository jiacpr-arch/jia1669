import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import MetaPixel from "@/components/MetaPixel";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-noto-thai",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: { icon: "/favicon.svg" },
  };
}

// Small settings button bottom-left; LINE / phone buttons stay bottom-right.
const JIA_CONSENT_CONFIG = `window.JIA_CONSENT={color:'#dc2626',onColor:'#ffffff',simple:true,compact:true,fab:true,bannerBottom:150,policyUrl:'https://jia1669.com',compactText:'ใช้คุกกี้เพื่อวัดผลโฆษณา'};`;

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang as Locale} className={`${notoSansThai.variable} ${inter.variable}`}>
      <head>
        {/* Shared JIA cookie consent (PDPA): one compact bar on every JIA site, loaded before any tag. */}
        <script dangerouslySetInnerHTML={{ __html: JIA_CONSENT_CONFIG }} />
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- consent defaults must land before tags */}
        <script src="/jia-consent.js" />
      </head>
      <body>
        <MetaPixel />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
