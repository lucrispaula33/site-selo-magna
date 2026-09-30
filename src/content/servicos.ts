/**
 * Os textos ficam em /content/servicos.json e são editados pelo painel: selomagna.com.br/admin
 */
import data from "../../content/servicos.json";

export type Servico = {
  slug: string;
  icon: "Search" | "GraduationCap" | "Settings2" | "LineChart";
  title: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  forWhom: string;
  deliverables: string[];
  steps: { title: string; text: string }[];
  duration: string;
  priceFrom?: string;
};

export const servicos = data.items as Servico[];

export const getServico = (slug: string) => servicos.find((s) => s.slug === slug);
