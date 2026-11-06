"use client";
import { useMemo, useState } from "react";
import { brl } from "@/lib/costs";

/**
 * Calculadora v2 (nov/2026).
 * A empresa informa os próprios indicadores. Cada um é comparado com uma
 * referência publicada (fontes no rodapé) e só a diferença entra como
 * custo evitável. Indicador não medido fica fora da conta.
 * As práticas não reduzem o custo: indicam o momento da empresa e o próximo passo.
 */

type Setor = "servicos" | "comercio" | "industria" | "construcao" | "agro";
const SETORES: { id: Setor; label: string; turnover: number }[] = [
  { id: "servicos", label: "Serviços (inclui saúde, educação, tecnologia)", turnover: 0.3205 },
  { id: "comercio", label: "Comércio e varejo", turnover: 0.3539 },
  { id: "industria", label: "Indústria", turnover: 0.3474 },
  { id: "construcao", label: "Construção", turnover: 0.6566 },
  { id: "agro", label: "Agropecuária", turnover: 0.5057 },
];

const REF = { faltas: 0.02, afastPor100: 1.13, desengajados: 0.11, acoesPor100: 0.29 };
const CUSTO_ACAO = 50000;

type IndId = "turn" | "falt" | "afas" | "deseng" | "acoes";
const INDICADORES: { id: IndId; nome: string; curto: string; unidade: "%" | "nº"; exemplo: number | null }[] = [
  { id: "turn", nome: "Turnover anual", curto: "Turnover", unidade: "%", exemplo: 40 },
  { id: "falt", nome: "Taxa de faltas", curto: "Faltas", unidade: "%", exemplo: 3.5 },
  { id: "afas", nome: "Afastamentos por saúde mental no ano", curto: "Afastamentos (saúde mental)", unidade: "nº", exemplo: 3 },
  { id: "deseng", nome: "Pessoas desengajadas na última pesquisa", curto: "Desengajamento", unidade: "%", exemplo: null },
  { id: "acoes", nome: "Ações por assédio ou dano moral nos últimos 2 anos", curto: "Ações por assédio", unidade: "nº", exemplo: 1 },
];

const PRATICAS = [
  "Riscos psicossociais mapeados e registrados no PGR",
  "Plano de ação em andamento, com responsáveis e prazos",
  "Indicadores acompanhados todo mês (faltas, turnover, afastamentos)",
  "Lideranças preparadas, que dão feedback com frequência",
  "Canal de denúncia e prevenção ao assédio funcionando",
];

const ESTAGIOS = {
  1: { nome: "Começando", sub: "0 a 2 práticas", titulo: "Começando: diagnóstico e riscos no PGR", itens: ["Diagnóstico psicossocial com o COPSOQ II-Br, respondido pelas equipes", "Registro dos riscos psicossociais no PGR, como pede a NR-1", "Primeiro painel com faltas, turnover e afastamentos"], cta: "Quero começar pelo diagnóstico" },
  2: { nome: "Estruturando", sub: "3 a 4 práticas", titulo: "Estruturando: plano de ação, lideranças e indicadores", itens: ["Plano de ação com responsáveis e prazos para os pontos de atenção", "Desenvolvimento das lideranças", "Acompanhamento mensal dos indicadores"], cta: "Quero estruturar o plano" },
  3: { nome: "Referência", sub: "5 práticas e indicadores saudáveis", titulo: "Referência: reconhecimento e manutenção", itens: ["Validação independente: o diagnóstico confirma se a percepção das equipes bate com as práticas", "Selo Magna Prata ou Ouro para mostrar a clientes, candidatos e relatórios ESG", "Acompanhamento dos indicadores, formação de novos líderes e renovação anual do selo", "Preparação para GPTW, ISO 45003 e Certificado Empresa Promotora da Saúde Mental"], cta: "Quero ser reconhecida como referência" },
} as const;

const num = (v: number) => v.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
const pct = (v: number) => `${num(v)}%`;

