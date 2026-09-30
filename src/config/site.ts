/**
 * CONFIGURAÇÃO GERAL DO SITE
 * ─────────────────────────────────────────────────────────────
 * Os textos e dados agora ficam em /content/site.json e são
 * editados pelo painel: selomagna.com.br/admin
 * Este arquivo só carrega esses dados e acrescenta o endereço do site.
 */
import data from "../../content/site.json";

export type SiteData = typeof data;

export const site = {
  ...data,
  // Endereço oficial. Na hospedagem, use a variável NEXT_PUBLIC_SITE_URL para trocar sem mexer no código.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://selomagna.com.br").replace(/\/$/, ""),
};

export const whatsappLink = (message: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

export const mainNav = [
  { label: "Início", href: "/" },
  { label: "Pilares", href: "/pilares" },
  { label: "Serviços", href: "/servicos" },
  { label: "NR-1", href: "/nr-1" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];
