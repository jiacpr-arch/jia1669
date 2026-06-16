import type { Locale } from "./config";

// โหลด dictionary แบบ dynamic เพื่อให้ split เป็นไฟล์ละภาษา
const dictionaries = {
  th: () => import("./dictionaries/th.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
} as const;

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["th"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
