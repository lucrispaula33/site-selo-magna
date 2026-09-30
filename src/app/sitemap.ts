import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { pilares } from "@/content/pilares";
import { servicos } from "@/content/servicos";
import { getAllPosts } from "@/lib/blog";

// Gera automaticamente o /sitemap.xml com todas as páginas (inclusive posts novos)
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = ["", "/sobre", "/servicos", "/pilares", "/nr-1", "/calculadora", "/blog", "/contato", "/politica-de-privacidade", "/termos-de-uso"];
  return [
    ...fixed.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : p === "/nr-1" ? 0.9 : 0.7 })),
    ...pilares.map((p) => ({ url: `${site.url}/pilares/${p.slug}`, lastModified: now, priority: 0.8 })),
    ...servicos.map((s) => ({ url: `${site.url}/servicos/${s.slug}`, lastModified: now, priority: 0.8 })),
    ...getAllPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 })),
  ];
}
