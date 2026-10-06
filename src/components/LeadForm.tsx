"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { pilares } from "@/content/pilares";
import { site } from "@/config/site";
import sobre from "../../content/sobre.json";

const objetivosMentoria = [
  "Planejamento de carreira",
  "Assumir ou desenvolver uma liderança",
  "Mudança ou transição de carreira",
  "Recolocação profissional",
  "Currículo, LinkedIn e entrevistas",
  "Promoção e crescimento na empresa",
  "Empreender ou atuar como autônomo",
  "Outro objetivo",
];

/**
 * Formulário de contato:
 * 1) salva o contato na lista de e-mail marketing (Brevo), se configurado;
 * 2) abre o WhatsApp com a mensagem pronta;
 * 3) leva o visitante para a página /obrigado (usada para medir conversões).
 */
export default function LeadForm({ defaultChallenge, origem = "contato", mode = "empresa" }: { defaultChallenge?: string; origem?: string; mode?: "empresa" | "mentoria" }) {
  const mentoria = mode === "mentoria";
  const router = useRouter();
  const [sending, setSending] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (mentoria && f.mentora) f.mensagem = [`Mentora de preferência: ${f.mentora}`, f.mensagem].filter(Boolean).join("\n");
    setSending(true);

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, origem, consent: f.consent === "on" }),
      keepalive: true,
    }).catch(() => {});

    const msg = mentoria ? [
      `Olá, equipe ${site.name}! Vim pelo site e quero agendar uma mentoria.`,
      `*Nome:* ${f.nome}`,
      `*E-mail:* ${f.email}`,
      `*Perfil:* ${f.colaboradores}`,
      f.empresa ? `*Empresa:* ${f.empresa}` : "",
      `*Objetivo:* ${f.desafio}`,
      f.mensagem ? `*Mensagem:* ${f.mensagem}` : "",
    ].filter(Boolean).join("\n") : [
      `Olá, equipe ${site.name}! Vim pelo site.`,
      `*Nome:* ${f.nome}`,
      `*E-mail:* ${f.email}`,
      `*Empresa:* ${f.empresa}`,
      `*Colaboradores:* ${f.colaboradores}`,
      `*Principal desafio:* ${f.desafio}`,
      f.mensagem ? `*Mensagem:* ${f.mensagem}` : "",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    router.push("/obrigado");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 shadow-destaque sm:p-10" aria-label="Formulário de contato">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="label">Nome completo</label>
          <input id="nome" name="nome" required autoComplete="name" placeholder="Seu nome" className="field" />
        </div>
        <div>
          <label htmlFor="email" className="label">{mentoria ? "E-mail" : "E-mail corporativo"}</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder={mentoria ? "voce@email.com" : "voce@empresa.com.br"} className="field" />
        </div>
        <div>
          <label htmlFor="empresa" className="label">{mentoria ? "Empresa (opcional)" : "Empresa"}</label>
          <input id="empresa" name="empresa" required={!mentoria} autoComplete="organization" placeholder={mentoria ? "Se a mentoria for pela empresa" : "Nome da empresa"} className="field" />
        </div>
        {mentoria ? (
          <>
            <div>
              <label htmlFor="colaboradores" className="label">Você é</label>
              <select id="colaboradores" name="colaboradores" className="field" defaultValue="Profissional (pessoa física)">
                <option>Profissional (pessoa física)</option>
                <option>Empresa (mentoria para lideranças)</option>
              </select>
            </div>
            <div>
              <label htmlFor="desafio" className="label">Objetivo principal</label>
              <select id="desafio" name="desafio" className="field" defaultValue={objetivosMentoria[0]}>
                {objetivosMentoria.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="mentora" className="label">Mentora de preferência</label>
              <select id="mentora" name="mentora" className="field" defaultValue="Sem preferência">
                <option>Sem preferência</option>
                {sobre.partners.map((p) => <option key={p.name}>{p.name}</option>)}
              </select>
            </div>
          </>
        ) : (
          <>
            <div>
          <label htmlFor="colaboradores" className="label">Número de colaboradores</label>
          <select id="colaboradores" name="colaboradores" className="field" defaultValue="Até 50 colaboradores">
            <option>Até 50 colaboradores</option>
            <option>51 a 100 colaboradores</option>
            <option>101 a 300 colaboradores</option>
            <option>301 a 500 colaboradores</option>
            <option>Mais de 500 colaboradores</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="desafio" className="label">Principal desafio hoje</label>
          <select id="desafio" name="desafio" className="field" defaultValue={defaultChallenge ?? pilares[0].short}>
            {pilares.map((p) => <option key={p.slug}>{p.short}</option>)}
            <option>Adequação à NR-1</option>
            <option>Ainda não sei — quero um diagnóstico</option>
          </select>
        </div>
          </>
        )}
        <div className="sm:col-span-2">
          <label htmlFor="mensagem" className="label">Mensagem (opcional)</label>
          <textarea id="mensagem" name="mensagem" rows={3} placeholder={mentoria ? "Conte um pouco do seu momento profissional" : "Conte um pouco do contexto da sua empresa"} className="field" />
        </div>
        <label className="flex items-start gap-3 text-sm text-slate-600 sm:col-span-2">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-petroleo-700" />
          <span>
            Concordo com a <Link href="/politica-de-privacidade" className="underline">Política de Privacidade</Link> e aceito receber
            contato e conteúdos da {site.name}. Posso cancelar quando quiser.
          </span>
        </label>
      </div>
      <button type="submit" disabled={sending} className="btn-primary mt-7 w-full py-4 uppercase tracking-wider" data-track="form_whatsapp">
        {sending ? "Abrindo o WhatsApp…" : "Enviar pelo WhatsApp"}
      </button>
      <p className="mt-3 text-center text-sm text-slate-500">Ao enviar, você será direcionado ao WhatsApp com a mensagem pronta.</p>
    </form>
  );
}
