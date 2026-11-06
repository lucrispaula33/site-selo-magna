"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { brl, calculators, type Scenario } from "@/lib/costs";
import { pilares } from "@/content/pilares";

/**
 * Práticas que a empresa pode já ter. Caixa desmarcada = prática ausente.
 * Cada prática marcada reduz os pilares ligados a ela (multiplicadores).
 * Premissas ilustrativas da Selo Magna: nunca zeram o custo, porque
 * ter a prática não garante que ela funcione bem.
 */
const PRATICAS: { id: string; label: string; fator: Record<string, number> }[] = [
  { id: "pgr", label: "Riscos psicossociais mapeados e registrados no PGR", fator: { "pgr-e-saude-mental": 0.4, "burnout-e-saude-mental": 0.9 } },
  { id: "plano", label: "Plano de ação em andamento, com responsáveis e prazos", fator: { "burnout-e-saude-mental": 0.85, "absenteismo-e-presenteismo": 0.9, "falta-de-engajamento": 0.9, "pgr-e-saude-mental": 0.8 } },
  { id: "indicadores", label: "Indicadores acompanhados todo mês (faltas, turnover, afastamentos)", fator: { "absenteismo-e-presenteismo": 0.85, "turnover-e-recrutamento": 0.9 } },
  { id: "lideranca", label: "Lideranças preparadas, que entendem seu papel e dão feedback com frequência", fator: { "falta-de-engajamento": 0.8, "turnover-e-recrutamento": 0.85, "treinamento-e-desenvolvimento": 0.85, "assedio-e-ambiente-toxico": 0.9, "burnout-e-saude-mental": 0.9 } },
  { id: "canal", label: "Canal de denúncia e prevenção ao assédio funcionando", fator: { "assedio-e-ambiente-toxico": 0.6 } },
];

export default function Calculator() {
  const [s, setS] = useState<Scenario>({ employees: 100, avgSalary: 3500, chargesFactor: 0.8, turnover: 0.35 });
  const [tem, setTem] = useState<Record<string, boolean>>({});
  const rows = useMemo(() => {
    const ativas = PRATICAS.filter((pr) => tem[pr.id]);
    return pilares.map((p) => {
      const base = calculators[p.slug](s).total;
      const mult = ativas.reduce((m, pr) => m * (pr.fator[p.slug] ?? 1), 1);
      return { p, v: base * mult };
    });
  }, [s, tem]);
  const total = rows.reduce((a, b) => a + b.v, 0);
  const max = Math.max(...rows.map((r) => r.v));
  const n = PRATICAS.filter((pr) => tem[pr.id]).length;

  const Field = ({ id, label, value, min, max, step, onChange, fmt }: { id: string; label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; fmt: (n: number) => string }) => (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="label mb-0">{label}</label>
        <output htmlFor={id} className="font-serif text-xl font-semibold text-petroleo-900">{fmt(value)}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-3 w-full accent-petroleo-700" />
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <div className="card space-y-8 md:p-10">
        <h2 className="text-2xl">Dados da sua empresa</h2>
        <Field id="c-emp" label="Colaboradores" value={s.employees} min={20} max={1000} step={10} onChange={(v) => setS({ ...s, employees: v })} fmt={(v) => String(v)} />
        <Field id="c-sal" label="Salário médio" value={s.avgSalary} min={1600} max={15000} step={100} onChange={(v) => setS({ ...s, avgSalary: v })} fmt={brl} />
        <Field id="c-turn" label="Turnover anual" value={Math.round(s.turnover * 100)} min={5} max={80} step={1} onChange={(v) => setS({ ...s, turnover: v / 100 })} fmt={(v) => `${v}%`} />
        <Field id="c-enc" label="Encargos e benefícios" value={Math.round(s.chargesFactor * 100)} min={40} max={120} step={5} onChange={(v) => setS({ ...s, chargesFactor: v / 100 })} fmt={(v) => `${v}%`} />
        <fieldset className="space-y-3 border-t border-areia-200 pt-6">
          <legend className="label mb-1">O que a sua empresa já faz hoje?</legend>
          <p className="text-xs leading-relaxed text-slate-500">Marque só o que existe e funciona na prática. O que ficar em branco entra no cálculo como ausente.</p>
          {PRATICAS.map((pr) => (
            <label key={pr.id} className="flex cursor-pointer items-start gap-3 text-sm text-petroleo-900">
              <input type="checkbox" className="mt-0.5 h-4 w-4 accent-petroleo-700" checked={!!tem[pr.id]} onChange={(e) => setTem({ ...tem, [pr.id]: e.target.checked })} />
              <span>{pr.label}</span>
            </label>
          ))}
        </fieldset>
        <p className="text-xs leading-relaxed text-slate-500">Estimativa educativa com premissas conservadoras de mercado. Parte dos custos se sobrepõe entre os pilares. As reduções para cada prática marcada são premissas ilustrativas da Selo Magna: ter a prática não garante que ela funcione bem. Para um número preciso, faça o diagnóstico.</p>
      </div>
      <div className="overflow-hidden rounded-3xl border border-areia-300/70 bg-white shadow-suave" aria-live="polite">
        <div className="bg-petroleo-900 p-8 text-white md:p-10">
          <p className="eyebrow text-petroleo-300">{n === 0 ? "Custo oculto estimado por ano" : "Custo oculto que ainda pode existir por ano"}</p>
          <p className="mt-2 font-serif text-5xl font-semibold md:text-6xl">{brl(total)}</p>
          <p className="mt-2 text-slate-300">≈ {brl(total / 12)} por mês · {brl(total / s.employees)} por colaborador/ano</p>
          <p className="mt-4 rounded-xl bg-white/10 p-3 text-sm leading-relaxed text-slate-200">
            {n === 0
              ? "Cenário considerado: empresa sem riscos psicossociais no PGR, sem plano de ação, sem acompanhamento de indicadores, com lideranças que têm dificuldade com seu papel e responsabilidades e sem canal contra assédio. Se a sua empresa já tem alguma dessas práticas, marque em \u201cO que a sua empresa já faz hoje?\u201d."
              : n === PRATICAS.length
                ? "Sua empresa já tem as cinco práticas. O valor acima é uma referência do custo que ainda pode existir quando elas não funcionam como deveriam. O diagnóstico mostra onde ainda há risco."
                : `Cenário ajustado: ${n} de ${PRATICAS.length} práticas já em funcionamento. As demais entram no cálculo como ausentes.`}
          </p>
        </div>
        <ul className="space-y-5 p-8 md:p-10">
          {rows.map(({ p, v }) => (
            <li key={p.slug}>
              <div className="flex justify-between gap-4 text-[15px]">
                <Link href={`/pilares/${p.slug}`} className="font-medium text-petroleo-900 hover:underline">{p.short}</Link>
                <span className="font-semibold tabular-nums">{brl(v)}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-areia-200"><div className="h-2 rounded-full bg-petroleo-500 transition-all" style={{ width: `${(v / max) * 100}%` }} /></div>
            </li>
          ))}
        </ul>
        <div className="border-t border-areia-200 p-8 md:px-10">
          <Link href="#formulario" className="btn-primary w-full" data-track="calculadora_cta">Quero reduzir esses custos</Link>
        </div>
      </div>
    </div>
  );
}
