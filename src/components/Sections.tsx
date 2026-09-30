import Link from "next/link";
import { ArrowRight, ShieldCheck, Target, Users } from "lucide-react";
import { site } from "@/config/site";
import { pilares } from "@/content/pilares";
import { brlShort, defaultScenario, totalAll } from "@/lib/costs";
import Icon from "./Icon";

export function TrustBar() {
  return (
    <div className="border-y border-areia-300/70 bg-white">
      <ul className="container flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 md:text-[13px]">
        {site.trustBar.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </div>
  );
}

export function PillarsGrid({ title = "Sete frentes para transformar riscos invisíveis em performance." }: { title?: string }) {
  const last = pilares[pilares.length - 1];
  return (
    <section id="pilares" className="section scroll-mt-20 bg-petroleo-900 text-white">
      <div className="container">
        <p className="eyebrow text-slate-400">Pilares de atuação</p>
        <h2 className="mt-4 max-w-3xl text-4xl text-white md:text-5xl">{title}</h2>
        <div className="mt-14 overflow-hidden rounded-3xl border border-white/10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {pilares.slice(0, 6).map((p, i) => (
              <PillarCard key={p.slug} p={p} n={i + 1} />
            ))}
          </div>
          <Link href={`/pilares/${last.slug}`} className="group flex flex-col gap-4 border-t border-white/10 p-8 transition hover:bg-white/[0.03] md:flex-row md:items-end md:justify-between md:p-10">
            <div>
              <div className="flex items-center gap-4">
                <Icon name={last.icon} className="h-8 w-8 text-petroleo-400" />
                <span className="text-sm text-slate-500">07</span>
              </div>
              <h3 className="mt-5 text-2xl text-white">{last.short}</h3>
              <p className="mt-3 text-slate-400">{last.card}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-petroleo-400">
              Ver conteúdo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ p, n }: { p: (typeof pilares)[number]; n: number }) {
  return (
    <Link href={`/pilares/${p.slug}`} className="group relative border-white/10 p-8 transition hover:bg-white/[0.03] md:p-10 [&:not(:nth-child(3n))]:lg:border-r [&:nth-child(n+4)]:lg:border-t max-lg:border-b">
      <span className="absolute right-8 top-8 text-sm text-slate-500">0{n}</span>
      <Icon name={p.icon} className="h-8 w-8 text-petroleo-400" />
      <h3 className="mt-6 text-2xl text-white">{p.short}</h3>
      <p className="mt-3 leading-relaxed text-slate-400">{p.card}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-petroleo-400">
        Ver conteúdo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function CostSilence() {
  const total = totalAll();
  return (
    <section className="section">
      <div className="container">
        <div className="grid items-center gap-10 rounded-4xl border border-areia-300/70 bg-white p-8 shadow-suave md:p-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">O custo do silêncio</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Problemas de saúde mental não diagnosticados têm preço — e ele é alto.</h2>
            <p className="lead mt-6">
              Somando os sete problemas mapeados pela {site.name}, uma empresa de até {defaultScenario.employees} colaboradores com{" "}
              {defaultScenario.turnover * 100}% de turnover pode perder cerca de {brlShort(total).replace("R$ ", "R$ ")} por ano em custos
              ocultos. Cada pilar apresenta a conta detalhada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/calculadora" className="btn-primary">Calcular para a minha empresa <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/pilares/turnover-e-recrutamento" className="btn-outline">Ver um exemplo de cálculo</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat value={String(defaultScenario.employees)} label="Colaboradores de referência" />
            <Stat value={`${defaultScenario.turnover * 100}%`} label="Turnover anual de referência" />
            <Stat value={brlShort(total)} label="Perda estimada por ano*" highlight />
            <p className="text-xs text-slate-500 sm:col-span-3">*Soma de referência com premissas conservadoras. Parte dos custos se sobrepõe entre os pilares.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, highlight }: { value: string; label: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 ${highlight ? "bg-petroleo-500 text-white" : "border border-areia-300/70 bg-areia-100"}`}>
      <p className={`font-serif text-3xl font-semibold leading-tight md:text-4xl ${highlight ? "text-white" : "text-petroleo-900"}`}>{value}</p>
      <p className={`mt-3 text-sm ${highlight ? "text-petroleo-50" : "text-slate-600"}`}>{label}</p>
    </div>
  );
}

export function TeamGrid({ tone = "white" }: { tone?: "white" | "cream" }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {site.team.map((t) => (
        <div key={t.title} className={`rounded-2xl border border-areia-300/70 p-7 ${tone === "white" ? "bg-white" : "bg-areia-100"}`}>
          <h3 className="font-sans text-lg font-semibold tracking-normal">{t.title}</h3>
          <p className="mt-2 leading-relaxed text-slate-600">{t.text}</p>
        </div>
      ))}
    </div>
  );
}

export function MissionVisionValues() {
  const items = [
    { icon: Target, title: "Missão", body: <p>{site.mission}</p> },
    { icon: ShieldCheck, title: "Visão", body: <p>{site.vision}</p> },
    { icon: Users, title: "Valores", body: <ul className="space-y-2">{site.values.map((v) => <li key={v}>{v}</li>)}</ul> },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map(({ icon: I, title, body }) => (
        <div key={title} className="card">
          <I className="h-8 w-8 text-petroleo-500" strokeWidth={1.6} aria-hidden="true" />
          <h3 className="eyebrow mt-5 font-sans">{title}</h3>
          <div className="mt-4 leading-relaxed text-slate-600">{body}</div>
        </div>
      ))}
    </div>
  );
}

export function Differentials() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {site.differentials.map((d) => (
        <div key={d} className="flex items-center gap-4 rounded-2xl border border-areia-300/70 bg-white px-7 py-6 text-slate-700">
          <ArrowRight className="h-5 w-5 shrink-0 text-petroleo-500" /> {d}
        </div>
      ))}
    </div>
  );
}

/** O significado do nome: S.E.L.O. + Magna */
export function SeloMeaning() {
  return (
    <div className="grid items-center gap-10 rounded-4xl border border-areia-300/70 bg-white p-8 shadow-suave md:p-12 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <p className="eyebrow">Por que Selo Magna</p>
        <h2 className="mt-4 text-3xl md:text-4xl">Um nome que resume o que entregamos.</h2>
        <ul className="mt-8 space-y-4">
          {site.acronym.map((a) => (
            <li key={a.letter} className="flex items-baseline gap-4">
              <span className="w-8 shrink-0 font-serif text-4xl font-semibold leading-none text-petroleo-500">{a.letter}</span>
              <span className="text-lg text-petroleo-900">
                <strong className="font-semibold">{a.word.split(" ")[0]}</strong> {a.word.split(" ").slice(1).join(" ")}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl bg-petroleo-900 p-8 text-white">
        <p className="font-serif text-3xl">Magna</p>
        <p className="mt-4 leading-relaxed text-slate-300">{site.magnaMeaning}</p>
      </div>
    </div>
  );
}