export default function Calculator() {
  const [emp, setEmp] = useState(100);
  const [sal, setSal] = useState(3500);
  const [enc, setEnc] = useState(80);
  const [setor, setSetor] = useState<Setor>("servicos");
  const [vals, setVals] = useState<Record<IndId, number>>(() => Object.fromEntries(INDICADORES.map((i) => [i.id, i.exemplo ?? 0])) as Record<IndId, number>);
  const [naoMede, setNaoMede] = useState<Record<IndId, boolean>>(() => Object.fromEntries(INDICADORES.map((i) => [i.id, i.exemplo === null])) as Record<IndId, boolean>);
  const [praticas, setPraticas] = useState<boolean[]>(PRATICAS.map(() => false));

  const r = useMemo(() => {
    const N = Math.max(1, emp || 1);
    const mes = sal * (1 + enc / 100), ano = 12 * mes, folha = ano * N;
    const saida = 1.3 * sal + 0.6 * sal + 0.4 * sal + 3 * mes * 0.4;
    const afast = 0.5 * mes + 2 * mes * 0.5;
    const refTurn = SETORES.find((x) => x.id === setor)!.turnover;
    const refTxt: Record<IndId, string> = {
      turn: `${pct(refTurn * 100)} (média do setor)`,
      falt: "2,0% das horas",
      afas: `${num((N * REF.afastPor100) / 100)} por ano (1,1 por 100)`,
      deseng: "11% (Brasil)",
      acoes: `${num((N * REF.acoesPor100) / 100)} por ano (0,29 por 100)`,
    };
    const calc: Record<IndId, (v: number) => [number, number, string]> = {
      turn: (v) => [(N * v) / 100 * saida, N * refTurn * saida, pct(v)],
      falt: (v) => [(v / 100) * folha * 1.3, REF.faltas * folha * 1.3, pct(v)],
      afas: (v) => [v * afast, ((N * REF.afastPor100) / 100) * afast, num(v)],
      deseng: (v) => [(v / 100) * N * ano * 0.18, REF.desengajados * N * ano * 0.18, pct(v)],
      acoes: (v) => [(v / 2) * CUSTO_ACAO, ((N * REF.acoesPor100) / 100) * CUSTO_ACAO, `${num(v)} em 2 anos`],
    };
    let hoje = 0, naRef = 0, evitavel = 0;
    const acima: string[] = [], semDado: string[] = [];
    const linhas = INDICADORES.map((i) => {
      if (naoMede[i.id]) { semDado.push(i.nome.toLowerCase()); return { i, medido: false as const, ref: refTxt[i.id] }; }
      const [h, rf, txt] = calc[i.id](Math.max(0, vals[i.id] || 0));
      const ev = Math.max(0, h - rf);
      hoje += h; naRef += Math.min(h, rf); evitavel += ev;
      if (ev > 0) acima.push(i.nome.toLowerCase());
      return { i, medido: true as const, ref: refTxt[i.id], h, ev, txt };
    });
    const medidos = INDICADORES.length - semDado.length;
    const P = praticas.filter(Boolean).length;
    const estagio: 1 | 2 | 3 = P <= 2 ? 1 : P === 5 && medidos >= 3 && acima.length === 0 ? 3 : 2;
    return { N, refTxt, linhas, hoje, naRef, evitavel, acima, semDado, medidos, P, estagio };
  }, [emp, sal, enc, setor, vals, naoMede, praticas]);

  const semTxt = r.semDado.length ? ` Sem medição: ${r.semDado.join(", ")}.` : "";
  const topo = r.medidos === 0
    ? { eye: "Sem indicadores informados", titulo: "Sem números, não dá para saber quanto a empresa perde", texto: "A NR-1 pede que a empresa acompanhe os riscos psicossociais. Começar a medir faltas, turnover e afastamentos é o primeiro passo, e o diagnóstico mostra o restante." }
    : r.acima.length === 0
      ? { eye: "Resultado positivo", titulo: "Seus indicadores estão saudáveis", texto: `Os números informados estão dentro da referência. O próximo passo é manter esse resultado e mostrar isso ao mercado.${semTxt}` }
      : { eye: "Custo evitável estimado", titulo: `${brl(r.evitavel)} por ano acima da referência`, texto: `≈ ${brl(r.evitavel / 12)} por mês · ${brl(r.evitavel / r.N)} por colaborador. Pontos de atenção: ${r.acima.join(", ")}.${semTxt}` };
  const est = ESTAGIOS[r.estagio];
  const estTitulo = r.estagio === 2 && r.P === 5 ? "Estruturando: as práticas existem, mas os indicadores ainda não confirmam o resultado" : est.titulo;
  const input = "w-full rounded-xl border border-areia-300 bg-areia-50 px-3 py-2.5 text-[15px] tabular-nums text-petroleo-900 focus:outline-none focus:ring-2 focus:ring-petroleo-500";

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr]">
        <form className="card min-w-0 space-y-8 md:p-10" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="min-w-0 space-y-4">
            <legend className="mb-2 font-serif text-2xl text-petroleo-900">Dados da empresa</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block"><span className="label">Colaboradores</span><input id="c-emp" type="number" min={1} step={1} value={emp} onChange={(e) => setEmp(Number(e.target.value))} className={input} /></label>
              <label className="block"><span className="label">Salário médio (R$)</span><input id="c-sal" type="number" min={1000} step={100} value={sal} onChange={(e) => setSal(Number(e.target.value))} className={input} /></label>
              <label className="block"><span className="label">Encargos e benefícios (%)</span><input id="c-enc" type="number" min={0} max={200} step={5} value={enc} onChange={(e) => setEnc(Number(e.target.value))} className={input} /></label>
              <label className="block"><span className="label">Setor</span>
                <select id="c-setor" value={setor} onChange={(e) => setSetor(e.target.value as Setor)} className={input}>
                  {SETORES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select></label>
            </div>
          </fieldset>

          <fieldset className="min-w-0 space-y-4">
            <legend className="mb-2 font-serif text-2xl text-petroleo-900">Indicadores reais (últimos 12 meses)</legend>
            <p className="text-xs leading-relaxed text-slate-500">Os valores abaixo são um exemplo. Troque pelos da sua empresa. Se a empresa não mede um indicador, marque “Não medimos”: ele fica fora da conta.</p>
            {INDICADORES.map((i) => (
              <div key={i.id} className="space-y-2 border-t border-areia-200 pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <label htmlFor={`c-${i.id}`} className="text-sm font-semibold text-petroleo-900">{i.nome}</label>
                  <span className="text-xs text-slate-500">Referência: {r.refTxt[i.id]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <input id={`c-${i.id}`} type="number" min={0} step={i.unidade === "%" ? 0.1 : 1} disabled={naoMede[i.id]}
                    value={naoMede[i.id] ? "" : vals[i.id]} onChange={(e) => setVals({ ...vals, [i.id]: Number(e.target.value) })}
                    className={`${input} disabled:opacity-50`} aria-label={`${i.nome} (${i.unidade})`} />
                  <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="h-4 w-4 accent-petroleo-700" checked={naoMede[i.id]} onChange={(e) => setNaoMede({ ...naoMede, [i.id]: e.target.checked })} /> Não medimos
                  </label>
                </div>
              </div>
            ))}
          </fieldset>

          <fieldset className="min-w-0 space-y-3 border-t border-areia-200 pt-6">
            <legend className="mb-2 font-serif text-2xl text-petroleo-900">O que a empresa já faz</legend>
            <p className="text-xs leading-relaxed text-slate-500">As práticas não reduzem o custo na conta. Elas indicam o momento da empresa e o próximo passo.</p>
            {PRATICAS.map((label, k) => (
              <label key={label} className="flex cursor-pointer items-start gap-3 text-sm text-petroleo-900">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-petroleo-700" checked={praticas[k]} onChange={(e) => setPraticas(praticas.map((v, j) => (j === k ? e.target.checked : v)))} />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
        </form>

        <div className="min-w-0 space-y-6" aria-live="polite">
          <div className="rounded-3xl bg-petroleo-900 p-8 text-white md:p-10">
            <p className="eyebrow text-petroleo-300">{topo.eye}</p>
            <p className="mt-3 font-serif text-3xl font-semibold leading-tight md:text-4xl">{topo.titulo}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{topo.texto}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[["Custo hoje", r.hoje], ["Na referência", r.naRef], ["Custo evitável por ano", r.evitavel]].map(([l, v], k) => (
                <div key={l as string} className={`rounded-2xl p-4 ${k === 2 ? "bg-petroleo-500/30" : "bg-white/10"}`}>
                  <p className="text-xs text-petroleo-200">{l}</p>
                  <p className="mt-1 font-serif text-2xl font-semibold tabular-nums">{r.medidos ? brl(v as number) : "—"}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-areia-300/70 bg-white">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="bg-areia-200 text-left text-xs uppercase tracking-wider text-slate-600">
                <tr><th className="p-3">Indicador</th><th className="p-3 text-right">Seu número</th><th className="p-3 text-right">Referência</th><th className="p-3 text-right">Custo hoje</th><th className="p-3 text-right">Evitável</th></tr>
              </thead>
              <tbody>
                {r.linhas.map((l) => (
                  <tr key={l.i.id} className="border-t border-areia-200 align-top">
                    <td className="min-w-[170px] p-3 text-petroleo-900">{l.i.curto}<br />
                      {!l.medido ? <span className="mt-1 inline-block whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">Não medido</span>
                        : l.ev > 0 ? <span className="mt-1 inline-block whitespace-nowrap rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">Acima da referência</span>
                          : <span className="mt-1 inline-block whitespace-nowrap rounded-full bg-salvia-100 px-2 py-0.5 text-xs font-semibold text-salvia-500">Dentro da referência</span>}
                    </td>
                    <td className="whitespace-nowrap p-3 text-right tabular-nums">{l.medido ? l.txt : "—"}</td>
                    <td className="p-3 text-right tabular-nums text-slate-600">{l.ref}</td>
                    <td className="whitespace-nowrap p-3 text-right tabular-nums">{l.medido ? brl(l.h) : "—"}</td>
                    <td className="whitespace-nowrap p-3 text-right font-semibold tabular-nums">{l.medido ? brl(l.ev) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card space-y-4">
            <p className="eyebrow">Momento da empresa</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {([1, 2, 3] as const).map((k) => (
                <div key={k} className={`rounded-xl border p-3 text-xs ${k === r.estagio ? "border-petroleo-500 bg-areia-200 text-petroleo-900" : "border-areia-300 text-slate-500"}`}>
                  <b className="block text-sm text-petroleo-900">{ESTAGIOS[k].nome}</b>{ESTAGIOS[k].sub}
                </div>
              ))}
            </div>
            <p className="font-serif text-xl font-semibold text-petroleo-900">{estTitulo}</p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700">{est.itens.map((x) => <li key={x}>{x}</li>)}</ul>
            <a href="#formulario" className="btn-primary w-full" data-track="calculadora_cta">{est.cta}</a>
          </div>
        </div>
      </div>

      <footer className="space-y-2 border-t border-areia-300 pt-5 text-xs leading-relaxed text-slate-500">
        <p><b className="text-slate-700">Referências.</b> Turnover por setor: Tendências Consultoria com dados do Caged, set/2023 a ago/2024 (Brasil 34,74%; comércio 35,39%; serviços 32,05%; construção 65,66%; agropecuária 50,57%; indústria usa a média Brasil), via <a className="underline" href="https://www.campograndenews.com.br/economia/em-ms-35-a-cada-100-trabalhadores-sairam-das-empresas-ou-foram-demitidos" target="_blank" rel="noopener">Campo Grande News</a> e <a className="underline" href="https://solides.com.br/blog/media-de-turnover-aceitavel/" target="_blank" rel="noopener">Sólides</a>. Faltas: 2,0% das horas de trabalho, <a className="underline" href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/sicknessabsenceinthelabourmarket/latest" target="_blank" rel="noopener">ONS, Reino Unido, 2025</a>; não há série oficial brasileira. Afastamentos: 546.254 benefícios por transtornos mentais em 2025 (<a className="underline" href="https://agenciagov.ebc.com.br/noticias/202601/previdencia-social-concede-546-254-beneficios-por-incapacidade-temporaria-por-transtornos-mentais-e-comportamentais" target="_blank" rel="noopener">Previdência Social</a>) ÷ 48.474.348 empregos formais (<a className="underline" href="https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho/novo-caged/2025/dezembro/apresentacao-dezembro-de-2025-1.pdf" target="_blank" rel="noopener">Novo Caged, dez/2025</a>). Desengajamento: 11% ativamente desengajados no Brasil, <a className="underline" href="https://gallup.com/workplace/704714/state-global-workplace-brazil-country-level-data.aspx" target="_blank" rel="noopener">Gallup</a>. Ações por assédio moral: 142.828 em 2025, dados do TST via <a className="underline" href="https://www.rotajuridica.com.br/?p=170496" target="_blank" rel="noopener">Rota Jurídica</a>, ÷ empregos formais.</p>
        <p><b className="text-slate-700">Custos estimados.</b> Uma saída: 1,3 salário de rescisão + 0,6 de recrutamento + 0,4 de admissão + 3 meses a 40% abaixo do esperado. Faltas: +30% de cobertura. Um afastamento: 15 dias pagos + 2 meses de cobertura a 50%. Uma ação por assédio: R$ 50 mil em média. Pessoa desengajada: 18% do custo anual, estimativa atribuída à Gallup.</p>
        <p>Estimativa educativa. Para um número preciso, faça o diagnóstico.</p>
      </footer>
    </div>
  );
}
