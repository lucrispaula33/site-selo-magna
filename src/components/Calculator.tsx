"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { brl, calculators, type Scenario } from "@/lib/costs";
import { pilares } from "@/content/pilares";

export default function Calculator() {
  const [s, setS] = useState<Scenario>({ employees: 100, avgSalary: 3500, chargesFactor: 0.8, turnover: 0.35 });
  const rows = useMemo(() => pilares.map((p) => ({ p, v: calculators[p.slug](s).total })), [s]);
  const total = rows.reduce((a, b) => a + b.v, 0);
  const max = Math.max(...rows.map((r) => r.v));

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
        <Field id="c-emp" label="Colaboradores" value={s.employees} min={20} max={1000} step={10} onChange={(n) => setS({ ...s, employees: n })} fmt={(n) => String(n)} />
        <Field id="c-sal" label="Salário médio" value={s.avgSalary} min={1600} max={15000} step={100} onChange={(n) => setS({ ...s, avgSalary: n })} fmt={brl} />
        <Field id="c-turn" label="Turnover anual" value={Math.round(s.turnover * 100)} min={5} max={80} step={1} onChange={(n) => setS({ ...s, turnover: n / 100 })} fmt={(n) => `${n}%`} />
        <Field id="c-enc" label="Encargos e benefícios" value={Math.round(s.chargesFactor * 100)} min={40} max={120} step={5} onChange={(n) => setS({ ...s, chargesFactor: n / 100 })} fmt={(n) => `${n}%`} />
        <p className="text-xs leading-relaxed text-slate-500">Estimativa educativa com premissas conservadoras de mercado. Parte dos custos se sobrepõe entre os pilares. Para um número preciso, faça o diagnóstico.</p>
      </div>
      <div className="overflow-hidden rounded-3xl border border-areia-300/70 bg-white shadow-suave" aria-live="polite">
        <div className="bg-petroleo-900 p-8 text-white md:p-10">
          <p className="eyebrow text-petroleo-300">Custo oculto estimado por ano</p>
          <p className="mt-2 font-serif text-5xl font-semibold md:text-6xl">{brl(total)}</p>
          <p className="mt-2 text-slate-300">≈ {brl(total / 12)} por mês · {brl(total / s.employees)} por colaborador/ano</p>
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
