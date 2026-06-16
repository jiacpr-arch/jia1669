import { site } from "@/lib/site";

// ปุ่มลอยติดต่อด่วน (LINE + โทร) มุมขวาล่าง เห็นตลอดทุกหน้าจอ — เพิ่มอัตราติดต่อ
export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3">
      <a
        href={site.line}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LINE"
        className="flex h-14 items-center gap-2 rounded-full bg-[#06C755] px-4 text-white shadow-lg shadow-black/20 transition hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <path d="M12 2C6.48 2 2 5.69 2 10.23c0 4.07 3.55 7.48 8.36 8.13.32.07.77.21.88.49.1.25.06.64.03.89l-.14.85c-.04.25-.2.98.86.53s5.7-3.36 7.78-5.75C21.13 13.87 22 12.13 22 10.23 22 5.69 17.52 2 12 2zM8.13 12.6H6.2c-.28 0-.5-.23-.5-.5V8.24c0-.28.22-.5.5-.5s.5.22.5.5v3.36h1.43c.28 0 .5.22.5.5s-.22.5-.5.5zm2-3.86v3.36c0 .27-.22.5-.5.5s-.5-.23-.5-.5V8.74c0-.28.22-.5.5-.5s.5.22.5.5zm4.37 3.36c0 .22-.14.4-.34.47a.5.5 0 0 1-.57-.18L11.7 9.93v2.07c0 .27-.22.5-.5.5s-.5-.23-.5-.5V8.74c0-.21.14-.4.34-.47a.5.5 0 0 1 .57.18l1.9 2.46V8.74c0-.28.22-.5.5-.5s.49.22.49.5v3.36zm3.07-2.18c.27 0 .5.22.5.5s-.23.5-.5.5h-1.43v.68h1.43c.27 0 .5.22.5.5s-.23.5-.5.5h-1.93c-.28 0-.5-.23-.5-.5V8.74c0-.28.22-.5.5-.5h1.93c.27 0 .5.22.5.5s-.23.5-.5.5h-1.43v.68h1.43z" />
        </svg>
        <span className="hidden text-sm font-bold sm:inline">LINE</span>
      </a>
      <a
        href={site.phoneHref}
        aria-label="โทร"
        className="flex h-14 items-center gap-2 rounded-full bg-brand-600 px-4 text-white shadow-lg shadow-black/20 transition hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
        <span className="hidden text-sm font-bold sm:inline">{site.phoneDisplay}</span>
      </a>
    </div>
  );
}
