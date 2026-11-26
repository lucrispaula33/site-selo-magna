/**
 * MOTOR DA CALCULADORA (v2, nov/2026)
 * Usado pela página /calculadora e pela rota /api/calculadora (e-mail do relatório),
 * para que a tela e o e-mail mostrem exatamente os mesmos números.
 *
 * A empresa informa os próprios indicadores. Cada um é comparado com uma
 * referência publicada e só a diferença entra como custo evitável.
 * Indicador não medido fica fora da conta.
 * As práticas não reduzem o custo: indicam o momento da empresa e o próximo passo.
 */
import { brl } from "@/lib/costs";

export type Setor = "servicos" | "comercio" | "industria" | "construcao" | "agro";
export const SETORES: { id: Setor; label: string; turnover: number }[] = [
  { id: "servicos", label: "Serviços (inclui saúde, educação, tecnologia)", turnover: 0.3205 },
  { id: "comercio", label: "Comércio e varejo", turnover: 0.3539 },
  { id: "industria", label: "Indústria", turnover: 0.3474 },
  { id: "construcao", label: "Construção", turnover: 0.6566 },
  { id: "agro", label: "Agropecuária", turnover: 0.5057 },
];

const REF = { faltas: 0.02, afastPor100: 1.13, desengajados: 0.11, acoesPor100: 0.29 };
const CUSTO_ACAO = 50000;

export type IndId = "turn" | "falt" | "afas" | "deseng" | "acoes";
export const INDICADORES: { id: IndId; nome: string; curto: string; unidade: "%" | "nº"; exemplo: number | null }[] = [
  { id: "turn", nome: "Turnover anual", curto: "Turnover", unidade: "%", exemplo: 40 },
  { id: "falt", nome: "Taxa de faltas", curto: "Faltas", unidade: "%", exemplo: 3.5 },
  { id: "afas", nome: "Afastamentos por saúde mental no ano", curto: "Afastamentos (saúde mental)", unidade: "nº", exemplo: 3 },
  { id: "deseng", nome: "Pessoas desengajadas na última pesquisa", curto: "Desengajamento", unidade: "%", exemplo: null },
  { id: "acoes", nome: "Ações por assédio ou dano moral nos últimos 2 anos", curto: "Ações por assédio", unidade: "nº", exemplo: 1 },
];

export const PRATICAS = [
  "Riscos psicossociais mapeados e registrados no PGR",
  "Plano de ação em andamento, com responsáveis e prazos",
  "Indicadores acompanhados todo mês (faltas, turnover, afastamentos)",
  "Lideranças preparadas, que dão feedback com frequência",
  "Canal de denúncia e prevenção ao assédio funcionando",
];

export const ESTAGIOS = {
  1: { nome: "Começando", sub: "0 a 2 práticas", titulo: "Começando: diagnóstico e riscos no PGR", itens: ["Diagnóstico psicossocial com o COPSOQ II-Br, respondido pelas equipes", "Registro dos riscos psicossociais no PGR, como pede a NR-1", "Primeiro painel com faltas, turnover e afastamentos"], cta: "Quero começar pelo diagnóstico" },
  2: { nome: "Estruturando", sub: "3 a 4 práticas", titulo: "Estruturando: plano de ação, lideranças e indicadores", itens: ["Plano de ação com responsáveis e prazos para os pontos de atenção", "Desenvolvimento das lideranças", "Acompanhamento mensal dos indicadores"], cta: "Quero estruturar o plano" },
  3: { nome: "Referência", sub: "5 práticas e indicadores saudáveis", titulo: "Referência: reconhecimento e manutenção", itens: ["Validação independente: o diagnóstico confirma se a percepção das equipes bate com as práticas", "Selo Magna Prata ou Ouro para mostrar a clientes, candidatos e relatórios ESG", "Acompanhamento dos indicadores, formação de novos líderes e renovação anual do selo", "Preparação para GPTW, ISO 45003 e Certificado Empresa Promotora da Saúde Mental"], cta: "Quero ser reconhecida como referência" },
} as const;

export const num = (v: number) => v.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
export const pct = (v: number) => `${num(v)}%`;

export type Entrada = {
  emp: number;
  sal: number;
  enc: number;
  setor: Setor;
  vals: Record<IndId, number>;
  naoMede: Record<IndId, boolean>;
  praticas: boolean[];
};

export type Linha =
  | { i: (typeof INDICADORES)[number]; medido: false; ref: string }
  | { i: (typeof INDICADORES)[number]; medido: true; ref: string; h: number; ev: number; txt: string };

export function calcular(e: Entrada) {
  const N = Math.max(1, e.emp || 1);
  const sal = e.sal, enc = e.enc;
  const mes = sal * (1 + enc / 100), ano = 12 * mes, folha = ano * N;
  const saida = 1.3 * sal + 0.6 * sal + 0.4 * sal + 3 * mes * 0.4;
  const afast = 0.5 * mes + 2 * mes * 0.5;
  const refTurn = (SETORES.find((x) => x.id === e.setor) ?? SETORES[0]).turnover;
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
  const linhas: Linha[] = INDICADORES.map((i) => {
    if (e.naoMede[i.id]) { semDado.push(i.nome.toLowerCase()); return { i, medido: false, ref: refTxt[i.id] }; }
    const [h, rf, txt] = calc[i.id](Math.max(0, e.vals[i.id] || 0));
    const ev = Math.max(0, h - rf);
    hoje += h; naRef += Math.min(h, rf); evitavel += ev;
    if (ev > 0) acima.push(i.nome.toLowerCase());
    return { i, medido: true, ref: refTxt[i.id], h, ev, txt };
  });
  const medidos = INDICADORES.length - semDado.length;
  const P = e.praticas.filter(Boolean).length;
  const estagio: 1 | 2 | 3 = P <= 2 ? 1 : P === 5 && medidos >= 3 && acima.length === 0 ? 3 : 2;
  return { N, refTxt, linhas, hoje, naRef, evitavel, acima, semDado, medidos, P, estagio };
}

