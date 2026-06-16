import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n/config";

// เปลี่ยนเส้นทาง path ที่ยังไม่มี locale -> ใส่ locale นำหน้า (ค่าเริ่มต้น = ไทย)
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  // เดา locale จาก Accept-Language (รองรับเฉพาะ th/en)
  const accept = request.headers.get("accept-language") ?? "";
  const preferred = accept.toLowerCase().startsWith("en") ? "en" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // ข้ามไฟล์ static, _next, และ asset ที่มีนามสกุล
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
