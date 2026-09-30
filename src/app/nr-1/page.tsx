import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { calculators, brl, defaultScenario } from "@/lib/costs";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactSection from "@/components/ContactSection";
import FAQ from "@/components/FAQ";
import { getPilar } from "@/content/pilares";

export const metadata = pageMeta({
  title: "Adequação à NR-1: Riscos Psicossociais no PGR",
  description: "Fiscalização dos riscos psicossociais no PGR desde 26/05/2026. Diagnóstico, inventário, plano de ação e evidências auditáveis com a Selo Magna.",
  path: "/nr-1",
});

const steps = [
  { t: "Diagnóstico psicossocial", d: "Instrumentos validados, entrevistas e análise de indicadores por área." },
  { t: "Inventário de riscos", d: "Classificação dos fatores psicossociais integrada ao PGR, junto com o SESMT." },
  { t: "Plano de ação", d: "Medidas de prevenção com responsáveis, prazos e indicadores." },
  { t: "Evidências auditáveis", d: "Documentação organizada, pronta para fiscalização e auditorias." },
  { t: "Monitoramento", d: "Reavaliação periódica e relatórios comparáveis." },
];

export default function NR1() {
  const pgr = calculators["pgr-e-saude-mental"](defaultScenario);
  const faq = getPilar("pgr-e-saude-mental")!.faq;
  return (
    <>
      <section className="bg-petroleo-900 pb-20 pt-10 text-white md:pt-14">
        <div className="container">
          <div className="[&_*]:!text-slate-400"><Breadcrumbs items={[{ label: "NR-1", href: "/nr-1" }]} /></div>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-block rounded-full border border-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-petroleo-300">Fiscalização desde 26/05/2026</span>
              <h1 className="mt-6 text-5xl leading-[1.05] text-white md:text-6xl">NR-1 e riscos psicossociais: sua empresa está pronta para a fiscalização?</h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                A Portaria MTE nº 1.419/2024 incluiu os fatores de risco psicossociais no Gerenciamento de Riscos Ocupacionais. Depois de um ano
                de caráter educativo, a fiscalização com possibilidade de autuação está valendo. A Selo Magna faz a adequação completa, com gestão
                auditável e usando a ISO 45003 como referência.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="#formulario" className="btn-light" data-track="nr1_hero">Quero avaliar minha empresa</Link>
                <Link href="/blog/nr-1-riscos-psicossociais-o-que-muda" className="btn border border-white/20 text-white hover:bg-white/10">Ler o guia</Link>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-8 text-tinta">
              <p className="eyebrow">Exposição estimada / ano</p>
              <p className="mt-2 font-serif text-5xl font-semibold text-petroleo-900">{brl(pgr.total)}</p>
              <p className="mt-2 text-sm text-slate-500">Empresa de 100 colaboradores sem gestão psicossocial</p>
              <ul className="mt-6 space-y-3 text-sm">
                {pgr.items.map((i) => (
                  <li key={i.label} className="flex justify-between gap-4 border-t border-areia-200 pt-3"><span>{i.label}</span><strong className="whitespace-nowrap">{brl(i.value)}</strong></li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">Estimativa ilustrativa. Valores de autuação variam conforme a infração e o porte (NR-28).</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="text-4xl md:text-5xl">O caminho da adequação</h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.t} className="card p-6">
                <span className="font-serif text-3xl text-petroleo-500">0{i + 1}</span>
                <h3 className="mt-4 font-sans text-lg font-semibold tracking-normal">{s.t}</h3>
                <p className="mt-2 text-[15px] text-slate-600">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <div className="card">
              <h2 className="text-2xl">O que a fiscalização costuma verificar</h2>
              <ul className="mt-5 space-y-3">
                {["Riscos psicossociais identificados no inventário do PGR", "Método de avaliação utilizado", "Plano de ação com prazos e responsáveis", "Evidências de implementação e acompanhamento", "Participação dos trabalhadores no processo"].map((x) => (
                  <li key={x} className="flex gap-3 text-slate-700"><CheckCircle2 className="h-5 w-5 shrink-0 text-petroleo-500" />{x}</li>
                ))}
              </ul>
            </div>
            <div className="card bg-petroleo-50">
              <h2 className="text-2xl">Além da conformidade</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                O mesmo diagnóstico que atende à NR-1 revela quanto burnout, turnover e absenteísmo custam para a empresa e prepara o caminho
                para selos como o Certificado Empresa Promotora da Saúde Mental (Lei 14.831/2024) e o GPTW.
              </p>
              <Link href="/pilares" className="mt-6 inline-block font-semibold text-petroleo-500">Ver os 7 pilares →</Link>
            </div>
          </div>
          <div className="mx-auto mt-20 max-w-4xl"><FAQ items={faq} /></div>
        </div>
      </section>
      <ContactSection title="Descubra em que ponto sua empresa está na NR-1" defaultChallenge="Adequação à NR-1" origem="nr-1" />
    </>
  );
}
