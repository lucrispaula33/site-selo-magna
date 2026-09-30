/**
 * Os textos ficam em /content/pilares.json e são editados pelo painel: selomagna.com.br/admin
 */
import data from "../../content/pilares.json";

export type Pilar = {
  slug: string;
  icon: "Flame" | "HeartPulse" | "Users" | "ClipboardCheck" | "Scale" | "BatteryLow" | "BookOpen";
  short: string;
  card: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  signs: string[];
  approach: { title: string; text: string }[];
  results: string[];
  faq: { q: string; a: string }[];
};

export const pilares = data.items as Pilar[];

export const getPilar = (slug: string) => pilares.find((s) => s.slug === slug);
