"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * Aviso de cookies (LGPD). O Google Analytics só é carregado
 * depois que o visitante clica em "Aceitar".
 */
const KEY = "selomagna-cookies";
const GA = process.env.NEXT_PUBLIC_GA_ID;

export default function CookieConsent() {
  const [choice, setChoice] = useState<string | null>("pending");
  useEffect(() => {
    try { setChoice(localStorage.getItem(KEY)); } catch { setChoice(null); }
  }, []);
  const save = (v: string) => {
    try { localStorage.setItem(KEY, v); } catch {}
    setChoice(v);
  };

  return (
    <>
      {GA && choice === "aceito" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA}');
            document.addEventListener('click',function(e){var t=e.target.closest('[data-track]');if(t)gtag('event','generate_lead_click',{label:t.getAttribute('data-track')});});`}
          </Script>
        </>
      )}
      {choice === null && (
        <div role="dialog" aria-label="Aviso de cookies" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-areia-300 bg-white p-5 shadow-destaque sm:right-24">
          <p className="text-sm text-slate-600">
            Usamos cookies para medir a audiência e melhorar sua experiência. Saiba mais na{" "}
            <Link href="/politica-de-privacidade" className="underline">Política de Privacidade</Link>.
          </p>
          <div className="mt-4 flex gap-3">
            <button onClick={() => save("aceito")} className="btn-primary px-5 py-2.5 text-sm">Aceitar</button>
            <button onClick={() => save("recusado")} className="btn-outline px-5 py-2.5 text-sm">Recusar</button>
          </div>
        </div>
      )}
    </>
  );
}
