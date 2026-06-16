// helper เรียก Meta Pixel event แบบปลอดภัย (ทำงานเฉพาะฝั่ง client หลัง pixel โหลด)
type Fbq = (action: string, event: string, params?: Record<string, unknown>) => void;

export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") fbq("track", event, params);
}
