"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { brl } from "@/lib/costs";
import { alertaFiscalizacao, calcular, resumo, tituloEstagio, ESTAGIOS, INDICADORES, PRATICAS, SETORES, type IndId, type Setor } from "@/lib/calculadora";

/**
 * Calculadora v2 (nov/2026). O cálculo fica em src/lib/calculadora.ts.
 * Desbloqueio parcial: o total e o momento da empresa aparecem na hora;
 * o detalhamento por indicador e os próximos passos são liberados quando
 * a pessoa informa o e-mail (e também enviados por e-mail pela rota /api/calculadora).
 */

const CHAVE = "sm-calc-liberada";

export default function Calculator() {
  const [emp, setEmp] = useState(100);
  const [sal, setSal] = useState(3500);
  const [enc, setEnc] = useState(80);
  const [setor, setSetor] = useState<Setor>("servicos");
  const [vals, setVals] = useState<Record<IndId, number>>(() => Object.fromEntries(INDICADORES.map((i) => [i.id, i.exemplo ?? 0])) as Record<IndId, number>);
  const [naoMede, setNaoMede] = useState<Record<IndId, boolean>>(() => Object.fromEntries(INDICADORES.map((i) => [i.id, i.exemplo === null])) as Record<IndId, boolean>);
  const [praticas, setPraticas] = useState<boolean[]>(PRATICAS.map(() => false));

  const [liberada, setLiberada] = useState(false);
  const [envio, setEnvio] = useState<"" | "enviando" | "enviado" | "falhou">("");
  useEffect(() => { try { if (localStorage.getItem(CHAVE) === "1") setLiberada(true); } catch {} }, []);

  const r = useMemo(() => calcular({ emp, sal, enc, setor, vals, naoMede, praticas }), [emp, sal, enc, setor, vals, naoMede, praticas]);

  async function liberar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setEnvio("enviando");
    let ok = false;
    try {
      const res = await fetch("/api/calculadora", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: f.nome, email: f.email, empresa: f.empresa, website: f.website, novidades: f.novidades === "on", entrada: { emp, sal, enc, setor, vals, naoMede, praticas } }),
      });
      ok = res.ok && (await res.json()).sent === true;
    } catch {}
    setEnvio(ok ? "enviado" : "falhou");
    setLiberada(true);
    try { localStorage.setItem(CHAVE, "1"); } catch {}
  }


  const topo = resumo(r, liberada);
  const alerta = alertaFiscalizacao(r, { emp, sal, enc, setor, vals, naoMede, praticas });
  const est = ESTAGIOS[r.estagio];
  const estTitulo = tituloEstagio(r);
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
              <label className="block"><span className="label">Setor (ramo da empresa)</span>
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

          <div className="card space-y-4">
            <p className="eyebrow">Momento da empresa</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {([1, 2, 3] as const).map((k) => (
                <div key={k} className={`rounded-xl border p-3 text-xs ${k === r.estagio ? "border-petroleo-500 bg-areia-200 text-petroleo-900" : "border-areia-300 text-slate-500"}`}>
                  <b className="block text-sm text-petroleo-900">{ESTAGIOS[k].nome}</b>{ESTAGIOS[k].sub}
                </div>
              ))}
            </div>
          </div>

          {envio === "enviado" && <p className="rounded-2xl bg-salvia-100 p-4 text-sm text-petroleo-900">Pronto! O relatório completo foi enviado para o seu e-mail. Se não aparecer em alguns minutos, confira a caixa de spam.</p>}
          {envio === "falhou" && <p className="rounded-2xl bg-areia-200 p-4 text-sm text-petroleo-900">Não conseguimos enviar o e-mail agora, mas o relatório completo está liberado abaixo.</p>}

          <div className="relative">
            <div className={liberada ? "space-y-6" : "pointer-events-none select-none space-y-6 blur-sm"} aria-hidden={!liberada}>
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

              <div className={`space-y-3 rounded-3xl border p-6 md:p-8 ${alerta.itens.length ? "border-amber-200 bg-amber-50" : "border-areia-300 bg-white"}`}>
                <p className="eyebrow">{alerta.itens.length ? "Alerta" : "Fiscalização"}</p>
                <p className="font-serif text-xl font-semibold text-petroleo-900">{alerta.titulo}</p>
                {alerta.itens.length > 0 && <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">{alerta.itens.map((x) => <li key={x}>{x}</li>)}</ul>}
                <p className="text-xs leading-relaxed text-slate-500">{alerta.nota}</p>
              </div>

              <div className="card space-y-4">
                <p className="eyebrow">Próximos passos</p>
                <p className="font-serif text-xl font-semibold text-petroleo-900">{estTitulo}</p>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700">{est.itens.map((x) => <li key={x}>{x}</li>)}</ul>
                <a href="#formulario" className="btn-primary w-full" data-track="calculadora_cta" tabIndex={liberada ? 0 : -1}>{est.cta}</a>
              </div>
            </div>

            {!liberada && (
              <div className="absolute inset-0 flex items-start justify-center p-2 pt-6 sm:p-6">
                <form onSubmit={liberar} className="w-full max-w-md space-y-4 rounded-3xl bg-white p-6 shadow-destaque sm:p-8" aria-label="Receber o relatório completo">
                  <p className="font-serif text-2xl font-semibold leading-tight text-petroleo-900">Veja o relatório completo</p>
                  <p className="text-sm leading-relaxed text-slate-600">O custo de cada indicador, os pontos que podem chamar a atenção da fiscalização e os próximos passos para a sua empresa. Mostramos aqui e enviamos para o seu e-mail.</p>
                  <input name="nome" required autoComplete="name" placeholder="Seu nome" className={input} aria-label="Nome" />
                  <input name="email" type="email" required autoComplete="email" placeholder="voce@empresa.com.br" className={input} aria-label="E-mail corporativo" />
                  <input name="empresa" required autoComplete="organization" placeholder="Empresa" className={input} aria-label="Empresa" />
                  <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
                    <input type="checkbox" name="novidades" className="mt-0.5 h-4 w-4 accent-petroleo-700" />
                    <span>Aceito receber conteúdos da Selo Magna. Posso cancelar quando quiser.</span>
                  </label>
                  <button type="submit" disabled={envio === "enviando"} className="btn-primary w-full" data-track="calculadora_desbloqueio">
                    {envio === "enviando" ? "Enviando…" : "Ver relatório completo"}
                  </button>
                  <p className="text-xs leading-relaxed text-slate-500">Usamos seus dados para enviar o relatório e, se você quiser, retornar o contato. Veja a <Link href="/politica-de-privacidade" className="underline">Política de Privacidade</Link>.</p>
                </form>
              </div>
            )}
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
