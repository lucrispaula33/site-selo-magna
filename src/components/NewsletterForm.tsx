"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setStatus("loading");
    const r = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, origem: "newsletter", consent: true }),
    }).catch(() => null);
    setStatus(r?.ok ? "ok" : "err");
  }
  if (status === "ok") return <p className="mt-3 text-sm text-petroleo-200">Pronto! Você vai receber nossos próximos conteúdos.</p>;
  return (
    <form onSubmit={onSubmit} className="mt-3 flex gap-2">
      <label htmlFor="nl-email" className="sr-only">Seu e-mail</label>
      <input id="nl-email" name="email" type="email" required placeholder="seu@email.com.br" className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-petroleo-300 focus:outline-none" />
      <button disabled={status === "loading"} className="rounded-lg bg-petroleo-500 px-4 text-sm font-semibold text-white hover:bg-petroleo-400">Assinar</button>
      {status === "err" && <span className="sr-only">Erro ao enviar</span>}
    </form>
  );
}
