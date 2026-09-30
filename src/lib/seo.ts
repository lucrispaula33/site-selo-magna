import type { Metadata } from "next";
import { site } from "@/config/site";

/** Gera título, descrição, URL canônica e cartões de compartilhamento de cada página */
export function pageMeta({ title, description, path, type = "website" }: { title: string; description: string; path: string; type?: "website" | "article" }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type, siteName: site.name, locale: "pt_BR" },
    twitter: { card: "summary_large_image", title, description },
  };
}
