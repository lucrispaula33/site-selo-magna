/**
 * MOTOR DE CÁLCULO DOS CUSTOS OCULTOS
 * ------------------------------------------------------------
 * Todas as estimativas do site (páginas de soluções e calculadora)
 * saem deste arquivo, para que os números sejam sempre coerentes.
 *
 * Cenário-padrão exibido no site: empresa com 100 colaboradores
 * e turnover de 35% ao ano.
 *
 * As premissas são conservadoras e aparecem por escrito em cada
 * página. Atenção: parte dos custos se sobrepõe (ex.: burnout
 * também gera turnover). O total "custo do silêncio" é uma soma
 * de referência e isso é informado ao visitante.
 */

export type Scenario = {
  employees: number; // nº de colaboradores
  avgSalary: number; // salário médio mensal (R$)
  chargesFactor: number; // encargos + benefícios sobre o salário (0,8 = 80%)
  turnover: number; // taxa anual (0,35 = 35%)
};

export const defaultScenario: Scenario = {
  employees: 100,
  avgSalary: 3500,
  chargesFactor: 0.8,
  turnover: 0.35,
};

export type CostItem = { label: string; value: number; how: string };
export type CostResult = { total: number; items: CostItem[] };

const monthlyCost = (s: Scenario) => s.avgSalary * (1 + s.chargesFactor);
const annualCost = (s: Scenario) => monthlyCost(s) * 12;
const payroll = (s: Scenario) => annualCost(s) * s.employees;
const exits = (s: Scenario) => s.employees * s.turnover;

/** Custo de substituir UMA pessoa que saiu */
export function replacementCost(s: Scenario) {
  const termination = s.avgSalary * 1.3; // aviso prévio + multa FGTS (média)
  const recruiting = s.avgSalary * 0.6; // anúncio, triagem, entrevistas, horas de gestor
  const onboarding = s.avgSalary * 0.4; // exames admissionais, integração, treinamento inicial
  const ramp = monthlyCost(s) * 3 * 0.4; // 3 meses produzindo 40% abaixo do esperado
  return { termination, recruiting, onboarding, ramp, total: termination + recruiting + onboarding + ramp };
}

