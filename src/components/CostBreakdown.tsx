import { assumptionsText, brl, calculators, defaultScenario } from "@/lib/costs";

export default function CostBreakdown({ slug }: { slug: string }) {
  const r = calculators[slug](defaultScenario);
  return (
    <div className="overflow-hidden rounded-3xl border border-areia-300/70 bg-white shadow-suave">
      <div className="bg-petroleo-900 p-8 text-white md:p-10">
        <p className="eyebrow text-petroleo-300">Custo estimado por ano</p>
        <p className="mt-3 font-serif text-5xl font-semibold md:text-6xl">{brl(r.total)}</p>
        <p className="mt-3 text-slate-300">Empresa com até {defaultScenario.employees} colaboradores e turnover de {defaultScenario.turnover * 100}%</p>
      </div>
      <table className="w-full text-left text-[15px]">
        <caption className="sr-only">Composição do custo estimado</caption>
        <thead className="bg-areia-100 text-xs uppercase tracking-wider text-slate-500">
          <tr><th className="px-6 py-3 font-semibold md:px-10">Composição</th><th className="px-6 py-3 text-right font-semibold md:px-10">Valor/ano</th></tr>
        </thead>
        <tbody className="divide-y divide-areia-200">
          {r.items.map((i) => (
            <tr key={i.label}>
              <td className="px-6 py-4 md:px-10">
                <span className="font-medium text-petroleo-900">{i.label}</span>
                <span className="block text-sm text-slate-500">{i.how}</span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right font-semibold tabular-nums text-petroleo-900 md:px-10">{brl(i.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-areia-200 bg-areia-50 px-6 py-5 text-xs leading-relaxed text-slate-500 md:px-10">
        <p className="font-semibold text-slate-600">Premissas</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4">{assumptionsText.map((a) => <li key={a}>{a}</li>)}</ul>
      </div>
    </div>
  );
}
