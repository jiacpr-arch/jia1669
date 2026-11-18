"use client";

import Script from "next/script";
import { site } from "@/lib/site";

// Meta Pixel base code + PageView (โหลดทุกหน้า)
export default function MetaPixel() {
  const id = site.metaPixelId;
  if (!id) return null;
  return (
    <>
      {/* PDPA: the pixel loads only after "ยอมรับ" in the shared JIA cookie bar (public/jia-consent.js). */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`(function(w){var L=function(){if(L.d)return;L.d=1;
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${id}');
fbq('track','PageView');};
if(w.jiaConsent&&w.jiaConsent.marketing)L();else w.addEventListener('jia-consent',function(e){if(e.detail&&e.detail.marketing)L()});})(window);`}
      </Script>
    </>
  );
}