export type Resultado = ReturnType<typeof calcular>;

/** Título do resultado. `detalhe` inclui os pontos de atenção (parte liberada com o e-mail). */
export function resumo(r: Resultado, detalhe: boolean) {
  const semTxt = detalhe && r.semDado.length ? ` Sem medição: ${r.semDado.join(", ")}.` : "";
  if (r.medidos === 0)
    return { eye: "Sem indicadores informados", titulo: "Sem números, não dá para saber quanto a empresa perde", texto: "A NR-1 pede que a empresa acompanhe os riscos psicossociais. Começar a medir faltas, turnover e afastamentos é o primeiro passo, e o diagnóstico mostra o restante." };
  if (r.acima.length === 0)
    return { eye: "Resultado positivo", titulo: "Seus indicadores estão saudáveis", texto: `Os números informados estão dentro da referência. O próximo passo é manter esse resultado e mostrar isso ao mercado.${semTxt}` };
  const base = `≈ ${brl(r.evitavel / 12)} por mês · ${brl(r.evitavel / r.N)} por colaborador.`;
  return { eye: "Custo evitável estimado", titulo: `${brl(r.evitavel)} por ano acima da referência`, texto: detalhe ? `${base} Pontos de atenção: ${r.acima.join(", ")}.${semTxt}` : base };
}

export function tituloEstagio(r: Resultado) {
  return r.estagio === 2 && r.P === 5 ? "Estruturando: as práticas existem, mas os indicadores ainda não confirmam o resultado" : ESTAGIOS[r.estagio].titulo;
}

/** Valida e normaliza a entrada recebida pela API (nunca confia no navegador). */
export function entradaSegura(x: unknown): Entrada | null {
  if (!x || typeof x !== "object") return null;
  const o = x as Record<string, unknown>;
  const n = (v: unknown, min: number, max: number) => {
    const f = Number(v);
    return Number.isFinite(f) ? Math.min(max, Math.max(min, f)) : min;
  };
  const setor = SETORES.some((s) => s.id === o.setor) ? (o.setor as Setor) : "servicos";
  const vIn = (o.vals ?? {}) as Record<string, unknown>;
  const mIn = (o.naoMede ?? {}) as Record<string, unknown>;
  const pIn = Array.isArray(o.praticas) ? o.praticas : [];
  return {
    emp: Math.round(n(o.emp, 1, 100000)),
    sal: n(o.sal, 0, 1000000),
    enc: n(o.enc, 0, 300),
    setor,
    vals: Object.fromEntries(INDICADORES.map((i) => [i.id, n(vIn[i.id], 0, i.unidade === "%" ? 100 : 100000)])) as Record<IndId, number>,
    naoMede: Object.fromEntries(INDICADORES.map((i) => [i.id, mIn[i.id] === true])) as Record<IndId, boolean>,
    praticas: PRATICAS.map((_, k) => pIn[k] === true),
  };
}

/**
 * Alerta de fiscalização (detalhamento liberado e e-mail).
 * Mostra sinais de atenção, não previsão de visita. Fontes no campo `fontes`.
 */
export function alertaFiscalizacao(r: Resultado, e: Entrada) {
  const linha = (id: IndId) => r.linhas.find((l) => l.i.id === id);
  const itens: string[] = [];
  const afas = linha("afas"), acoes = linha("acoes"), turn = linha("turn");
  if (afas?.medido && afas.ev > 0)
    itens.push(`Afastamentos por saúde mental acima da referência (${afas.txt} no ano; referência: ${afas.ref.replace(/ \(.*\)$/, "")}). Os dados de afastamentos do INSS permitem identificar as empresas com os maiores índices, e o Ministério Público do Trabalho afirma usar esse parâmetro.`);
  if (acoes?.medido && acoes.ev > 0)
    itens.push("Ações por assédio acima da referência. Denúncias de assédio e de sobrecarga estão entre os principais motivos que levam a uma fiscalização.");
  if (turn?.medido && turn.ev > 0)
    itens.push(`Turnover acima da média do seu setor (${turn.txt}; média do setor: ${turn.ref.replace(/ \(.*\)$/, "")}). Sozinho, não leva à fiscalização, mas costuma acompanhar problemas de clima, sobrecarga e liderança que aparecem nas denúncias.`);
  if (!e.praticas[0])
    itens.push("Riscos psicossociais ainda não registrados no PGR. Desde 26/05/2026, a NR-1 exige esse registro, e é isso que o auditor verifica numa inspeção.");
  if (!e.praticas[4])
    itens.push("Sem canal de denúncia funcionando. Sem um canal interno, as queixas tendem a sair da empresa e chegar a órgãos públicos. Para empresas com CIPA, o canal é obrigatório pela Lei 14.457/2022.");
  return {
    itens,
    titulo: itens.length ? "Pontos que podem chamar a atenção da fiscalização" : "Nenhum sinal de atenção para a fiscalização nos números informados",
    nota: "Sinais de atenção, não previsão de fiscalização. Segundo o Ministério Público do Trabalho, os dados do INSS permitem identificar as empresas com mais afastamentos (Valor Econômico, fev/2026); fiscalizações também costumam partir de denúncias e de acidentes graves (CartaCapital, ago/2026).",
  };
}