export const calculators: Record<string, (s: Scenario) => CostResult> = {
  "turnover-e-recrutamento": (s) => {
    const r = replacementCost(s);
    const n = exits(s);
    const items: CostItem[] = [
      { label: "Desligamentos (aviso prévio, multa FGTS)", value: r.termination * n, how: `${n} saídas × 1,3 salário` },
      { label: "Recrutamento e seleção", value: r.recruiting * n, how: `${n} vagas × 0,6 salário` },
      { label: "Admissão e integração", value: r.onboarding * n, how: `${n} admissões × 0,4 salário` },
      { label: "Curva de aprendizado (produtividade perdida)", value: r.ramp * n, how: "3 meses a 40% abaixo do esperado" },
    ];
    return sum(items);
  },

  "absenteismo-e-presenteismo": (s) => {
    const p = payroll(s);
    const items: CostItem[] = [
      { label: "Faltas e atestados (absenteísmo)", value: p * 0.03, how: "3% dos dias de trabalho perdidos" },
      { label: "Cobertura: horas extras e sobrecarga", value: p * 0.03 * 0.3, how: "30% das ausências precisam ser cobertas" },
      { label: "Presenteísmo (presente, mas sem render)", value: p * 0.04, how: "4% de produtividade perdida" },
    ];
    return sum(items);
  },

  "burnout-e-saude-mental": (s) => {
    const r = replacementCost(s);
    const exhausted = s.employees * 0.15;
    const leaves = Math.max(1, Math.round(s.employees * 0.02));
    const burnoutExits = Math.round(exits(s) * 0.15);
    const items: CostItem[] = [
      { label: "Queda de produtividade por exaustão", value: exhausted * annualCost(s) * 0.2, how: `${fmtN(exhausted)} pessoas (15%) rendendo 20% menos` },
      { label: "Afastamentos (15 dias pagos + cobertura)", value: leaves * (monthlyCost(s) * 0.5 + monthlyCost(s) * 2 * 0.5), how: `${leaves} afastamentos/ano` },
      { label: "Pedidos de demissão por esgotamento", value: burnoutExits * r.total, how: `${burnoutExits} das saídas (15%) × custo de substituição` },
    ];
    return sum(items);
  },

  "assedio-e-ambiente-toxico": (s) => {
    const r = replacementCost(s);
    const affected = s.employees * 0.1;
    const toxicExits = exits(s) * 0.1;
    const items: CostItem[] = [
      { label: "Queda de desempenho das equipes afetadas", value: affected * annualCost(s) * 0.15, how: `${fmtN(affected)} pessoas (10%) rendendo 15% menos` },
      { label: "Saídas ligadas ao clima tóxico", value: toxicExits * r.total, how: `${fmtN(toxicExits)} saídas (10%) × custo de substituição` },
      { label: "Risco trabalhista (dano moral)", value: 25000, how: "1 ação de R$ 50 mil a cada 2 anos" },
    ];
    return sum(items);
  },

  "falta-de-engajamento": (s) => {
    const disengaged = s.employees * 0.3;
    const items: CostItem[] = [
      { label: "Produtividade perdida de pessoas desengajadas", value: disengaged * annualCost(s) * 0.18, how: `${fmtN(disengaged)} pessoas (30%) × 18% do custo anual` },
      { label: "Retrabalho e perda de qualidade", value: payroll(s) * 0.01, how: "1% da folha" },
    ];
    return sum(items);
  },

  "treinamento-e-desenvolvimento": (s) => {
    const items: CostItem[] = [
      { label: "Erros operacionais e retrabalho", value: payroll(s) * 0.02, how: "2% da folha" },
      { label: "Curva de aprendizado mais longa", value: exits(s) * monthlyCost(s) * 0.3, how: `${fmtN(exits(s))} novatos × 1 mês extra a 30% abaixo` },
      { label: "Treinamentos sem retorno", value: s.employees * 300 * 0.5, how: "R$ 300/pessoa, metade sem aplicação prática" },
    ];
    return sum(items);
  },

  "pgr-e-saude-mental": (s) => {
    const salaryPayroll = s.avgSalary * 13.33 * s.employees;
    const items: CostItem[] = [
      { label: "Aumento do FAP sobre o RAT", value: salaryPayroll * 0.02 * 0.25, how: "RAT de 2% com FAP subindo 0,25" },
      { label: "Exposição a autuações (NR-1 / NR-28)", value: 15000, how: "Estimativa ilustrativa; valor varia por infração e porte" },
      { label: "Passivo por doença ocupacional", value: 20000, how: "20% de chance/ano de ação de R$ 100 mil" },
    ];
    return sum(items);
  },
};

function sum(items: CostItem[]): CostResult {
  return { items, total: items.reduce((a, b) => a + b.value, 0) };
}

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const fmtN = (v: number) => v.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

export const assumptionsText = [
  "100 colaboradores, turnover de 35% ao ano (35 saídas).",
  "Salário médio de R$ 3.500 + 80% de encargos e benefícios (custo de R$ 6.300/mês por pessoa).",
  "Percentuais conservadores baseados em referências de mercado (Gallup, SHRM, OMS e dados do INSS).",
  "Estimativas ilustrativas: parte dos custos se sobrepõe entre os pilares (ex.: burnout também gera turnover).",
];

/** Soma de referência dos 7 pilares ("custo do silêncio") */
export function totalAll(s: Scenario = defaultScenario) {
  return Object.values(calculators).reduce((acc, fn) => acc + fn(s).total, 0);
}

/** Formato curto: R$ 2,4 mi / R$ 546 mil */
export const brlShort = (v: number) =>
  v >= 1_000_000
    ? `R$ ${(v / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 2 })} mi`
    : `R$ ${Math.round(v / 1000).toLocaleString("pt-BR")} mil`;
