/**
 * Os textos ficam em /content/servicos.json e são editados pelo painel: selomagna.com.br/admin
 */
import data from "../../content/servicos.json";

export type Servico = {
  slug: string;
  icon: "Search" | "GraduationCap" | "Settings2" | "LineChart" | "Compass";
  /** Ex.: "Serviço adicional". Serviços com tag aparecem separados da jornada principal. */
  tag?: string;
  title: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  forWhom: string;
  deliverables: string[];
  /** Itens agrupados por tema (usado no lugar de "deliverables" quando preenchido). */
  groups?: { title: string; items: string[] }[];
  mentorsTitle?: string;
  mentorsText?: string;
  highlight?: string;
  /** "mentoria" adapta o formulário para pessoa física ou empresa. */
  formMode?: "empresa" | "mentoria";
  steps: { title: string; text: string }[];
  duration: string;
  priceFrom?: string;
};

export const servicos = data.items as Servico[];

/** Serviços da jornada principal (sem tag) e serviços adicionais (com tag). */
export const servicosPrincipais = servicos.filter((s) => !s.tag);
export const servicosAdicionais = servicos.filter((s) => s.tag);

export const getServico = (slug: string) => servicos.find((s) => s.slug === slug);
